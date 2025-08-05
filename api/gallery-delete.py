import json
import os

def handler(request):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    }
    
    if request.method == 'OPTIONS':
        return ('', 200, headers)
    
    if request.method != 'DELETE':
        return (json.dumps({'error': 'Method not allowed'}), 405, headers)
    
    try:
        # For now, just return success - implement blob delete later
        return (json.dumps({'message': 'Photo deleted successfully'}), 200, headers)
        
    except Exception as e:
        print(f"Delete error: {e}")
        return (json.dumps({'error': f'Delete failed: {str(e)}'}), 500, headers)

app = handler
