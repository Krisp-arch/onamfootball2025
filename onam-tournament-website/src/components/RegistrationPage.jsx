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
import { User, Users, Building, Upload, Phone, Mail, FileText, Trophy, Heart, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import tournamentLogo from '../assets/logo400.png';

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

  const playingPositions = [
    'Goalkeeper (GK)',
    'Defender (CB/LB/RB)',
    'Midfielder (CM/CDM/CAM)',
    'Winger (LW/RW)',
    'Forward (ST/CF)'
  ];

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/register/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerForm)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/register/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamForm)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/register/sponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsorForm)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (file, type, formType) => {
    if (formType === 'player') {
      setPlayerForm(prev => ({ ...prev, [type]: file }));
    } else if (formType === 'team') {
      setTeamForm(prev => ({ ...prev, [type]: file }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Registration Successful! 🎉</h2>
              <p className="text-gray-600 mb-6">
                Thank you for registering! You will receive a confirmation email shortly with payment details and further instructions.
              </p>
              <Button 
                onClick={() => setSubmitted(false)}
                className="btn-onam"
              >
                Register Another Entry
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <img src={tournamentLogo} alt="Tournament Logo" className="w-16 h-16 mr-4" />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Tournament Registration</h1>
              <p className="text-gray-600">Join the Excitement – Register Now!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Choose one of the options below to participate or support the tournament:</h2>
          </div>

          <Tabs defaultValue="player" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="player" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Register as Player
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Register as Team
              </TabsTrigger>
              <TabsTrigger value="sponsor" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Become a Sponsor
              </TabsTrigger>
            </TabsList>

            {/* Player Registration */}
            <TabsContent value="player">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Player Registration
                  </CardTitle>
                  <CardDescription>
                    Join the tournament as an individual player! Please fill out the form below and proceed to payment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePlayerSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="playerName">Player's Full Name *</Label>
                        <Input
                          id="playerName"
                          type="text"
                          required
                          value={playerForm.fullName}
                          onChange={(e) => setPlayerForm(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="playerContact">Contact Number (WhatsApp preferred) *</Label>
                        <Input
                          id="playerContact"
                          type="tel"
                          required
                          value={playerForm.contactNumber}
                          onChange={(e) => setPlayerForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="playerEmail">Email Address *</Label>
                      <Input
                        id="playerEmail"
                        type="email"
                        required
                        value={playerForm.email}
                        onChange={(e) => setPlayerForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="playingPosition">Playing Position *</Label>
                      <Select onValueChange={(value) => setPlayerForm(prev => ({ ...prev, playingPosition: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred position" />
                        </SelectTrigger>
                        <SelectContent>
                          {playingPositions.map((position) => (
                            <SelectItem key={position} value={position}>
                              {position}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>


                    <Button 
                      type="submit" 
                      className="w-full btn-onam text-lg py-6"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Submit ➔'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Registration */}
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Team Registration
                  </CardTitle>
                  <CardDescription>
                    Register your team to compete! Please fill out the team details and proceed to payment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTeamSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="teamName">Team Name *</Label>
                        <Input
                          id="teamName"
                          type="text"
                          required
                          value={teamForm.teamName}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, teamName: e.target.value }))}
                          placeholder="Enter your team name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="captainName">Captain/Manager Name *</Label>
                        <Input
                          id="captainName"
                          type="text"
                          required
                          value={teamForm.captainName}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, captainName: e.target.value }))}
                          placeholder="Enter captain's name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="captainContact">Captain/Manager Contact Number *</Label>
                        <Input
                          id="captainContact"
                          type="tel"
                          required
                          value={teamForm.captainContact}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, captainContact: e.target.value }))}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="captainEmail">Captain/Manager Email Address *</Label>
                        <Input
                          id="captainEmail"
                          type="email"
                          required
                          value={teamForm.captainEmail}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, captainEmail: e.target.value }))}
                          placeholder="captain@example.com"
                        />
                      </div>
                    </div>



                    <div className="space-y-2">
                      <Label htmlFor="teamMembers">Team Members (Optional)</Label>
                      <Textarea
                        id="teamMembers"
                        value={teamForm.teamMembers}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, teamMembers: e.target.value }))}
                        placeholder="Please provide names and playing positions for up to 10 team members. Upload Aadhar cards for each member if possible."
                        rows={4}
                      />
                      <p className="text-sm text-gray-500">
                        Note: Collecting member names with playing positions helps us manage the tournament better and ensure fair play.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-onam text-lg py-6"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Submit ➔'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sponsor Registration */}
            <TabsContent value="sponsor">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Sponsor Registration
                  </CardTitle>
                  <CardDescription>
                    Partner with us to make this event grand! Choose your sponsorship level and share your details so we can get in touch.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSponsorSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sponsorContact">Contact Number *</Label>
                        <Input
                          id="sponsorContact"
                          type="tel"
                          required
                          value={sponsorForm.contactNumber}
                          onChange={(e) => setSponsorForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sponsorEmail">Email Address *</Label>
                        <Input
                          id="sponsorEmail"
                          type="email"
                          required
                          value={sponsorForm.email}
                          onChange={(e) => setSponsorForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="company@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        type="text"
                        required
                        value={sponsorForm.companyName}
                        onChange={(e) => setSponsorForm(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Sponsorship Interest *</Label>
                      <RadioGroup
                        value={sponsorForm.sponsorshipLevel}
                        onValueChange={(value) => setSponsorForm(prev => ({ ...prev, sponsorshipLevel: value }))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="diamond" id="diamond" />
                          <Label htmlFor="diamond" className="flex items-center gap-2">
                            <Badge className="bg-purple-100 text-purple-800">💎 Diamond Sponsor</Badge>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gold" id="gold" />
                          <Label htmlFor="gold" className="flex items-center gap-2">
                            <Badge className="bg-yellow-100 text-yellow-800">🥇 Gold Sponsor</Badge>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="flex items-center gap-2">
                            <Badge className="bg-gray-100 text-gray-800">Other (Please specify)</Badge>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-rage text-lg py-6"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Submit'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Why Participate Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-yellow-50 to-green-50">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Why Participate?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 text-center">
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

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>How To Register and Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  After submitting your registration form (player or team),</p>
				<p className="text-gray-600">
				  You will be directed to a payment information page displaying RAGE Academy account details (UPI, NET BANKING). </p>
				 <p className="text-gray-600"> 
				  Once payment is completed, Please send the payment confirmation to info@ragefootballclub.com or via Whatsapp to [RAGE MOBILE CONTACT].
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>Email: info@ragefootballclub.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span>Phone: +91 88832 10696</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationPage;

