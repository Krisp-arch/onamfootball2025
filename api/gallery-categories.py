from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            categories = [
                {'value': 'tournament', 'label': 'Tournament'},
                {'value': 'practice', 'label': 'Practice Sessions'},
                {'value': 'venue', 'label': 'Venue'},
                {'value': 'awards', 'label': 'Awards Ceremony'},
                {'value': 'team', 'label': 'Team Photos'}
            ]
            
            response_data = json.dumps({'categories': categories})
            self.wfile.write(response_data.encode('utf-8'))
            
        except Exception as e:
            print(f"Categories error: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = json.dumps({'error': str(e)})
            self.wfile.write(error_response.encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
