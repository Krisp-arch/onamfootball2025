import json
import os

def handler(request):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }
    
    if request.method == 'OPTIONS':
        return ('', 200, headers)
    
    if request.method != 'POST':
        return (json.dumps({'error': 'Method not allowed'}), 405, headers)
    
    try:
        data = json.loads(request.data.decode('utf-8'))
        password = data.get('password')
        admin_password = os.getenv('ADMIN_PASSWORD', 'admin123')
        
        if password == admin_password:
            return (json.dumps({
                'success': True,
                'message': 'Login successful',
                'token': 'admin_token_placeholder'
            }), 200, headers)
        else:
            return (json.dumps({'error': 'Invalid password'}), 401, headers)
    except Exception as e:
        return (json.dumps({'error': str(e)}), 500, headers)

app = handler
