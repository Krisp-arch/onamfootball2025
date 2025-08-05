from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            # For now, return sample data - integrate Vercel Blob later
            sample_photos = [
                {
                    'id': 1,
                    'url': '/static/images/sample1.jpg',
                    'title': 'Onam Football Celebration',
                    'description': 'Players celebrating during Onam football tournament',
                    'category': 'tournament',
                    'date': '2025-08-05',
                    'tags': ['onam', 'football', 'tournament'],
                    'size': 1024000,
                    'pathname': 'sample1.jpg'
                },
                {
                    'id': 2,
                    'url': '/static/images/sample2.jpg',
                    'title': 'Kerala Village Football',
                    'description': 'Traditional football match in Kerala village setting',
                    'category': 'practice',
                    'date': '2025-08-04',
                    'tags': ['kerala', 'village', 'football'],
                    'size': 856000,
                    'pathname': 'sample2.jpg'
                },
                {
                    'id': 3,
                    'url': '/static/images/sample3.jpg',
                    'title': 'Hyderabad FC Venue',
                    'description': 'Professional football venue in Hyderabad',
                    'category': 'venue',
                    'date': '2025-08-03',
                    'tags': ['hyderabad', 'venue', 'stadium'],
                    'size': 920000,
                    'pathname': 'sample3.jpg'
                }
            ]
            
            response_data = json.dumps({'photos': sample_photos})
            self.wfile.write(response_data.encode('utf-8'))
            
        except Exception as e:
            print(f"Error listing photos: {e}")
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
