import { FaTimes } from 'react-icons/fa';
import { useModal } from '../ModalContext';

const featureDescriptions = {
  'Skill Search': {
    title: 'Find the Perfect Skill Match',
    description: 'Search through our community to find members with specific skills. Connect with experts, learn from peers, and build your network.',
    icon: '🔍'
  },
  'Skill Request': {
    title: 'Request Skills You Need',
    description: 'Looking for someone with a particular skill? Post a skill request and let our community members reach out to help you.',
    icon: '🎯'
  },
  'Community': {
    title: 'Join the Discussion',
    description: 'Engage with fellow members, share knowledge, ask questions, and participate in discussions about various topics and skills.',
    icon: '💬'
  }
};

export default function FeaturePromptDialog({ isOpen, onClose, featureName }) {
  const { openAuthModal } = useModal();
  
  if (!isOpen) return null;

  const feature = featureDescriptions[featureName] || {
    title: 'Unlock This Feature',
    description: 'Sign in to access all the amazing features SkillConnect has to offer.',
    icon: '✨'
  };

  const handleSignIn = () => {
    onClose();
    openAuthModal('signin');
  };

  const handleSignUp = () => {
    onClose();
    openAuthModal('signup');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4" 
      onClick={handleBackdropClick}
      style={{ margin: 0 }}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
          aria-label="Close dialog"
        >
          <FaTimes size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{feature.icon}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {feature.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSignIn}
            className="w-full px-6 py-3 rounded-xl text-white font-semibold bg-linear-to-r from-[#7D4DF4] to-[#A589FD] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="w-full px-6 py-3 rounded-xl text-[#7D4DF4] font-semibold border-2 border-[#7D4DF4] hover:bg-[#7D4DF4] hover:text-white transition-all duration-300"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Join SkillConnect to unlock all features
        </p>
      </div>
    </div>
  );
}
