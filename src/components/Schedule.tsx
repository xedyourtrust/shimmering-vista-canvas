
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CalendarPlus } from 'lucide-react';

const Schedule = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'cards'>('cards');

  const events = [
    {
      id: 1,
      title: 'Product Launch Event',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Conference Center',
      attendees: 250,
      category: 'launch',
      description: 'Join us for the unveiling of our latest innovation',
      isUpcoming: true
    },
    {
      id: 2,
      title: 'Creative Workshop',
      date: '2024-02-20',
      time: '2:00 PM',
      location: 'Design Studio',
      attendees: 50,
      category: 'workshop',
      description: 'Hands-on creative session with industry experts',
      isUpcoming: true
    },
    {
      id: 3,
      title: 'Networking Mixer',
      date: '2024-02-25',
      time: '6:00 PM',
      location: 'Rooftop Venue',
      attendees: 150,
      category: 'networking',
      description: 'Connect with professionals in your field',
      isUpcoming: true
    },
    {
      id: 4,
      title: 'Annual Conference',
      date: '2024-01-10',
      time: '9:00 AM',
      location: 'Convention Center',
      attendees: 500,
      category: 'conference',
      description: 'Our biggest event of the year',
      isUpcoming: false
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      launch: 'bg-gradient-to-r from-lavender to-blush',
      workshop: 'bg-gradient-to-r from-blush to-sky',
      networking: 'bg-gradient-to-r from-sky to-lavender',
      conference: 'bg-gradient-to-r from-lavender via-blush to-sky'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const getTimeUntilEvent = (dateStr: string, timeStr: string) => {
    const eventDate = new Date(`${dateStr}T${timeStr.replace(' AM', ':00').replace(' PM', ':00')}`);
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    
    if (diff < 0) return 'Past event';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    return 'Starting soon';
  };

  return (
    <section id="schedule" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-quicksand font-bold text-text-primary mb-4">
            Event Schedule
          </h2>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
            Don't miss out on our upcoming events and experiences
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-6 py-2 rounded-full font-poppins font-medium transition-all duration-300 ${
                viewMode === 'cards' 
                  ? 'bg-gradient-primary text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-6 py-2 rounded-full font-poppins font-medium transition-all duration-300 ${
                viewMode === 'calendar' 
                  ? 'bg-gradient-primary text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>

        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover-scale transition-all duration-300 hover:shadow-xl ${
                  event.isUpcoming ? 'ring-2 ring-blush/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 ${getCategoryColor(event.category)}`}></div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-quicksand font-semibold text-text-primary">
                      {event.title}
                    </h3>
                    {event.isUpcoming && (
                      <span className="bg-gradient-primary text-white text-xs px-2 py-1 rounded-full">
                        {getTimeUntilEvent(event.date, event.time)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 font-inter">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blush" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blush" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blush" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blush" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  
                  {event.isUpcoming && (
                    <button className="mt-4 w-full bg-gradient-primary text-white py-2 px-4 rounded-lg font-poppins font-medium hover:opacity-90 transition-opacity duration-300 flex items-center justify-center space-x-2">
                      <CalendarPlus className="h-4 w-4" />
                      <span>Add to Calendar</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <h3 className="text-2xl font-quicksand font-semibold text-text-primary mb-4">
                February 2024
              </h3>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Adjust for month start
                  const isCurrentMonth = day > 0 && day <= 29;
                  const hasEvent = [15, 20, 25].includes(day);
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-sm relative ${
                        isCurrentMonth ? 'text-gray-900' : 'text-gray-300'
                      } ${hasEvent ? 'bg-gradient-primary text-white rounded-lg' : ''}`}
                    >
                      {isCurrentMonth ? day : ''}
                      {hasEvent && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Schedule;
