import json
import os

def handler(request):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }
    
    if request.method == 'OPTIONS':
        return ('', 200, headers)
    
    if request.method != 'GET':
        return (json.dumps({'error': 'Method not allowed'}), 405, headers)
    
    try:
        # For now, return sample data - you can integrate Vercel Blob later
        sample_photos = [
            {
                'id': 1,
                'url': '/static/images/sample1.jpg',
                'title': 'Onam Football Celebration',
                'description': 'Players celebrating during Onam football tournament',
                'category': 'tournament',
                'date': '2025-08-05',
                'tags': ['onam', 'football', 'tournament'],
                'size': 0
            }
        ]
        
        return (json.dumps({'photos': sample_photos}), 200, headers)
        
    except Exception as e:
        print(f"Error listing photos: {e}")
        return (json.dumps({'error': str(e)}), 500, headers)

app = handler
