from http.server import BaseHTTPRequestHandler
import json
import os
import requests
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            # Get Vercel Blob token
            blob_token = os.getenv('BLOB_READ_WRITE_TOKEN')
            
            if not blob_token:
                # Return empty gallery if no blob storage configured
                response = json.dumps({
                    'photos': [],
                    'message': 'No photos uploaded yet. Blob storage not configured.'
                })
                self.wfile.write(response.encode('utf-8'))
                return
            
            try:
                # List all blobs in the tournament-photos folder
                list_url = 'https://blob.vercel-storage.com/list'
                headers = {
                    'Authorization': f'Bearer {blob_token}'
                }
                params = {
                    'prefix': 'tournament-photos/'
                }
                
                blob_response = requests.get(list_url, headers=headers, params=params)
                
                if blob_response.status_code == 200:
                    blob_data = blob_response.json()
                    photos = []
                    
                    for i, blob in enumerate(blob_data.get('blobs', [])):
                        # Extract metadata from blob
                        photo = {
                            'id': i + 1,
                            'url': blob.get('url', ''),
                            'title': blob.get('pathname', '').split('/')[-1].replace('.jpg', '').replace('.png', '').replace('-', ' ').title(),
                            'description': f"Tournament photo uploaded on {blob.get('uploadedAt', '')[:10]}",
                            'category': 'tournament',
                            'date': blob.get('uploadedAt', '')[:10] if blob.get('uploadedAt') else datetime.now().strftime('%Y-%m-%d'),
                            'size': blob.get('size', 0),
                            'pathname': blob.get('pathname', ''),
                            'tags': ['tournament', 'onam', 'football']
                        }
                        photos.append(photo)
                    
                    response = json.dumps({
                        'photos': photos,
                        'total': len(photos)
                    })
                else:
                    # Fallback to sample photos if blob storage fails
                    sample_photos = [
                        {
                            'id': 1,
                            'url': '/static/images/sample1.jpg',
                            'title': 'Tournament Opening',
                            'description': 'Opening ceremony of Onam Football Tournament 2025',
                            'category': 'tournament',
                            'date': '2025-08-05',
                            'size': 1024000,
                            'pathname': 'sample1.jpg',
                            'tags': ['onam', 'football', 'opening']
                        }
                    ]
                    response = json.dumps({
                        'photos': sample_photos,
                        'message': 'Using sample photos - Blob storage error'
                    })
                
            except Exception as blob_error:
                print(f"Blob storage error: {blob_error}")
                # Return empty gallery on error
                response = json.dumps({
                    'photos': [],
                    'message': 'Error accessing photo storage'
                })
            
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            print(f"Gallery photos error: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = json.dumps({'error': 'Failed to fetch photos'})
            self.wfile.write(error_response.encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
