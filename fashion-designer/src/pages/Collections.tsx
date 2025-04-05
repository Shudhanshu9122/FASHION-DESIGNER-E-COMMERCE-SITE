import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Collections = () => {
  const [activeTab, setActiveTab] = useState('seasonal');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const collections = {
    seasonal: [
      {
        id: 1,
        name: 'Spring 2024',
        description: 'Fresh and vibrant designs for the new season',
        items: [
          {
            id: 1,
            name: 'Floral Dress',
            image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmxvcmFsJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D',
            designer: 'Jane Doe',
            likes: 245,
            price: '$129.99',
            colors: ['#FF69B4', '#FFD700', '#87CEEB'],
          },
          {
            id: 2,
            name: 'Light Blazer',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhemVyfGVufDB8fDB8fHww',
            designer: 'John Smith',
            likes: 189,
            price: '$159.99',
            colors: ['#000000', '#808080', '#FFFFFF'],
          },
          {
            id: 3,
            name: 'Spring Jacket',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww',
            designer: 'Maria Garcia',
            likes: 312,
            price: '$199.99',
            colors: ['#4169E1', '#32CD32', '#FF4500'],
          },
          {
            id: 4,
            name: 'Pastel Cardigan',
            image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZGlnYW58ZW58MHx8MHx8fDA%3D',
            designer: 'Sophie Chen',
            likes: 178,
            price: '$89.99',
            colors: ['#FFB6C1', '#E6E6FA', '#98FB98'],
          },
          {
            id: 5,
            name: 'Denim Skirt',
            image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVuaW0lMjBza2lydHxlbnwwfHwwfHx8MA%3D%3D',
            designer: 'Lisa Park',
            likes: 231,
            price: '$79.99',
            colors: ['#191970', '#000080', '#4169E1'],
          },
        ],
      },
      {
        id: 2,
        name: 'Summer 2024',
        description: 'Light and breezy styles for sunny days',
        items: [
          {
            id: 6,
            name: 'Beach Wear',
            image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
            designer: 'Alex Wong',
            likes: 156,
            price: '$89.99',
            colors: ['#FF69B4', '#00FFFF', '#FFD700'],
          },
          {
            id: 7,
            name: 'Casual Shorts',
            image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcnRzfGVufDB8fDB8fHww',
            designer: 'Sarah Lee',
            likes: 287,
            price: '$49.99',
            colors: ['#000000', '#808080', '#FFFFFF'],
          },
          {
            id: 8,
            name: 'Sun Hat',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGF0fGVufDB8fDB8fHww',
            designer: 'Emma Wilson',
            likes: 198,
            price: '$39.99',
            colors: ['#F5DEB3', '#D2B48C', '#8B4513'],
          },
          {
            id: 9,
            name: 'Swimwear',
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dpbXdlYXJ8ZW58MHx8MHx8fDA%3D',
            designer: 'Mia Rodriguez',
            likes: 312,
            price: '$69.99',
            colors: ['#FF1493', '#00BFFF', '#FFD700'],
          },
        ],
      },
      {
        id: 3,
        name: 'Fall 2024',
        description: 'Cozy and stylish autumn essentials',
        items: [
          {
            id: 10,
            name: 'Knit Sweater',
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dlYXRlcnxlbnwwfHwwfHx8MA%3D%3D',
            designer: 'Oliver Brown',
            likes: 245,
            price: '$119.99',
            colors: ['#8B4513', '#A0522D', '#D2691E'],
          },
          {
            id: 11,
            name: 'Leather Boots',
            image: 'https://images.unsplash.com/photo-1543922586-d31c3c0c9e6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vdHN8ZW58MHx8MHx8fDA%3D',
            designer: 'James Wilson',
            likes: 189,
            price: '$199.99',
            colors: ['#000000', '#8B4513', '#A0522D'],
          },
          {
            id: 12,
            name: 'Plaid Scarf',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NhcmZ8ZW58MHx8MHx8fDA%3D',
            designer: 'Sophie Chen',
            likes: 156,
            price: '$49.99',
            colors: ['#8B0000', '#006400', '#000000'],
          },
        ],
      },
    ],
    trending: [
      {
        id: 1,
        name: 'Street Style',
        description: 'Urban fashion with an edge',
        items: [
          {
            id: 13,
            name: 'Urban Jacket',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww',
            designer: 'Mike Johnson',
            likes: 423,
            price: '$179.99',
            colors: ['#000000', '#FF0000', '#FFFFFF'],
          },
          {
            id: 14,
            name: 'Cargo Pants',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhemVyfGVufDB8fDB8fHww',
            designer: 'Sarah Lee',
            likes: 287,
            price: '$79.99',
            colors: ['#808080', '#8B4513', '#000000'],
          },
          {
            id: 15,
            name: 'Graphic Tee',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dC1zaGlydHxlbnwwfHwwfHx8MA%3D%3D',
            designer: 'Alex Wong',
            likes: 198,
            price: '$39.99',
            colors: ['#FFFFFF', '#000000', '#FF0000'],
          },
          {
            id: 16,
            name: 'Sneakers',
            image: 'https://images.unsplash.com/photo-1543922586-d31c3c0c9e6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D',
            designer: 'James Wilson',
            likes: 512,
            price: '$129.99',
            colors: ['#FFFFFF', '#000000', '#FF0000'],
          },
        ],
      },
      {
        id: 2,
        name: 'Minimalist',
        description: 'Clean and sophisticated designs',
        items: [
          {
            id: 17,
            name: 'Basic Tee',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dC1zaGlydHxlbnwwfHwwfHx8MA%3D%3D',
            designer: 'Tom Brown',
            likes: 198,
            price: '$29.99',
            colors: ['#FFFFFF', '#000000', '#808080'],
          },
          {
            id: 18,
            name: 'Slim Fit Pants',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFudHN8ZW58MHx8MHx8fDA%3D',
            designer: 'Emma Wilson',
            likes: 165,
            price: '$89.99',
            colors: ['#000000', '#808080', '#FFFFFF'],
          },
          {
            id: 19,
            name: 'Oversized Blazer',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhemVyfGVufDB8fDB8fHww',
            designer: 'Sophie Chen',
            likes: 231,
            price: '$159.99',
            colors: ['#000000', '#808080', '#FFFFFF'],
          },
        ],
      },
      {
        id: 3,
        name: 'Vintage',
        description: 'Timeless classics with a modern twist',
        items: [
          {
            id: 20,
            name: 'Retro Dress',
            image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3N8ZW58MHx8MHx8fDA%3D',
            designer: 'Lisa Park',
            likes: 287,
            price: '$149.99',
            colors: ['#FF69B4', '#FFD700', '#87CEEB'],
          },
          {
            id: 21,
            name: 'Denim Jacket',
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww',
            designer: 'Mike Johnson',
            likes: 345,
            price: '$129.99',
            colors: ['#000080', '#4169E1', '#87CEEB'],
          },
          {
            id: 22,
            name: 'High-Waisted Jeans',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D',
            designer: 'Sarah Lee',
            likes: 198,
            price: '$79.99',
            colors: ['#000080', '#4169E1', '#87CEEB'],
          },
        ],
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tabs with Animation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['seasonal', 'trending'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab} Collections
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Collections Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-12"
        >
          {collections[activeTab as keyof typeof collections].map((collection) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{collection.name}</h2>
                <p className="text-gray-600 mt-2">{collection.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {collection.items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group"
                    whileHover={{ y: -5 }}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"
                        initial={false}
                        animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-xl text-gray-900">{item.name}</h3>
                        <span className="text-lg font-bold text-indigo-600">{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">by {item.designer}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {item.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full hover:bg-gray-100"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.button>
                          <span className="ml-1">{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Collections; 