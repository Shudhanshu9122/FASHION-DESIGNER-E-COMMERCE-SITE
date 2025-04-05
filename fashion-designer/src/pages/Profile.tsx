import { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('designs');

  const userProfile = {
    name: 'Sarah Johnson',
    username: '@sarahj_designs',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Fashion designer specializing in sustainable and modern clothing.',
    location: 'New York, NY',
    followers: 1234,
    following: 567,
  };

  const userDesigns = [
    {
      id: 1,
      name: 'Summer Dress Collection',
      image: 'https://via.placeholder.com/300x400',
      likes: 156,
      comments: 23,
      date: '2024-03-15',
    },
    {
      id: 2,
      name: 'Urban Streetwear Line',
      image: 'https://via.placeholder.com/300x400',
      likes: 89,
      comments: 12,
      date: '2024-03-10',
    },
    {
      id: 3,
      name: 'Formal Wear Collection',
      image: 'https://via.placeholder.com/300x400',
      likes: 245,
      comments: 34,
      date: '2024-03-05',
    },
  ];

  const savedDesigns = [
    {
      id: 4,
      name: 'Minimalist Wardrobe',
      designer: 'Alex Wong',
      image: 'https://via.placeholder.com/300x400',
      likes: 324,
      comments: 45,
    },
    {
      id: 5,
      name: 'Bohemian Collection',
      designer: 'Emma Davis',
      image: 'https://via.placeholder.com/300x400',
      likes: 198,
      comments: 27,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="text-gray-600">{userProfile.username}</p>
            <p className="text-gray-800 mt-2">{userProfile.bio}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span>{userProfile.location}</span>
              <span>{userProfile.followers} followers</span>
              <span>{userProfile.following} following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('designs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'designs'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Designs
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'saved'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Saved Designs
          </button>
        </nav>
      </div>

      {/* Designs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'designs'
          ? userDesigns.map((design) => (
              <div
                key={design.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{design.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{design.date}</span>
                    <div className="flex space-x-4">
                      <span>{design.likes} likes</span>
                      <span>{design.comments} comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : savedDesigns.map((design) => (
              <div
                key={design.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{design.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    by {design.designer}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{design.likes} likes</span>
                    <span>{design.comments} comments</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Profile; 