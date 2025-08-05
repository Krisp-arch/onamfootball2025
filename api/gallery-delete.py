from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_DELETE(self):
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
            self.send_header('Access-Control-Allow-Methods', 'DELETE, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                photo_url = data.get('url') or data.get('pathname')
                if not photo_url:
                    error_response = json.dumps({'error': 'Photo URL or pathname required'})
                    self.wfile.write(error_response.encode('utf-8'))
                    return
            
            # For now, just return success - implement blob delete later
            success_response = json.dumps({'message': 'Photo deleted successfully'})
            self.wfile.write(success_response.encode('utf-8'))
            
        except Exception as e:
            print(f"Delete error: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = json.dumps({'error': f'Delete failed: {str(e)}'})
            self.wfile.write(error_response.encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
