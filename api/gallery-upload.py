from flask import Flask, request, jsonify
import os
import uuid
from datetime import datetime
from vercel_blob import VercelBlob

app = Flask(__name__)

def get_blob_client():
    token = os.getenv('BLOB_READ_WRITE_TOKEN')
    if not token:
        raise Exception("BLOB_READ_WRITE_TOKEN environment variable not set")
    return VercelBlob(token=token)

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['POST'])
def handler():
    try:
        # Check admin authentication (simplified)
        auth_header = request.headers.get('Authorization')
        if not auth_header or auth_header != 'Bearer admin_token_placeholder':
            return jsonify({'error': 'Unauthorized'}), 401

        # Check for file in request
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PNG, JPG, JPEG, GIF, and WEBP are allowed.'}), 400

        # Get form data
        title = request.form.get('title', file.filename)
        description = request.form.get('description', '')
        category = request.form.get('category', 'tournament')

        # Generate unique filename
        file_extension = file.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        blob_pathname = f"onamrage25/{unique_filename}"

        # Upload to Vercel Blob
        blob_client = get_blob_client()
        file_content = file.read()
        
        # Upload the file
        response = blob_client.put(blob_pathname, file_content, {
            "addRandomSuffix": False,
            "contentType": file.content_type or f"image/{file_extension}"
        })

        # Create photo metadata
        photo_data = {
            'id': int(datetime.now().timestamp()),
            'url': response['url'],
            'downloadUrl': response.get('downloadUrl', response['url']),
            'title': title,
            'description': description,
            'category': category,
            'date': datetime.now().strftime('%Y-%m-%d'),
            'tags': title.lower().split(),
            'pathname': response['pathname'],
            'size': len(file_content)
        }

        return jsonify({
            'message': 'Photo uploaded successfully',
            'photo': photo_data
        }), 200

    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500

if __name__ == '__main__':
    app.run()
