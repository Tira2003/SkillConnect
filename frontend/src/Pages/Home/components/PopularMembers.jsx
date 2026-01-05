import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

export default function PopularMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchPopularMembers();
  }, []);

  const fetchPopularMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/popular?limit=4');
      const data = await response.json();
      if (data.success) {
        setMembers(data.users);
      }
    } catch (error) {
      console.error('Error fetching popular members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndorse = async (userId, e) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to endorse members');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/endorse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ endorserId: user.id || user.userId })
      });

      const data = await response.json();
      if (data.success) {
        // Update the local state
        setMembers(members.map(m => 
          m._id === userId 
            ? { ...m, endorsements: data.endorsements }
            : m
        ));
      }
    } catch (error) {
      console.error('Error endorsing user:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <p className="text-gray-500 text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigate('/skill-search')}
          className="text-sm px-3 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition ml-auto"
        >
          View All →
        </button>
      </div>

      {members.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No members found</p>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <div
              key={m._id}
              className="flex items-center gap-3 p-3 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50/30 transition cursor-pointer"
              onClick={() => navigate(`/profile/${m._id}`)}
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#6C38FF] via-[#4C2AFF] to-[#EC38F5] text-white flex items-center justify-center text-xs font-bold shadow">
                {m.firstName?.[0]}{m.lastName?.[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 truncate">
                    {m.firstName} {m.lastName}
                  </p>
                  {m.gpa && (
                    <span className="text-xs px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                      {m.gpa}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 truncate">
                  {m.skills?.slice(0, 2).map(s => s.title).join(', ') || 'No skills listed'}
                </p>

                <div className="flex items-center text-xs text-gray-500 mt-1">
                  👥 {m.endorsements || 0}
                </div>
              </div>

              <button 
                onClick={(e) => handleEndorse(m._id, e)}
                className="px-3 py-1.5 text-sm rounded-lg bg-linear-to-r from-[#7D4DF4] to-[#A589FD] text-white shadow hover:opacity-90 transition whitespace-nowrap"
              >
                Endorse
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
