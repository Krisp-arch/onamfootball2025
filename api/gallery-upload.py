import json
import os

def handler(request):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    }
    
    if request.method == 'OPTIONS':
        return ('', 200, headers)
    
    if request.method != 'POST':
        return (json.dumps({'error': 'Method not allowed'}), 405, headers)
    
    try:
        # For now, just return success - implement blob upload later
        return (json.dumps({
            'message': 'Photo uploaded successfully',
            'photo': {'id': 1, 'title': 'Sample Photo'}
        }), 200, headers)
        
    except Exception as e:
        print(f"Upload error: {e}")
        return (json.dumps({'error': f'Upload failed: {str(e)}'}), 500, headers)

app = handler
