import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Map, AlertTriangle, Users, Brain, Smartphone } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'AI-Powered Safety',
      description: 'Advanced machine learning algorithms predict crime patterns and suggest safe routes in real-time.'
    },
    {
      icon: <Map className="w-8 h-8 text-blue-600" />,
      title: 'Safe Route Navigation',
      description: 'Get the safest path to your destination, avoiding high-risk areas identified by our AI system.'
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
      title: 'Emergency SOS',
      description: 'One-tap emergency alert system that instantly notifies your contacts and authorities with your location.'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Community Reporting',
      description: 'Report incidents and help keep your community safe with real-time incident sharing.'
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: 'SafeBot Assistant',
      description: '24/7 AI safety assistant providing instant guidance and emergency support when you need it most.'
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: 'Mobile-First Design',
      description: 'Optimized for mobile devices with intuitive interface for quick access during emergencies.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Cities Covered' },
    { number: '95%', label: 'Safety Accuracy' },
    { number: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your AI-Powered
                <span className="block text-blue-200">Safety Companion</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Navigate safely with real-time crime prediction, emergency alerts, and community-driven safety intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 text-center"
                >
                  Get Started 
                </Link>
                <Link
                  to="/dashboard"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 text-center"
                >
                  Explore Dashboard
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="w-24 h-24 text-white/60 mx-auto mb-4" />
                    <p className="text-white/80 text-lg">Interactive Safety Map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Safety Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to stay safe, from predictive AI to emergency response systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How SafeSphere Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to enhance your safety with AI-powered intelligence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sign Up & Set Up
              </h3>
              <p className="text-gray-600">
                Create your account and configure your emergency contacts and safety preferences.
              </p>
            </div>
            
            <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Get AI Insights
              </h3>
              <p className="text-gray-600">
                Receive real-time safety alerts and route suggestions based on AI analysis of crime patterns.
              </p>
            </div>
            
            <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Stay Protected
              </h3>
              <p className="text-gray-600">
                Navigate safely with confidence, knowing you have instant emergency support when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Safety?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust SafeSphere to keep them safe every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Start Your Trial
            </Link>
            <Link
              to="/safebot"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Chat with SafeBot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
