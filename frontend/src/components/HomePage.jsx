import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Users, MapPin, Clock, Star, Camera, Heart } from 'lucide-react';
import TOverview from '../assets/overview.png';
import MFormat from '../assets/format.png';
import Celebrate from '../assets/celebration.png';
import { motion } from 'framer-motion';
import tournamentLogo from '../assets/logo400.png';
import footballAction from '../assets/KI7WxsjHVYsK.jpg';
import './HomePage.css';

const HomePage = ({ onNavigate }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center text-white"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="mb-2">
              <img 
                src={tournamentLogo} 
                alt="Chapter One Tournament Logo" 
                className="w-32 h-32 mx-auto mb-2 animate-float"
              />
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-2">
              <span className="text-yellow-400"> RAGE Premier 7s Malayalee Cup </span> 
            </motion.h1>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold mb-2">
              Feel the Onam spirit. Fuel your football passion!
            </motion.h2>
            
            <motion.div variants={fadeInUp} className="mb-8" >
             
             	<p className="text-xl md:text-1xl mb-2 hidden" >ORGANISED BY RAGE FOOTBALL CLUB AND ACADEMY</p> 
			  
              <p className="text-sm md:text-sm opacity-90 mb-4">
			  <span className="text-yellow-400">
			  Reignite the cherished flame of Kerala’s football soul<br />where every kick echoes the deep love we carry in our hearts,<br /> bridging the distance and bringing home the passion we’ve long missed.
				</span>
				</p>
			  
			  <p className="text-sm md:text-sm opacity-90 mb-2 "> Team up or register solo — passion knows no limits.
			  </p>
			  <p className="text-sm md:text-sm opacity-90 mb-2"> 
				Dates: Sept 13, 14, 20 & 28
				</p>
			  <p className="text-sm md:text-sm opacity-90 mb-2"> 
				Register: Team (7+3) ₹5000 | Individual ₹750
			</p>
			  <p className="text-sm md:text-sm opacity-90 mb-2"> 
				Win ₹25,000 + trophies & medals; Runners-up ₹15,000 + trophies & medals.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
			<div className="flex flex-col items-center">
			<p className="text-sm font-medium mb-2 text-white">Lace Up & Represent</p>
	
			 <Button 
                size="lg" 
                className="btn-onam text-lg px-8 py-4"
                onClick={() => onNavigate('registration')}
              >
                REGISTER AS A PLAYER
              </Button>
			  </div>
			  
			   <div className="flex flex-col items-center">
				<p className="text-sm font-medium mb-2 text-white">Unite. Compete. Conquer</p>
	
			  <Button 
                size="lg" 
                className="btn-onam text-lg px-8 py-4"
                onClick={() => onNavigate('registration')}
              >
                REGISTER YOUR TEAM
              </Button>
			  </div>
			   
			  <div className="flex flex-col items-center">
				<p className="text-sm font-medium mb-2 text-white">Support Culture. Fuel Passion</p>
			  <Button 
                size="lg" 
				className="btn-onam1  text-lg px-8 py-4"
                onClick={() => onNavigate('registration')}
              >
                BECOME A SPONSOR 
              </Button>
			  </div>
			  
			</motion.div>
          </motion.div>
        </div>

        {/* Floating football elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-6 h-6 bg-green-400 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* About Tournament Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🎊 THIS… IS… YOUR <span className="text-yellow-500">MOMENT!</span> 🔥
            </h2>
            <div className="max-w-4xl mx-auto text-lg md:text-xl text-gray-700 space-y-4">
              <p>Whether you're a dribbler dancing through defenders, A wall in goal saving your team, A sideline fan with your whistle and towel… Or just someone who LOVES this beautiful game — THIS TOURNAMENT IS FOR YOU.</p>
              <p className="font-semibold">Because we're not just playing football — We're celebrating a legacy, Fuelled by spirit, culture, and that electrifying Onam energy!</p>
            </div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img src={TOverview} alt ="Tournament overview icon" className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Tournament Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Dates: September 13, 14, 20 & 28 </p>
				<p className="text-gray-600">(Weekends only)</p>
                <p className="text-sm text-gray-500 mt-2">Venue: A2Z Ground. Tellapur.</p>
				<p className="text-sm text-gray-500 mt-2">Hosted by: RAGE football Academy to bring Kerala's spirit alive in Hyderabad </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img src={MFormat} alt="Format icon" className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Format & Match Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">7-A-Side format built for speed, tactics and intensity</p>
				<p className="text-gray-600">Match duration: 12+3 (break)+ 12 minutes </p>
                <p className="text-sm text-gray-500 mt-2"> 3 substitutions allowed per team per match</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <img src={Celebrate} alt="Celebrations icon" className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
                <CardTitle>Why you shouldn't miss it</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Celebrate Onam with thrilling football and festive energy</p>
				 <p className="text-sm text-gray-600 mt-2">Connect with Malayali community through sport and tradition.</p>
				  <p className="text-sm text-gray-600 mt-2">compete for trophies, pride, and unforgettable moments.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Tournament Highlights */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              It's not just about goals — it's about:
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  🧠
                </div>
                <p className="font-semibold">Midfield Control</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  🛡️
                </div>
                <p className="font-semibold">Tight Defense</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  🕸️
                </div>
                <p className="font-semibold">Fluid Triangles</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  🎯
                </div>
                <p className="font-semibold">Clinical Finishing</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
              🎯 Matches are short. But the drama is BIG.
            </p>
            <p className="text-xl mb-8">One mistake? One magic moment? That's all it takes.</p>
            <p className="text-lg">So coaches — get your rotations ready. Captains — rally your squad. Players — give every ounce of sweat like it's your last game!</p>
          </motion.div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 onam-gradient">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🏆 GLORY & HONOURS AWAIT! 🏆
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <Card className="bg-white/90 backdrop-blur">
                <CardHeader className="text-center">
                  <Trophy className="w-16 h-16 mx-auto text-yellow-600 mb-4" />
                  <CardTitle className="text-2xl">🥇 Winners</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-green-600">₹25,000</p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur">
                <CardHeader className="text-center">
                  <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <CardTitle className="text-2xl">🥈 Runner-up</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-3xl font-bold text-blue-600">₹15,000</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              <Card className="bg-white/90 backdrop-blur text-center p-4">
                <Star className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                <p className="font-semibold text-sm">✨ MVP of the Tournament</p>
              </Card>
              <Card className="bg-white/90 backdrop-blur text-center p-4">
                <div className="text-2xl mb-2">🧤</div>
                <p className="font-semibold text-sm">Best Goalkeeper</p>
              </Card>
              <Card className="bg-white/90 backdrop-blur text-center p-4">
                <div className="text-2xl mb-2">⚽</div>
                <p className="font-semibold text-sm">Top Scorer</p>
              </Card>
              <Card className="bg-white/90 backdrop-blur text-center p-4">
                <div className="text-2xl mb-2">🎖️</div>
                <p className="font-semibold text-sm">Man of the Match</p>
              </Card>
              <Card className="bg-white/90 backdrop-blur text-center p-4">
                <Heart className="w-8 h-8 mx-auto text-red-600 mb-2" />
                <p className="font-semibold text-sm">🤝 Fair Play Award</p>
              </Card>
            </div>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <Camera className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                  <p className="text-lg font-semibold mb-2">📸 Professional Coverage</p>
                  <p className="text-gray-600">Every moment will be captured with professional photos and reels. Your sliding tackles, nutmegs, and top-corner screamers — ready to go viral on Instagram! 💥📱</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              💚 CULTURE. COMMUNITY. CONNECTION.
            </h2>
            <div className="max-w-4xl mx-auto text-lg md:text-xl text-gray-700 space-y-6">
              <p className="font-semibold">This isn't just football — This is Onam through Football.</p>
              <p>A celebration of unity, nostalgia, tradition… …with boots on, hearts open, and eyes on the goal.</p>
              <p className="text-2xl font-bold text-green-600">Drums. Cheers. Whistles. Family. Friendship. 📣</p>
              <p>If you've seen a Kerala football final… You know what's coming! That same vibration is coming to Tellapur!</p>
            </div>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-red-600">
              🔥 TELLAPUR… ARE YOU READY?!
            </h3>
            <div className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
              <p>Kozhikode kuthiya spirit is here. Trivandruminte tactics, Malappuraminte madness, and Thrissurinte thalam — it's all here, in every match!</p>
              <p className="font-semibold">So whether you play, cheer, vibe, or support — BE THERE. BE LOUD. BE PART OF THE LEGACY.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              🌟 Onam 2025 begins a new football chapter —
            </h2>
            <p className="text-xl md:text-2xl mb-8">Written with goals, grit, and grassroots passion.</p>
            <p className="text-2xl md:text-3xl font-bold text-red-500 mb-8">
              🚨 No second chances. No replays. It's now or never.
            </p>
            <p className="text-xl md:text-2xl mb-12">
              So come on, Hyderabad… <span className="text-yellow-400 font-bold">LET'S MAKE HISTORY – WITH EVERY KICK!</span> 🥳⚽🇮🇳
            </p>
            
            <Button 
              size="lg" 
              className="btn-onam text-xl px-12 py-6"
              onClick={() => onNavigate('registration')}
            >
              JOIN THE LEGACY NOW! 🔥
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

