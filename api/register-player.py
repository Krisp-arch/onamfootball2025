import json
import smtplib
import ssl
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime

def send_email(to_email, subject, body):
    """Send email using Amazon SES SMTP"""
    sender_email = os.getenv('SENDER_EMAIL')
    smtp_username = os.getenv('SES_SMTP_USERNAME')
    smtp_password = os.getenv('SES_SMTP_PASSWORD')
    smtp_host = os.getenv('SES_SMTP_HOST')
    smtp_port = int(os.getenv('SES_SMTP_PORT', 587))
    
    if not all([sender_email, smtp_username, smtp_password, smtp_host]):
        print("Missing SMTP configuration")
        return False
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = to_email
    msg.attach(MIMEText(body, 'html'))
    
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls(context=context)
            server.login(smtp_username, smtp_password)
            server.sendmail(sender_email, to_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def handler(request):
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }
    
    if request.method == 'OPTIONS':
        return ('', 200, headers)
    
    if request.method != 'POST':
        return (json.dumps({'error': 'Method not allowed'}), 405, headers)
    
    try:
        # Parse request data
        data = json.loads(request.data.decode('utf-8'))
        
        # Validate required fields
        required_fields = ['fullName', 'contactNumber', 'email', 'playingPosition']
        for field in required_fields:
            if not data.get(field):
                return (json.dumps({'error': f'{field} is required'}), 400, headers)
        
        subject = "Player Registration - Onam Football Tournament 2025"
        body = f"""
        <html>
        <body>
            <h2>New Player Registration</h2>
            <p><strong>Tournament:</strong> Onam Special Football Tournament 2025 - Chapter One</p>
            <p><strong>Registration Type:</strong> Individual Player</p>
            
            <h3>Player Details:</h3>
            <ul>
                <li><strong>Full Name:</strong> {data['fullName']}</li>
                <li><strong>Contact Number:</strong> {data['contactNumber']}</li>
                <li><strong>Email:</strong> {data['email']}</li>
                <li><strong>Playing Position:</strong> {data['playingPosition']}</li>
                <li><strong>Registration Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</li>
            </ul>
            
            <h3>Next Steps:</h3>
            <p>1. Payment details will be shared separately</p>
            <p>2. Tournament schedule will be communicated closer to the event</p>
            <p>3. Please keep your contact details updated</p>
            
            <p>For queries, contact info@ragefootballclub.com or +91 88832 10696</p>
            
            <p>Best regards,<br>Rage Football Academy Team</p>
        </body>
        </html>
        """
        
        if send_email(os.getenv('SENDER_EMAIL'), subject, body):
            return (json.dumps({'message': 'Registration successful', 'status': 'success'}), 200, headers)
        else:
            return (json.dumps({'error': 'Registration failed - email not sent'}), 500, headers)
            
    except Exception as e:
        print(f"Handler error: {e}")
        return (json.dumps({'error': str(e)}), 500, headers)

# Export for Vercel
app = handler
