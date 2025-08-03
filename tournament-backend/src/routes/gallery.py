import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
import json
from datetime import datetime

gallery_bp = Blueprint('gallery', __name__)

# Admin credentials (in production, use environment variables and proper hashing)
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@gallery_bp.route('/admin/login', methods=['POST'])
@cross_origin()
def admin_login():
    """Admin login endpoint"""
    try:
        data = request.get_json()
        password = data.get('password')
        
        if password == ADMIN_PASSWORD:
            # In production, you would generate a JWT token here
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'token': 'admin_token_placeholder'  # Replace with actual JWT
            }), 200
        else:
            return jsonify({'error': 'Invalid password'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/photos', methods=['GET'])
@cross_origin()
def get_photos():
    """Get all photos"""
    try:
        # In production, this would fetch from a database
        # For demo, we'll return sample data
        sample_photos = [
            {
                'id': 1,
                'url': '/static/images/sample1.jpg',
                'title': 'Onam Football Celebration',
                'description': 'Players celebrating during Onam football tournament',
                'category': 'tournament',
                'date': '2025-07-30',
                'tags': ['onam', 'celebration', 'football']
            },
            {
                'id': 2,
                'url': '/static/images/sample2.jpg',
                'title': 'Kerala Village Football',
                'description': 'Traditional football match in Kerala village setting',
                'category': 'practice',
                'date': '2025-07-29',
                'tags': ['kerala', 'village', 'football']
            },
            {
                'id': 3,
                'url': '/static/images/sample3.jpg',
                'title': 'Hyderabad FC Venue',
                'description': 'Professional football venue in Hyderabad',
                'category': 'venue',
                'date': '2025-07-28',
                'tags': ['hyderabad', 'venue', 'stadium']
            }
        ]
        
        return jsonify({'photos': sample_photos}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/photos/upload', methods=['POST'])
@cross_origin()
def upload_photo():
    """Upload a new photo (admin only)"""
    try:
        # Check admin authentication (simplified for demo)
        auth_header = request.headers.get('Authorization')
        if not auth_header or auth_header != 'Bearer admin_token_placeholder':
            return jsonify({'error': 'Unauthorized'}), 401
        
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400
        
        # Get form data
        title = request.form.get('title')
        description = request.form.get('description', '')
        category = request.form.get('category', 'tournament')
        
        if not title:
            return jsonify({'error': 'Title is required'}), 400
        
        # Generate unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        
        # Create uploads directory if it doesn't exist
        upload_dir = os.path.join(current_app.static_folder, 'uploads')
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save file
        file_path = os.path.join(upload_dir, unique_filename)
        file.save(file_path)
        
        # Create photo record
        photo_data = {
            'id': int(datetime.now().timestamp()),
            'url': f'/static/uploads/{unique_filename}',
            'title': title,
            'description': description,
            'category': category,
            'date': datetime.now().strftime('%Y-%m-%d'),
            'tags': title.lower().split()
        }
        
        # In production, save to database
        print(f"Photo uploaded: {json.dumps(photo_data, indent=2)}")
        
        return jsonify({
            'message': 'Photo uploaded successfully',
            'photo': photo_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/photos/<int:photo_id>', methods=['DELETE'])
@cross_origin()
def delete_photo(photo_id):
    """Delete a photo (admin only)"""
    try:
        # Check admin authentication
        auth_header = request.headers.get('Authorization')
        if not auth_header or auth_header != 'Bearer admin_token_placeholder':
            return jsonify({'error': 'Unauthorized'}), 401
        
        # In production, delete from database and file system
        print(f"Photo {photo_id} would be deleted")
        
        return jsonify({'message': 'Photo deleted successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/photos/<int:photo_id>', methods=['PUT'])
@cross_origin()
def update_photo(photo_id):
    """Update photo metadata (admin only)"""
    try:
        # Check admin authentication
        auth_header = request.headers.get('Authorization')
        if not auth_header or auth_header != 'Bearer admin_token_placeholder':
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = request.get_json()
        
        # In production, update database record
        print(f"Photo {photo_id} would be updated with: {json.dumps(data, indent=2)}")
        
        return jsonify({'message': 'Photo updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/categories', methods=['GET'])
@cross_origin()
def get_categories():
    """Get available photo categories"""
    categories = [
        {'value': 'tournament', 'label': 'Tournament'},
        {'value': 'practice', 'label': 'Practice Sessions'},
        {'value': 'venue', 'label': 'Venue'},
        {'value': 'awards', 'label': 'Awards Ceremony'},
        {'value': 'team', 'label': 'Team Photos'}
    ]
    
    return jsonify({'categories': categories}), 200

@gallery_bp.route('/health', methods=['GET'])
@cross_origin()
def gallery_health_check():
    """Health check endpoint for gallery service"""
    return jsonify({'status': 'healthy', 'service': 'gallery'}), 200

