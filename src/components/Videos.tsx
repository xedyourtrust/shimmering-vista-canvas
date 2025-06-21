
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const Videos = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const videos = [
    {
      id: 1,
      title: 'Company Overview',
      description: 'Learn about our mission, vision, and the incredible team behind our success',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      duration: '3:45',
      category: 'About'
    },
    {
      id: 2,
      title: 'Product Showcase',
      description: 'Discover the features and capabilities of our latest innovations',
      thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop',
      duration: '5:20',
      category: 'Product'
    },
    {
      id: 3,
      title: 'Behind the Scenes',
      description: 'Get an inside look at our creative process and daily operations',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      duration: '2:30',
      category: 'Culture'
    },
    {
      id: 4,
      title: 'Customer Stories',
      description: 'Hear from our satisfied customers about their experiences',
      thumbnail: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
      duration: '4:15',
      category: 'Testimonials'
    }
  ];

  const handleVideoPlay = (videoId: number) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-quicksand font-bold text-text-primary mb-4">
            Video Gallery
          </h2>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
            Watch our story unfold through these carefully curated video experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover-scale transition-all duration-300 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleVideoPlay(video.id)}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all duration-300 hover-scale"
                    aria-label={`Play ${video.title}`}
                  >
                    <Play className="h-8 w-8 text-white ml-1" />
                  </button>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                  {video.duration}
                </div>

                {/* Category */}
                <div className="absolute top-4 left-4 bg-gradient-primary text-white text-sm px-3 py-1 rounded-full">
                  {video.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-quicksand font-semibold text-text-primary mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {video.description}
                </p>

                {/* Video Controls (when active) */}
                {activeVideo === video.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setActiveVideo(null)}
                          className="flex items-center space-x-2 bg-gradient-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Pause className="h-4 w-4" />
                          <span>Pause</span>
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                          <Volume2 className="h-5 w-5" />
                        </button>
                      </div>
                      <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                        <Maximize className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-primary h-2 rounded-full w-1/3 transition-all duration-300"></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>1:15</span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Playlist Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-lavender/10 to-sky/10 rounded-xl p-8">
            <h3 className="text-2xl font-quicksand font-semibold text-text-primary mb-4">
              Complete Video Playlist
            </h3>
            <p className="text-gray-600 font-inter mb-6 max-w-2xl mx-auto">
              Enjoy our complete collection in sequence for the full story experience
            </p>
            <button className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-poppins font-medium hover:opacity-90 transition-opacity hover-scale flex items-center space-x-2 mx-auto">
              <Play className="h-5 w-5" />
              <span>Play All Videos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
