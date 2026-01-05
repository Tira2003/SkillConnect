import React, { useState } from 'react';
import { FaCalculator, FaTimes } from 'react-icons/fa';
import GPACalculator from './GPACalculator';
import { useAuth } from '../AuthContext';

export default function FloatingCalculatorButton() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <button
        aria-label="Open GPA Calculator"
        title="GPA Calculator"
        onClick={() => setOpen(true)}
        className={`fixed right-6 bottom-24 z-50 flex items-center justify-center
           w-14 h-14 rounded-full shadow-lg
           bg-gradient-to-br from-[#7D4DF4] to-[#A589FD]
           text-white text-xl
           hover:scale-105 transform transition-all duration-150
           focus:outline-none focus:ring-4 focus:ring-[#7D4DF4]/30`}
      >
        <FaCalculator aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
              aria-label="Close calculator"
            >
              <FaTimes size={20} />
            </button>
            <div className="p-6">
              <GPACalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
