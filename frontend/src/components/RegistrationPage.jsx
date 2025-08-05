import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { User, Users, Building, Upload, Phone, Mail, FileText, Trophy, Heart, Network, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import tournamentLogo from '../assets/logo400.png';
import upiQR from '../assets/upi_qr.jpg';
import { API_ENDPOINTS } from '../config/api';

const response = await fetch(API_ENDPOINTS.REGISTER_PLAYER, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(playerForm)
});

const RegistrationPage = () => {
  const [playerForm, setPlayerForm] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    playingPosition: ''
  });

  const [teamForm, setTeamForm] = useState({
    teamName: '',
    captainName: '',
    captainContact: '',
    captainEmail: '',
    teamMembers: ''
  });

  const [sponsorForm, setSponsorForm] = useState({
    contactNumber: '',
    email: '',
    companyName: '',
    sponsorshipLevel: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [activeTab, setActiveTab] = useState('player');

  const playingPositions = [
    'Goalkeeper (GK)',
    'Defender (CB/LB/RB)',
    'Midfielder (CM/CDM/CAM)',
    'Winger (LW/RW)',
    'Forward (ST/CF)'
  ];

  const sponsorshipLevels = [
    'Gold',
    'Silver',
    'Bronze',
    'Title Sponsor'
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    
    // Client-side validation
    if (!playerForm.fullName.trim()) {
      setSubmissionError('Full name is required');
      return;
    }
    
    if (!validateEmail(playerForm.email)) {
      setSubmissionError('Please enter a valid email address');
      return;
    }
    
    if (!validatePhone(playerForm.contactNumber)) {
      setSubmissionError('Please enter a valid contact number');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/register-player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerForm)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Clear form
        setPlayerForm({
          fullName: '',
          contactNumber: '',
          email: '',
          playingPosition: ''
        });
      } else {
        setSubmissionError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmissionError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    
    // Client-side validation
    if (!teamForm.teamName.trim()) {
      setSubmissionError('Team name is required');
      return;
    }
    
    if (!teamForm.captainName.trim()) {
      setSubmissionError('Captain name is required');
      return;
    }
    
    if (!validateEmail(teamForm.captainEmail)) {
      setSubmissionError('Please enter a valid captain email address');
      return;
    }
    
    if (!validatePhone(teamForm.captainContact)) {
      setSubmissionError('Please enter a valid captain contact number');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/register-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamForm)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Clear form
        setTeamForm({
          teamName: '',
          captainName: '',
          captainContact: '',
          captainEmail: '',
          teamMembers: ''
        });
      } else {
        setSubmissionError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmissionError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    
    // Client-side validation
    if (!sponsorForm.companyName.trim()) {
      setSubmissionError('Company name is required');
      return;
    }
    
    if (!validateEmail(sponsorForm.email)) {
      setSubmissionError('Please enter a valid email address');
      return;
    }
    
    if (!validatePhone(sponsorForm.contactNumber)) {
      setSubmissionError('Please enter a valid contact number');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/register-sponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsorForm)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Clear form
        setSponsorForm({
          contactNumber: '',
          email: '',
          companyName: '',
          sponsorshipLevel: ''
        });
      } else {
        setSubmissionError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmissionError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success message component
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for registering! You will receive a confirmation email shortly with payment details and further instructions.
              </p>
              <Button onClick={() => setSubmitted(false)} className="w-full">
                Register Another Entry
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tournament Registration</h1>
          <p className="text-sm md:text-sm opacity-90 mb-4 text-yellow-400">
            Reignite the cherished flame of Kerala's football soul<br />
            where every kick echoes the deep love we carry in our hearts,<br />
            bridging the distance and bringing home the passion we've long missed.
          </p>
        </motion.div>

        {/* Why Participate Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Join the Excitement – Register Now!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Heart className="w-12 h-12 text-red-500 mb-3" />
                  <h3 className="font-semibold mb-2">Celebrate Onam</h3>
                  <p className="text-sm text-gray-600">with the spirit of football!</p>
                </div>
                <div className="flex flex-col items-center">
                  <Network className="w-12 h-12 text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">Network</h3>
                  <p className="text-sm text-gray-600">with Malayali community in Hyderabad.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Trophy className="w-12 h-12 text-yellow-500 mb-3" />
                  <h3 className="font-semibold mb-2">Showcase Skills</h3>
                  <p className="text-sm text-gray-600">your team's skills or personal talent.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="w-12 h-12 text-green-500 mb-3" />
                  <h3 className="font-semibold mb-2">Support Youth</h3>
                  <p className="text-sm text-gray-600">sports as a valued sponsor.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Registration Forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>Choose your registration type and fill out the form</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="player" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Player
                  </TabsTrigger>
                  <TabsTrigger value="team" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team
                  </TabsTrigger>
                  <TabsTrigger value="sponsor" className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Sponsor
                  </TabsTrigger>
                </TabsList>

                {/* Error Message */}
                {submissionError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-red-700 text-sm">{submissionError}</span>
                  </motion.div>
                )}

                {/* Player Registration */}
                <TabsContent value="player">
                  <form onSubmit={handlePlayerSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="playerName">Full Name *</Label>
                        <Input
                          id="playerName"
                          value={playerForm.fullName}
                          onChange={(e) => setPlayerForm(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="playerContact">Contact Number *</Label>
                        <Input
                          id="playerContact"
                          value={playerForm.contactNumber}
                          onChange={(e) => setPlayerForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                          placeholder="Enter your contact number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="playerEmail">Email Address *</Label>
                      <Input
                        id="playerEmail"
                        type="email"
                        value={playerForm.email}
                        onChange={(e) => setPlayerForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="playerPosition">Playing Position *</Label>
                      <Select value={playerForm.playingPosition} onValueChange={(value) => setPlayerForm(prev => ({ ...prev, playingPosition: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your playing position" />
                        </SelectTrigger>
                        <SelectContent>
                          {playingPositions.map(position => (
                            <SelectItem key={position} value={position}>{position}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Registering...' : 'Register as Player'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Team Registration */}
                <TabsContent value="team">
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="teamName">Team Name *</Label>
                      <Input
                        id="teamName"
                        value={teamForm.teamName}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, teamName: e.target.value }))}
                        placeholder="Enter your team name"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="captainName">Captain/Manager Name *</Label>
                        <Input
                          id="captainName"
                          value={teamForm.captainName}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, captainName: e.target.value }))}
                          placeholder="Enter captain's name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="captainContact">Captain Contact *</Label>
                        <Input
                          id="captainContact"
                          value={teamForm.captainContact}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, captainContact: e.target.value }))}
                          placeholder="Enter captain's contact"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="captainEmail">Captain Email *</Label>
                      <Input
                        id="captainEmail"
                        type="email"
                        value={teamForm.captainEmail}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, captainEmail: e.target.value }))}
                        placeholder="Enter captain's email"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="teamMembers">Team Members (Optional)</Label>
                      <Textarea
                        id="teamMembers"
                        value={teamForm.teamMembers}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, teamMembers: e.target.value }))}
                        placeholder="List team member names (one per line or comma-separated)"
                        rows={4}
                      />
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Registering...' : 'Register Team'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Sponsor Registration */}
                <TabsContent value="sponsor">
                  <form onSubmit={handleSponsorSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={sponsorForm.companyName}
                        onChange={(e) => setSponsorForm(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sponsorContact">Contact Number *</Label>
                        <Input
                          id="sponsorContact"
                          value={sponsorForm.contactNumber}
                          onChange={(e) => setSponsorForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                          placeholder="Enter contact number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="sponsorEmail">Email Address *</Label>
                        <Input
                          id="sponsorEmail"
                          type="email"
                          value={sponsorForm.email}
                          onChange={(e) => setSponsorForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="sponsorshipLevel">Sponsorship Level *</Label>
                      <Select value={sponsorForm.sponsorshipLevel} onValueChange={(value) => setSponsorForm(prev => ({ ...prev, sponsorshipLevel: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sponsorship level" />
                        </SelectTrigger>
                        <SelectContent>
                          {sponsorshipLevels.map(level => (
                            <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Registering...' : 'Register as Sponsor'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Please pay the registration fee after submitting your form using either method below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Bank Details */}
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Bank Transfer Details</h3>
                  <div className="space-y-1 text-sm">
                    <div><strong>Account Holder:</strong> REMONTADA INDIA (OPC) PRIVATE LIMITED</div>
                    <div><strong>Account Number:</strong> 50200091136498</div>
                    <div><strong>IFSC:</strong> HDFC0000045</div>
                  </div>
                </div>
                
                {/* UPI QR and Details */}
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold mb-2">UPI / QR Payment</h3>
                  <img
                    src={upiQR}
                    alt="UPI QR Code for Rage Football Academy"
                    className="w-40 h-40 object-contain rounded mb-2 border"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="text-sm text-center">
                    <div><strong>UPI ID:</strong> 8883210696@okbizaxis</div>
                    <div className="text-gray-500">(Scan with any UPI app)</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm bg-blue-50 p-3 rounded-md">
                <strong>After payment</strong>, send your payment confirmation to{' '}
                <a href="mailto:info@ragefootballclub.com" className="text-blue-600 hover:underline">
                  info@ragefootballclub.com
                </a>{' '}
                or WhatsApp: <strong>+91 88832 10696</strong>.
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How to Register Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>How To Register and Pay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 space-y-2">
                <p>After submitting your registration form (player or team),</p>
                <p>You will be directed to a payment information page displaying RAGE Academy account details (UPI, NET BANKING).</p>
                <p>Once payment is completed, Please send the payment confirmation to info@ragefootballclub.com or via WhatsApp to +91 88832 10696.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>info@ragefootballclub.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>+91 88832 10696</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationPage;
