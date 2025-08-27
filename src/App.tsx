import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gravity, MatterBody } from "@/components/ui/gravity";
import { Moon, Sun, ExternalLink, Users, Code, Lightbulb, Target, Globe, Youtube, Github } from 'lucide-react';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--background', '0 0% 0%');
      document.documentElement.style.setProperty('--foreground', '0 0% 100%');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--background', '0 0% 100%');
      document.documentElement.style.setProperty('--foreground', '0 0% 3.9%');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isDark ? 'bg-black/95 border-gray-800 backdrop-blur-sm' : 'bg-white/95 border-gray-200 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src={isDark 
                  ? "https://automationalien.s3.us-east-1.amazonaws.com/PeerCode+AI+BLK+Logo+Design.png"
                  : "https://automationalien.s3.us-east-1.amazonaws.com/PeerCodeAI_logo.png"
                }
                alt="PeerCode AI Logo" 
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://www.youtube.com/@peercodeai', '_blank')}
                className={`transition-colors duration-200 ${
                  isDark ? 'hover:bg-gray-800 text-white hover:text-red-500' : 'hover:bg-gray-100 text-gray-900 hover:text-red-500'
                }`}
                title="Visit our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://github.com/peercodeai', '_blank')}
                className={`transition-colors duration-200 ${
                  isDark ? 'hover:bg-gray-800 text-white hover:text-gray-300' : 'hover:bg-gray-100 text-gray-900 hover:text-gray-600'
                }`}
                title="View our GitHub repository"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`transition-colors duration-200 ${
                  isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'
                }`}
                title="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <img 
              src={isDark 
                ? "https://automationalien.s3.us-east-1.amazonaws.com/PeerCode+AI+BLK+Logo+Design.png"
                : "https://automationalien.s3.us-east-1.amazonaws.com/PeerCodeAI_logo.png"
              }
              alt="PeerCode AI Logo" 
              className="h-24 sm:h-32 lg:h-40 xl:h-48 w-auto mx-auto mb-4 sm:mb-6"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome to PeerCode AI
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Your Collaborative Learning Hub for AI and Coding
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto"
              onClick={() => window.open('https://www.skool.com/peercode-ai-1131', '_blank')}
            >
              Join Our Community
              <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Badge variant="secondary" className="text-base sm:text-lg px-3 sm:px-4 py-2 w-full sm:w-auto">
              All Ages Welcome
            </Badge>
          </div>
        </div>
      </section>

      {/* Interactive Physics Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Interactive Learning Experience
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Drag and interact with the elements below to experience our dynamic learning approach!
            </p>
          </div>
          
          <div className="relative h-96 sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800">
            <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
              <MatterBody
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                x="30%"
                y="10%"
              >
                <div className="text-sm sm:text-base lg:text-lg bg-blue-600 text-white rounded-full hover:cursor-grab px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg transform transition-transform hover:scale-105">
                  React
                </div>
              </MatterBody>
              
              <MatterBody
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                x="30%"
                y="30%"
              >
                <div className="text-sm sm:text-base lg:text-lg bg-purple-500 text-white rounded-full hover:cursor-grab px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg transform transition-transform hover:scale-105">
                  TypeScript
                </div>
              </MatterBody>
              
              <MatterBody
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                x="40%"
                y="20%"
                angle={10}
              >
                <div className="text-sm sm:text-base lg:text-lg bg-teal-600 text-white rounded-full hover:cursor-grab px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg transform transition-transform hover:scale-105">
                  AI
                </div>
              </MatterBody>
              
              <MatterBody
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                x="75%"
                y="10%"
              >
                <div className="text-sm sm:text-base lg:text-lg bg-cyan-500 text-white rounded-full hover:cursor-grab px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg transform transition-transform hover:scale-105">
                  Learning
                </div>
              </MatterBody>
              
              <MatterBody
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                x="80%"
                y="20%"
              >
                <div className="text-sm sm:text-base lg:text-lg bg-orange-500 text-white rounded-full hover:cursor-grab px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg transform transition-transform hover:scale-105">
                  Community
                </div>
              </MatterBody>
              
              <MatterBody
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                x="50%"
                y="10%"
              >
                <div className="text-sm sm:text-base lg:text-lg bg-yellow-500 text-white rounded-full hover:cursor-grab px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg transform transition-transform hover:scale-105">
                  Collaboration
                </div>
              </MatterBody>
              
              <MatterBody
                matterBodyOptions={{ friction: 0.7, restitution: 0.3 }}
                x="60%"
                y="35%"
                bodyType="circle"
              >
                <div className="text-sm sm:text-base lg:text-lg bg-emerald-500 text-white rounded-full hover:cursor-grab px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 shadow-lg transform transition-transform hover:scale-105 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                  🎯
                </div>
              </MatterBody>
              
              <MatterBody
                matterBodyOptions={{ friction: 0.4, restitution: 0.4 }}
                x="15%"
                y="25%"
                angle={-15}
              >
                <div className="text-sm sm:text-base lg:text-lg bg-rose-500 text-white rounded-lg hover:cursor-grab px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg transform transition-transform hover:scale-105">
                  PeerCode
                </div>
              </MatterBody>
            </Gravity>
            
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm text-center bg-white/80 dark:bg-black/80 px-3 py-2 rounded-lg">
              <p>🎮 Drag and drop the elements around!</p>
              <p>Interactive learning powered by Matter.js</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 sm:mb-16">
            <Card className={`border-0 shadow-lg ${
              isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}>
              <CardContent className="p-6 sm:p-8">
                <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  At PeerCode AI, we believe that the best way to learn and master AI and coding is by doing it together. 
                  Our community is a vibrant, supportive space where learners of all ages—from curious beginners to seasoned 
                  enthusiasts—can connect, collaborate, and grow.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Whether you're just starting your journey into the exciting world of artificial intelligence and programming, 
                  or you're looking to deepen your existing skills, you'll find a welcoming environment here.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className={`border-0 shadow-lg transition-transform duration-300 hover:scale-105 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              }`}>
                <CardHeader className="pb-4">
                  <Users className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-blue-600 mb-3 sm:mb-4" />
                  <CardTitle className="text-lg sm:text-xl">Peer-to-Peer Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Our core philosophy revolves around the power of mutual learning. Engage with fellow members, 
                    share your knowledge, ask questions, and learn from diverse perspectives.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`border-0 shadow-lg transition-transform duration-300 hover:scale-105 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              }`}>
                <CardHeader className="pb-4">
                  <Code className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-purple-600 mb-3 sm:mb-4" />
                  <CardTitle className="text-lg sm:text-xl">AI & Coding Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Dive into the fascinating realms of AI and coding. From foundational concepts to advanced applications, 
                    our community is dedicated to exploring machine learning, predictive models, and coding applications.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`border-0 shadow-lg transition-transform duration-300 hover:scale-105 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              }`}>
                <CardHeader className="pb-4">
                  <Lightbulb className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-cyan-600 mb-3 sm:mb-4" />
                  <CardTitle className="text-lg sm:text-xl">Supportive Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    We prioritize creating an inclusive and friendly environment where everyone feels comfortable 
                    making mistakes, asking for help, and celebrating successes.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`border-0 shadow-lg transition-transform duration-300 hover:scale-105 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              }`}>
                <CardHeader className="pb-4">
                  <Target className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-green-600 mb-3 sm:mb-4" />
                  <CardTitle className="text-lg sm:text-xl">Project-Based Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Apply your skills by working on collaborative projects. This practical experience not only 
                    solidifies your understanding but also develops crucial communication and teamwork skills.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`border-0 shadow-lg transition-transform duration-300 hover:scale-105 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              }`}>
                <CardHeader className="pb-4">
                  <Globe className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-orange-600 mb-3 sm:mb-4" />
                  <CardTitle className="text-lg sm:text-xl">Continuous Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    With a focus on shared experiences and continuous learning, PeerCode AI is designed to be a 
                    dynamic space where you can constantly expand your horizons.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Who Can Join */}
          <div className="mb-12 sm:mb-16">
            <Card className={`border-0 shadow-lg ${
              isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}>
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl text-center mb-4">Who Can Join?</CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <p className="text-base sm:text-lg leading-relaxed text-center">
                  PeerCode AI is open to <strong>all ages</strong>! We believe that passion for learning and a 
                  curiosity for AI and coding transcend age barriers. Whether you're a student, a professional 
                  looking to reskill, or simply an individual with a keen interest in technology, you'll find 
                  your place within our community.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Our Vision */}
          <div className="mb-12 sm:mb-16">
            <Card className={`border-0 shadow-lg ${
              isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
            }`}>
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl text-center mb-4">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <p className="text-base sm:text-lg leading-relaxed text-center">
                  To build a thriving global community where individuals of all backgrounds and ages can collectively 
                  unlock their potential in AI and coding, fostering innovation and a shared future of technological literacy.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className={`border-0 shadow-lg ${
              isDark ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-r from-blue-50 to-purple-50 text-gray-900'
            }`}>
              <CardContent className="p-8 sm:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Join PeerCode AI today and become part of a movement that redefines collaborative learning in the digital age!
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-semibold w-full sm:w-auto"
                  onClick={() => window.open('https://www.skool.com/peercode-ai-1131', '_blank')}
                >
                  Join Our Skool Community
                  <ExternalLink className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 sm:py-8 border-t transition-colors duration-300 ${
        isDark ? 'bg-black border-gray-800 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">&copy; 2024 PeerCode AI. All rights reserved.</p>
          <p className="mt-2 text-sm sm:text-base">
            Join our community on{' '}
            <a 
              href="https://www.skool.com/peercode-ai-1131" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Skool
            </a>
            {' '}and follow us on{' '}
            <a 
              href="https://www.youtube.com/@peercodeai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 underline"
            >
              YouTube
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;