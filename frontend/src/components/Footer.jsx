import React from 'react';
import { Card, CardContent } from './ui/card';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import tournamentLogo from '../assets/logo400.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Tournament Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={tournamentLogo} 
                alt="Tournament Logo" 
                className="w-12 h-12 mr-3"
              />
              <div>
                <h3 className="text-xl font-bold">Onam Football Tournament 2025</h3>
                <p className="text-gray-400">Chapter One</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Celebrating Onam through football - where Hyderabad meets Kerala through unity, 
              passion, and the beautiful game. Join us for an unforgettable tournament experience.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/ragerzfootballacademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a 
                  href="mailto:info@ragefootballclub.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@ragefootballclub.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <a 
                  href="tel:+918883210696"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 88832 10696
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-red-400 mt-1" />
                <div className="text-gray-300">
                  <p>A2Z Ground, Tellapur</p>
                  <p>Hyderabad, Telangana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Tournament Rules
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Registration Guidelines
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Sponsorship Opportunities
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Photo Gallery
              </a>
              <a 
                href="https://ragefootballclub.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Rage Football Academy
              </a>
            </div>
          </div>
        </div>

        {/* Tournament Highlights */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-400 mb-1">₹40,000</div>
                <div className="text-sm text-gray-300">Total Prize Money</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-400 mb-1">7v7</div>
                <div className="text-sm text-gray-300">Tournament Format</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-400 mb-1">Onam 2025</div>
                <div className="text-sm text-gray-300">Special Edition</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Rage Football Academy. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Organized with ❤️ for the Malayali community in Hyderabad
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

