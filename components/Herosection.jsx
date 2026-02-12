'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Section - Image */}
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="relative">
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl h-[500px] bg-slate-900"
                style={{
                  backgroundImage: "url('https://images.pexels.com/photos/14354106/pexels-photo-14354106.jpeg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-slate-900/30"></div>
                
                {/* Optional Badge on Image */}
                <div className="absolute bottom-6 left-6">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900">AI-Powered Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div 
            className={`transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            {/* Logo/Brand */}

            {/* Main Heading */}
            <h1 className="mt-20 text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Secure Your Blockchain
              <span className="text-blue-600"> Transactions</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              AI-powered fraud detection system that analyzes blockchain transactions in real-time. 
              Protect your assets with advanced machine learning algorithms.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Real-time transaction analysis</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">99.9% accuracy rate</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Instant fraud alerts</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/fraudtransactions">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Analysis
              </button>
              </Link>

              <button className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600 mt-1">Analyzed</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600 mt-1">Accuracy</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-gray-900">&lt;1s</div>
                <div className="text-sm text-gray-600 mt-1">Response</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}