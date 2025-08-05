import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Camera, Upload, Trash2, Edit, Eye, Lock, Unlock, Plus, X, Search, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import tournamentLogo from '../assets/logo400.png';
import { API_ENDPOINTS } from '../config/api';

// For fetching photos:
const response = await fetch(API_ENDPOINTS.GALLERY_PHOTOS);

// For admin login:
const response = await fetch(API_ENDPOINTS.ADMIN_LOGIN, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password: adminPassword })
});

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminToken, setAdminToken] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetchingPhotos, setFetchingPhotos] = useState(true);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'tournament',
    file: null
  });

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'tournament', label: 'Tournament' },
    { value: 'practice', label: 'Practice Sessions' },
    { value: 'venue', label: 'Venue' },
    { value: 'awards', label: 'Awards Ceremony' },
    { value: 'team', label: 'Team Photos' }
  ];

  // Fetch photos from Vercel Blob storage
  const fetchPhotos = async () => {
    setFetchingPhotos(true);
    try {
      const response = await fetch('/api/gallery-photos');
      const result = await response.json();
      
      if (response.ok) {
        setPhotos(result.photos || []);
      } else {
        console.error('Failed to fetch photos:', result.error);
        // Show user-friendly error
        alert('Failed to load photos. Please refresh the page.');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      alert('Error connecting to server. Please check your connection.');
    } finally {
      setFetchingPhotos(false);
    }
  };

  // Admin login
  const handleAdminLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: adminPassword })
      });

      const result = await response.json();

      if (response.ok) {
        setIsAdmin(true);
        setAdminToken(result.token);
        setShowAdminLogin(false);
        setAdminPassword('');
        alert('Admin login successful!');
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Admin logout
  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminToken('');
    setAdminPassword('');
  };

  // Handle file selection
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }
      
      // Validate file size (e.g., max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
      }

      setUploadForm(prev => ({ ...prev, file }));
    }
  };

  // Upload photo to Vercel Blob storage
  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.file || !uploadForm.title.trim()) {
      alert('Please provide a title and select a file');
      return;
    }

    if (!isAdmin || !adminToken) {
      alert('Admin authentication required');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', uploadForm.file);
      formData.append('title', uploadForm.title.trim());
      formData.append('description', uploadForm.description.trim());
      formData.append('category', uploadForm.category);

      const response = await fetch('/api/gallery-upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        alert('Photo uploaded successfully!');
        
        // Reset form
        setUploadForm({
          title: '',
          description: '',
          category: 'tournament',
          file: null
        });
        
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
        // Refresh photos
        await fetchPhotos();
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  // Delete photo from Vercel Blob storage
  const handleDeletePhoto = async (photo) => {
    if (!window.confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      return;
    }

    if (!isAdmin || !adminToken) {
      alert('Admin authentication required');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/gallery-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ 
          url: photo.url, 
          pathname: photo.pathname 
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Photo deleted successfully!');
        // Remove photo from local state
        setPhotos(prev => prev.filter(p => p.id !== photo.id));
      } else {
        alert(result.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load photos on component mount
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Filter photos based on search and category
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (photo.tags && photo.tags.some(tag => tag.includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <img 
            src={tournamentLogo} 
            alt="Tournament Logo" 
            className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Photo Gallery</h1>
          <p className="text-gray-600">Capturing the moments of Onam Football Tournament 2025</p>
        </motion.div>

        {/* Admin Controls */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <CardTitle>Gallery Management</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchPhotos}
                  disabled={fetchingPhotos}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${fetchingPhotos ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                {isAdmin ? (
                  <Button variant="outline" size="sm" onClick={handleAdminLogout}>
                    <Unlock className="w-4 h-4 mr-2" />
                    Logout Admin
                  </Button>
                ) : (
                  <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Lock className="w-4 h-4 mr-2" />
                        Admin Login
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Admin Login</DialogTitle>
                        <DialogDescription>
                          Enter admin password to upload and manage photos
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          type="password"
                          placeholder="Admin Password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                        />
                        <Button onClick={handleAdminLogin} disabled={loading} className="w-full">
                          {loading ? 'Logging in...' : 'Login'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Upload Form - Admin Only */}
        {isAdmin && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload New Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePhotoUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="file">Photo File *</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      required
                    />
                    {uploadForm.file && (
                      <p className="text-sm text-gray-500 mt-1">
                        Selected: {uploadForm.file.name} ({Math.round(uploadForm.file.size / 1024)}KB)
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter photo title"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter photo description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                
                <Button type="submit" disabled={uploading || !uploadForm.file || !uploadForm.title.trim()}>
                  {uploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search photos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photos Grid */}
        {fetchingPhotos ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading photos...</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
              <p className="text-gray-500">
                {photos.length === 0 
                  ? 'No photos have been uploaded yet.' 
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {isAdmin && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeletePhoto(photo)}
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{photo.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{photo.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{photo.category}</Badge>
                      <span className="text-xs text-gray-500">{photo.date}</span>
                    </div>
                    {photo.size && (
                      <div className="mt-2 text-xs text-gray-400">
                        {Math.round(photo.size / 1024)}KB
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>{selectedPhoto.title}</DialogTitle>
                <DialogDescription>{selectedPhoto.description}</DialogDescription>
              </DialogHeader>
              <div className="flex justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-2">
                  <Badge>{selectedPhoto.category}</Badge>
                  <span className="text-sm text-gray-500">{selectedPhoto.date}</span>
                </div>
                <div className="flex gap-2">
                  {selectedPhoto.downloadUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedPhoto.downloadUrl} download target="_blank" rel="noopener noreferrer">
                        Download
                      </a>
                    </Button>
                  )}
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedPhoto(null);
                        handleDeletePhoto(selectedPhoto);
                      }}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
