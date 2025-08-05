from flask import Flask, request, jsonify
import os
import json
from vercel_blob import VercelBlob

app = Flask(__name__)

# Initialize Vercel Blob client
def get_blob_client():
    token = os.getenv('BLOB_READ_WRITE_TOKEN')
    if not token:
        raise Exception("BLOB_READ_WRITE_TOKEN environment variable not set")
    return VercelBlob(token=token)

@app.route('/', methods=['GET'])
def handler():
    try:
        blob_client = get_blob_client()
        
        # List all blobs in the onamrage25 folder
        blobs = blob_client.list(prefix='onamrage25/')
        
        # Format the response to match your frontend expectations
        photos = []
        for i, blob in enumerate(blobs.get('blobs', []), 1):
            photo = {
                'id': i,
                'url': blob['url'],
                'title': blob.get('pathname', '').split('/')[-1].replace('_', ' ').title(),
                'description': f"Photo from Onam Football Tournament 2025",
                'category': 'tournament',  # You can enhance this logic
                'date': blob.get('uploadedAt', '2025-08-05'),
                'tags': ['onam', 'football', 'tournament'],
                'downloadUrl': blob.get('downloadUrl', blob['url']),
                'size': blob.get('size', 0),
                'pathname': blob.get('pathname', '')
            }
            photos.append(photo)
        
        return jsonify({'photos': photos}), 200
        
    except Exception as e:
        print(f"Error listing photos: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
