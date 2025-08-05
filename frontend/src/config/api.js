const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Same domain in production
  : 'http://localhost:5000'; // Local Flask dev server

export const API_ENDPOINTS = {
  REGISTER_PLAYER: `${API_BASE_URL}/api/register-player`,
  REGISTER_TEAM: `${API_BASE_URL}/api/register-team`,
  REGISTER_SPONSOR: `${API_BASE_URL}/api/register-sponsor`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin-login`,
  GALLERY_PHOTOS: `${API_BASE_URL}/api/gallery-photos`,
  GALLERY_UPLOAD: `${API_BASE_URL}/api/gallery-upload`,
  GALLERY_DELETE: `${API_BASE_URL}/api/gallery-delete`,
  GALLERY_CATEGORIES: `${API_BASE_URL}/api/gallery-categories`,
};
