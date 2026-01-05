import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { useModal } from '../../../ModalContext';

export default function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useModal();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!isAuthenticated) {
      openAuthModal('signin');
      return;
    }
    if (searchQuery.trim()) {
      navigate(`/skill-search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/skill-search');
    }
  };

  const handleGetStarted = () => {
    openAuthModal('signup');
  };

  return (
    <div className="w-full pt-24">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#7D4DF4] to-[#A589FD] text-white py-20">
        <div className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 min-h-[400px]">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-4xl mx-auto">
            Find Skilled Students Inside Your University
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Connect with designers, developers, tutors, editors, and mentors. Collaborate on projects and grow together.
          </p>

          {/* Call-to-action for logged-out users */}
          {!isAuthenticated && (
            <div className="mt-10">
              <button
                onClick={handleGetStarted}
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started Free
              </button>
              <p className="mt-4 text-sm opacity-80">
                Join hundreds of students collaborating on SkillConnect
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
