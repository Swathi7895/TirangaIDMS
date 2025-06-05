'use client';
import React, { useState } from 'react';
import { Star, TrendingUp, Award, Calendar, Briefcase, ArrowUpRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Performance {
  position: string;
  promotionDate: string;
  rating: number;
  achievements: string[];
  skills: string[];
  projects: {
    name: string;
    role: string;
    duration: string;
    status: 'completed' | 'in-progress' | 'upcoming';
  }[];
  reviews: {
    date: string;
    rating: number;
    feedback: string;
    reviewer: string;
  }[];
}

export default function PerformancePage() {
  const [performance] = useState<Performance>({
    position: 'Senior Software Engineer',
    promotionDate: '2024-01-01',
    rating: 4.5,
    achievements: [
      'Best Employee Q4 2023',
      'Project Excellence Award',
      'Innovation Champion 2023',
      'Team Player of the Year 2023'
    ],
    skills: [
      'React',
      'TypeScript',
      'Node.js',
      'AWS',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Agile Methodologies'
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        role: 'Lead Developer',
        duration: 'Jan 2023 - Present',
        status: 'in-progress'
      },
      {
        name: 'Customer Portal',
        role: 'Senior Developer',
        duration: 'Jun 2022 - Dec 2022',
        status: 'completed'
      },
      {
        name: 'Mobile App Development',
        role: 'Developer',
        duration: 'Mar 2022 - May 2022',
        status: 'completed'
      }
    ],
    reviews: [
      {
        date: '2024-01-15',
        rating: 4.5,
        feedback: 'Excellent work on the e-commerce platform. Strong technical leadership and team collaboration.',
        reviewer: 'John Manager'
      },
      {
        date: '2023-07-15',
        rating: 4.0,
        feedback: 'Great progress on the customer portal. Good communication and problem-solving skills.',
        reviewer: 'Sarah Lead'
      }
    ]
  });

  const getStatusColor = (status: Performance['projects'][0]['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/employee"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Performance Overview</h1>
            <p className="mt-2 text-gray-600">Track your career growth and achievements</p>
          </div>

          {/* Current Position and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Current Position</h2>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{performance.position}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Promoted on {new Date(performance.promotionDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Current Rating</h2>
                  <div className="flex items-center mt-2">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <p className="text-2xl font-bold text-gray-900 ml-2">{performance.rating}/5</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Based on recent performance reviews</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {performance.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {performance.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Projects</h2>
            <div className="space-y-4">
              {performance.projects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-gray-600">{project.role}</p>
                    <p className="text-sm text-gray-600">{project.duration}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Reviews */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Reviews</h2>
            <div className="space-y-4">
              {performance.reviews.map((review, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">{review.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.feedback}</p>
                  <p className="text-sm text-gray-600">Reviewer: {review.reviewer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 