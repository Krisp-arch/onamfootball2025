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
        data = json.loads(request.data.decode('utf-8'))
        
        required_fields = ['teamName', 'captainName', 'captainContact', 'captainEmail']
        for field in required_fields:
            if not data.get(field):
                return (json.dumps({'error': f'{field} is required'}), 400, headers)
        
        subject = "Team Registration - Onam Football Tournament 2025"
        body = f"""
        <html>
        <body>
            <h2>New Team Registration</h2>
            <p><strong>Tournament:</strong> Onam Special Football Tournament 2025 - Chapter One</p>
            <p><strong>Registration Type:</strong> Team</p>
            
            <h3>Team Details:</h3>
            <ul>
                <li><strong>Team Name:</strong> {data['teamName']}</li>
                <li><strong>Captain/Manager Name:</strong> {data['captainName']}</li>
                <li><strong>Captain Contact:</strong> {data['captainContact']}</li>
                <li><strong>Captain Email:</strong> {data['captainEmail']}</li>
                <li><strong>Registration Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</li>
            </ul>
            
            {f"<h3>Team Members:</h3><p>{data['teamMembers']}</p>" if data.get('teamMembers') else ""}
            
            <h3>Next Steps:</h3>
            <p>1. Payment details will be shared separately</p>
            <p>2. Tournament schedule will be communicated closer to the event</p>
            <p>3. Ensure all team members have valid ID proofs</p>
            <p>4. Team logo and member details can be updated if needed</p>
            
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
        return (json.dumps({'error': str(e)}), 500, headers)

app = handler
