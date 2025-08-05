from http.server import BaseHTTPRequestHandler
import json
import smtplib
import ssl
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime

# Import security utils
try:
    from security_utils import get_client_id, is_rate_limited, record_request, validate_input
except ImportError:
    def get_client_id(headers): return "default"
    def is_rate_limited(client_id, endpoint): return False, ""
    def record_request(client_id, endpoint, email): return True
    def validate_input(data, fields): return True, ""

def send_email(team_data):
    """Send email notification to admin"""
    sender_email = os.getenv('SENDER_EMAIL')
    smtp_username = os.getenv('SES_SMTP_USERNAME')
    smtp_password = os.getenv('SES_SMTP_PASSWORD')
    smtp_host = os.getenv('SES_SMTP_HOST')
    smtp_port = int(os.getenv('SES_SMTP_PORT', 587))
    
    if not all([sender_email, smtp_username, smtp_password, smtp_host]):
        print("Missing SMTP configuration")
        return False
    
    subject = "⚽ New Team Registration - Onam Tournament 2025"
    body = f"""
    <html>
    <body>
        <h2>New Team Registration</h2>
        <p><strong>Tournament:</strong> Onam Special Football Tournament 2025</p>
        
        <h3>Team Details:</h3>
        <ul>
            <li><strong>Team Name:</strong> {team_data['teamName']}</li>
            <li><strong>Captain/Manager:</strong> {team_data['captainName']}</li>
            <li><strong>Captain Contact:</strong> {team_data['captainContact']}</li>
            <li><strong>Captain Email:</strong> {team_data['captainEmail']}</li>
            <li><strong>Registration Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</li>
        </ul>
        
        {f"<h3>Team Members:</h3><p>{team_data['teamMembers']}</p>" if team_data.get('teamMembers') else ""}
        
        <p>Contact the team captain to confirm registration and payment details.</p>
    </body>
    </html>
    """
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = sender_email
    msg.attach(MIMEText(body, 'html'))
    
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls(context=context)
            server.login(smtp_username, smtp_password)
            server.sendmail(sender_email, sender_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def validate_team_input(data):
    """Custom validation for team registration"""
    required_fields = ['teamName', 'captainName', 'captainContact', 'captainEmail']
    is_valid, error = validate_input(data, required_fields)
    if not is_valid:
        return False, error
    
    # Additional team-specific validation
    team_name = data.get('teamName', '').strip()
    if len(team_name) < 3:
        return False, "Team name must be at least 3 characters"
    if len(team_name) > 50:
        return False, "Team name too long (max 50 characters)"
    
    # Check for inappropriate team names
    inappropriate_words = ['test', 'fake', 'spam', 'bot']
    if any(word in team_name.lower() for word in inappropriate_words):
        return False, "Please use a proper team name"
    
    return True, ""

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Get client identifier for rate limiting
            client_id = get_client_id(self.headers)
            
            # Check rate limits
            is_limited, limit_msg = is_rate_limited(client_id, 'register-team')
            if is_limited:
                self.send_response(429)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_response = json.dumps({'error': limit_msg})
                self.wfile.write(error_response.encode('utf-8'))
                return
            
            # Standard headers
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            # Parse request data
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 15000:  # 15KB limit (teams might have member lists)
                error_response = json.dumps({'error': 'Request too large'})
                self.wfile.write(error_response.encode('utf-8'))
                return
                
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Validate input
            is_valid, validation_error = validate_team_input(data)
            if not is_valid:
                error_response = json.dumps({'error': validation_error})
                self.wfile.write(error_response.encode('utf-8'))
                return
            
            # Check if captain email already registered and record request
            captain_email = data['captainEmail'].strip().lower()
            if not record_request(client_id, 'register-team', captain_email):
                error_response = json.dumps({'error': 'This captain email has already been registered today'})
                self.wfile.write(error_response.encode('utf-8'))
                return
            
            # Send notification email
            if send_email(data):
                success_response = json.dumps({
                    'message': 'Team registration successful! Captain will be contacted soon.',
                    'status': 'success'
                })
                self.wfile.write(success_response.encode('utf-8'))
            else:
                success_response = json.dumps({
                    'message': 'Team registration received! Captain will be contacted soon.',
                    'status': 'success'
                })
                self.wfile.write(success_response.encode('utf-8'))
                
        except json.JSONDecodeError:
            error_response = json.dumps({'error': 'Invalid JSON data'})
            self.wfile.write(error_response.encode('utf-8'))
        except Exception as e:
            print(f"Handler error: {e}")
            error_response = json.dumps({'error': 'Server error occurred'})
            self.wfile.write(error_response.encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
