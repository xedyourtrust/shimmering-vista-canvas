
import React, { useEffect } from 'react';
import { Play, Award, Users, Zap } from 'lucide-react';

const Timeline = () => {
  const timelineEvents = [
    {
      id: 1,
      year: '2024',
      month: 'January',
      title: 'New Year Launch',
      description: 'Started our journey with ambitious goals and fresh perspectives',
      icon: Zap,
      media: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop',
      milestone: true
    },
    {
      id: 2,
      year: '2023',
      month: 'December',
      title: 'Team Expansion',
      description: 'Welcomed 50+ new team members to our growing family',
      icon: Users,
      media: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
      milestone: false
    },
    {
      id: 3,
      year: '2023',
      month: 'September',
      title: 'Industry Recognition',
      description: 'Received the Innovation Award for outstanding contributions',
      icon: Award,
      media: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=200&fit=crop',
      milestone: true
    },
    {
      id: 4,
      year: '2023',
      month: 'June',
      title: 'Product Launch',
      description: 'Successfully launched our flagship product to market acclaim',
      icon: Play,
      media: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
      milestone: true
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-20 bg-gradient-to-br from-lavender/20 to-sky/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-quicksand font-bold text-text-primary mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
            Explore the milestones that have shaped our story and defined our path forward
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary rounded-full opacity-30"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className={`timeline-item opacity-0 flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`relative w-full max-w-lg ${
                  index % 2 === 0 ? 'pr-8' : 'pl-8'
                }`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-scale transition-all duration-300 hover:shadow-xl">
                    {/* Media */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.media}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-white text-sm font-medium">
                          {event.month} {event.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          event.milestone ? 'bg-gradient-primary' : 'bg-gray-100'
                        }`}>
                          <event.icon className={`h-5 w-5 ${
                            event.milestone ? 'text-white' : 'text-gray-600'
                          }`} />
                        </div>
                        <h3 className="text-xl font-quicksand font-semibold text-text-primary">
                          {event.title}
                        </h3>
                        {event.milestone && (
                          <span className="bg-gradient-primary text-white text-xs px-2 py-1 rounded-full">
                            Milestone
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 font-inter leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline connector */}
                  <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                    index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
                  }`}>
                    <div className={`w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                      event.milestone ? 'bg-gradient-primary' : 'bg-gray-400'
                    }`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
