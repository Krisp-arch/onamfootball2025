from flask import Flask, request, jsonify
import os
from vercel_blob import VercelBlob

app = Flask(__name__)

def get_blob_client():
    token = os.getenv('BLOB_READ_WRITE_TOKEN')
    if not token:
        raise Exception("BLOB_READ_WRITE_TOKEN environment variable not set")
    return VercelBlob(token=token)

@app.route('/', methods=['DELETE'])
def handler():
    try:
        # Check admin authentication
        auth_header = request.headers.get('Authorization')
        if not auth_header or auth_header != 'Bearer admin_token_placeholder':
            return jsonify({'error': 'Unauthorized'}), 401

        # Get the photo URL from request body
        data = request.get_json()
        photo_url = data.get('url') or data.get('pathname')
        
        if not photo_url:
            return jsonify({'error': 'Photo URL or pathname required'}), 400

        # Delete from Vercel Blob
        blob_client = get_blob_client()
        blob_client.delete(photo_url)

        return jsonify({'message': 'Photo deleted successfully'}), 200

    except Exception as e:
        print(f"Delete error: {e}")
        return jsonify({'error': f'Delete failed: {str(e)}'}), 500

if __name__ == '__main__':
    app.run()
