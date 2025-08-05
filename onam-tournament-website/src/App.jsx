import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import PhotoGallery from './components/PhotoGallery';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const isSorted = true; 

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
	// If the gallery is not sorted and a user tries to navigate to it, redirect to home.
    if (!isSorted && currentPage === 'gallery') {
      return <HomePage />;
    }
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'registration':
        return <RegistrationPage />;
      case 'gallery':
        return <PhotoGallery />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
