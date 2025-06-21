
import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample gallery data
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop',
      alt: 'Creative workspace',
      category: 'workspace',
      title: 'Modern Workspace',
      date: '2024-01-15'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      alt: 'Technology setup',
      category: 'tech',
      title: 'Tech Innovation',
      date: '2024-01-10'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop',
      alt: 'Professional meeting',
      category: 'business',
      title: 'Team Collaboration',
      date: '2024-01-08'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
      alt: 'Natural landscape',
      category: 'nature',
      title: 'Peaceful Waters',
      date: '2024-01-05'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=600&fit=crop',
      alt: 'Mountain vista',
      category: 'nature',
      title: 'Mountain Views',
      date: '2024-01-03'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop',
      alt: 'Modern architecture',
      category: 'architecture',
      title: 'Clean Design',
      date: '2024-01-01'
    }
  ];

  const categories = ['all', 'workspace', 'tech', 'business', 'nature', 'architecture'];

  const filteredImages = images.filter(image => {
    const matchesCategory = filter === 'all' || image.category === filter;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const imageElements = document.querySelectorAll('.gallery-item');
    imageElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredImages]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-quicksand font-bold text-text-primary mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
            Explore our collection of memorable moments and creative works
          </p>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blush/50 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="text-gray-400 h-5 w-5" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item break-inside-avoid opacity-0 cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden rounded-lg hover-scale">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-quicksand font-semibold text-lg">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                aria-label="Close image preview"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={selectedImage}
                alt="Gallery preview"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
