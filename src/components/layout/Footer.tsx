import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Imploy</span>
                <div className="text-sm text-gray-400">Global Talent Platform</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              The leading global recruitment platform connecting top talent with world-class companies. 
              Discover your next career opportunity or find the perfect candidate for your team.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">For Job Seekers</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Profile</Link></li>
              <li><Link to="/seeker" className="hover:text-white transition-colors">Job Dashboard</Link></li>
              <li><Link to="/career-advice" className="hover:text-white transition-colors">Career Advice</Link></li>
              <li><Link to="/resume-builder" className="hover:text-white transition-colors">Resume Builder</Link></li>
              <li><Link to="/salary-guide" className="hover:text-white transition-colors">Salary Guide</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">For Employers</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/employer/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link to="/employer/register" className="hover:text-white transition-colors">Employer Account</Link></li>
              <li><Link to="/employer" className="hover:text-white transition-colors">Manage Jobs</Link></li>
              <li><Link to="/talent-search" className="hover:text-white transition-colors">Search Talent</Link></li>
              <li><Link to="/employer-solutions" className="hover:text-white transition-colors">Recruitment Solutions</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Company & Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
            
            <div className="space-y-2 text-sm text-gray-400 pt-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@imploy.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Imploy Global. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Trusted by 2,100+ companies worldwide</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer