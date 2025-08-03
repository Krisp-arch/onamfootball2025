import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Camera, Upload, Trash2, Edit, Eye, Lock, Unlock, Plus, X, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import tournamentLogo from '../assets/logo400.png';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'tournament',
    file: null
  });

  // Sample photos for demonstration
  const samplePhotos = [
    {
      id: 1,
      url: '/src/assets/KI7WxsjHVYsK.jpg',
      title: 'Onam Football Celebration',
      description: 'Players celebrating during Onam football tournament',
      category: 'tournament',
      date: '2025-07-30',
      tags: ['onam', 'celebration', 'football']
    },
    {
      id: 2,
      url: '/src/assets/5wjM4WE5Rb8n.jpg',
      title: 'Kerala Village Football',
      description: 'Traditional football match in Kerala village setting',
      category: 'practice',
      date: '2025-07-29',
      tags: ['kerala', 'village', 'football']
    },
    {
      id: 3,
      url: '/src/assets/gBkB5a3KXEUv.png',
      title: 'Hyderabad FC Venue',
      description: 'Professional football venue in Hyderabad',
      category: 'venue',
      date: '2025-07-28',
      tags: ['hyderabad', 'venue', 'stadium']
    }
  ];

  useEffect(() => {
    // Load photos from localStorage or use sample photos
    const savedPhotos = localStorage.getItem('tournamentPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    } else {
      setPhotos(samplePhotos);
      localStorage.setItem('tournamentPhotos', JSON.stringify(samplePhotos));
    }
  }, []);

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'tournament', label: 'Tournament' },
    { value: 'practice', label: 'Practice Sessions' },
    { value: 'venue', label: 'Venue' },
    { value: 'awards', label: 'Awards Ceremony' },
    { value: 'team', label: 'Team Photos' }
  ];

  const handleAdminLogin = () => {
    // In production, this should be handled by the backend
    const correctPassword = 'admin123'; // This would come from environment variables
    if (adminPassword === correctPassword) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminPassword('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, file }));
    }
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title) {
      alert('Please provide a title and select a file');
      return;
    }

    setLoading(true);
    
    try {
      // In a real application, you would upload to a server
      // For demo, we'll create a local URL and add to the gallery
      const fileUrl = URL.createObjectURL(uploadForm.file);
      
      const newPhoto = {
        id: Date.now(),
        url: fileUrl,
        title: uploadForm.title,
        description: uploadForm.description,
        category: uploadForm.category,
        date: new Date().toISOString().split('T')[0],
        tags: uploadForm.title.toLowerCase().split(' ')
      };

      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      localStorage.setItem('tournamentPhotos', JSON.stringify(updatedPhotos));

      // Reset form
      setUploadForm({
        title: '',
        description: '',
        category: 'tournament',
        file: null
      });

      alert('Photo uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      const updatedPhotos = photos.filter(photo => photo.id !== photoId);
      setPhotos(updatedPhotos);
      localStorage.setItem('tournamentPhotos', JSON.stringify(updatedPhotos));
    }
  };

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={tournamentLogo} alt="Tournament Logo" className="w-16 h-16 mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
                <p className="text-gray-600">Capturing the moments of Onam Football Tournament 2025</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {!isAdmin ? (
                <Button
                  variant="outline"
                  onClick={() => setShowAdminLogin(true)}
                  className="flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Admin Login
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    <Unlock className="w-3 h-3 mr-1" />
                    Admin Mode
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAdminLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Login Dialog */}
        <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Admin Login</DialogTitle>
              <DialogDescription>
                Enter the admin password to manage photos
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="adminPassword">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAdminLogin(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdminLogin}>
                  Login
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Admin Upload Section */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload New Photo
                </CardTitle>
                <CardDescription>
                  Add new photos to the tournament gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePhotoUpload} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="photoTitle">Photo Title *</Label>
                      <Input
                        id="photoTitle"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter photo title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="photoCategory">Category</Label>
                      <select
                        id="photoCategory"
                        value={uploadForm.category}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        {categories.slice(1).map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="photoDescription">Description</Label>
                    <Textarea
                      id="photoDescription"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter photo description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="photoFile">Select Photo *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="photoFile"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.getElementById('photoFile').click()}
                      >
                        Choose File
                      </Button>
                      {uploadForm.file && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {uploadForm.file.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="btn-onam">
                    {loading ? 'Uploading...' : 'Upload Photo'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeletePhoto(photo.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-1 truncate">{photo.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{photo.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(cat => cat.value === photo.category)?.label}
                    </Badge>
                    <span className="text-xs text-gray-500">{photo.date}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Photos will appear here once uploaded'
              }
            </p>
          </div>
        )}

        {/* Photo Viewer Modal */}
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            {selectedPhoto && (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    className="w-full max-h-[60vh] object-contain rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedPhoto(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <Badge variant="secondary">
                      {categories.find(cat => cat.value === selectedPhoto.category)?.label}
                    </Badge>
                    <span>{selectedPhoto.date}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PhotoGallery;

