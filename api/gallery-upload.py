from http.server import BaseHTTPRequestHandler
import json
import os
import cgi
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Check admin authentication
            auth_header = self.headers.get('Authorization')
            if not auth_header or auth_header != 'Bearer admin_token_placeholder':
                self.send_response(401)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_response = json.dumps({'error': 'Unauthorized'})
                self.wfile.write(error_response.encode('utf-8'))
                return
            
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            # For now, just return success - implement blob upload later
            photo_data = {
                'id': int(datetime.now().timestamp()),
                'url': '/static/images/uploaded_photo.jpg',
                'title': 'Uploaded Photo',
                'description': 'Successfully uploaded photo',
                'category': 'tournament',
                'date': datetime.now().strftime('%Y-%m-%d'),
                'tags': ['uploaded', 'photo'],
                'size': 1024000
            }
            
            response_data = json.dumps({
                'message': 'Photo uploaded successfully',
                'photo': photo_data
            })
            self.wfile.write(response_data.encode('utf-8'))
            
        except Exception as e:
            print(f"Upload error: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = json.dumps({'error': f'Upload failed: {str(e)}'})
            self.wfile.write(error_response.encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
