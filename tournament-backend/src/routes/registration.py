import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import json
from datetime import datetime
import ssl

registration_bp = Blueprint('registration', __name__)
# Email configuration - using environment variables for security
smtp_server = "smtp.gmail.com"
smtp_port = 587
sender_email = os.getenv('GMAIL_USERNAME')
sender_password = os.getenv('GMAIL_APP_PASSWORD', '')
def send_email(to_email, subject, body, form_data):
    """Send email with registration detailsusing Gmail's SMTP server"""
    try:

        # Check if environment variables are set
        if not sender_email or not sender_password:
            print("Error: GMAIL_USERNAME or GMAIL_APP_PASSWORD environment variables are not set.")
            return False
            
        # Create message
        message = MIMEMultipart("alternative")
        message["From"] = sender_email
        message["To"] = to_email
        message["Subject"] = subject
        
        # Add body to email
        message.attach(MIMEText(body, "html"))
        
        # Create a secure SSL context
        context = ssl.create_default_context()
        
        # Connect to the SMTP server and send the email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls(context=context)  # Secure the connection
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, message.as_string())
        
        print(f"Email successfully sent to: {to_email}")
        
        return True
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

@registration_bp.route('/register/player', methods=['POST'])
@cross_origin()
def register_player():
    """Handle player registration"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'contactNumber', 'email', 'playingPosition']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create email content
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
            
            <p>For any queries, contact us at info@ragefootballclub.com or +91 88832 10696</p>
            
            <p>Best regards,<br>Rage Football Academy Team</p>
        </body>
        </html>
        """
        
        # Send email to tournament organizers
        email_sent = send_email(sender_email, subject, body, data)
        
        if email_sent:
            return jsonify({'message': 'Registration successful', 'status': 'success'}), 200
        else:
            return jsonify({'error': 'Registration failed - email not sent'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@registration_bp.route('/register/team', methods=['POST'])
@cross_origin()
def register_team():
    """Handle team registration"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['teamName', 'captainName', 'captainContact', 'captainEmail']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create email content
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
            <p>3. Please ensure all team members have valid ID proofs</p>
            <p>4. Team logo and member details can be updated if needed</p>
            
            <p>For any queries, contact us at info@ragefootballclub.com or +91 88832 10696</p>
            
            <p>Best regards,<br>Rage Football Academy Team</p>
        </body>
        </html>
        """
        
        # Send email to tournament organizers
        email_sent = send_email(sender_email, subject, body, data)
        
        if email_sent:
            return jsonify({'message': 'Registration successful', 'status': 'success'}), 200
        else:
            return jsonify({'error': 'Registration failed - email not sent'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@registration_bp.route('/register/sponsor', methods=['POST'])
@cross_origin()
def register_sponsor():
    """Handle sponsor registration"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['contactNumber', 'email', 'companyName', 'sponsorshipLevel']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create email content
        subject = "Sponsor Registration - Onam Football Tournament 2025"
        body = f"""
        <html>
        <body>
            <h2>New Sponsor Registration</h2>
            <p><strong>Tournament:</strong> Onam Special Football Tournament 2025 - Chapter One</p>
            <p><strong>Registration Type:</strong> Sponsor</p>
            
            <h3>Sponsor Details:</h3>
            <ul>
                <li><strong>Company Name:</strong> {data['companyName']}</li>
                <li><strong>Contact Number:</strong> {data['contactNumber']}</li>
                <li><strong>Email:</strong> {data['email']}</li>
                <li><strong>Sponsorship Level:</strong> {data['sponsorshipLevel'].title()}</li>
                <li><strong>Registration Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</li>
            </ul>
            
            <h3>Next Steps:</h3>
            <p>1. Our team will contact you within 24-48 hours</p>
            <p>2. Sponsorship packages and benefits will be discussed</p>
            <p>3. Branding and marketing opportunities will be shared</p>
            <p>4. Contract and payment terms will be finalized</p>
            
            <p>Thank you for your interest in supporting the tournament!</p>
            
            <p>For immediate queries, contact us at info@ragefootballclub.com or +91 88832 10696</p>
            
            <p>Best regards,<br>Rage Football Academy Team</p>
        </body>
        </html>
        """
        
        # Send email to tournament organizers
        email_sent = send_email(sender_email, subject, body, data)
        
        if email_sent:
            return jsonify({'message': 'Registration successful', 'status': 'success'}), 200
        else:
            return jsonify({'error': 'Registration failed - email not sent'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@registration_bp.route('/health', methods=['GET'])
@cross_origin()
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'registration'}), 200

