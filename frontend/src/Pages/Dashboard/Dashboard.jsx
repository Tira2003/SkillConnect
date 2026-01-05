import { useAuth } from "../../AuthContext"
import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from "../../components/NavBar"
import PopularMembers from "../Home/components/PopularMembers"
import ActiveMembers from "../Home/components/ActiveMembers"
import SkillRequests from "../Home/components/SkillRequests"
import Footer from "../../components/Footer"

export default function Dashboard() {
    const { isAuthenticated, user } = useAuth();
    const [lastGpaCalculation, setLastGpaCalculation] = useState(null);
    const [currentGpa, setCurrentGpa] = useState(null);

    useEffect(() => {
        // Load GPA data from localStorage
        try {
            const storedGpa = localStorage.getItem('skillconnect_current_gpa');
            const lastCalcDate = localStorage.getItem('skillconnect_gpa_last_calculated');
            if (storedGpa) setCurrentGpa(storedGpa);
            if (lastCalcDate) setLastGpaCalculation(new Date(lastCalcDate));
        } catch (e) {
            console.error('Error loading GPA data:', e);
        }
    }, []);

    // Redirect to home if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const getDaysSinceCalculation = () => {
        if (!lastGpaCalculation) return null;
        const now = new Date();
        const diffTime = Math.abs(now - lastGpaCalculation);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysSince = getDaysSinceCalculation();
    const shouldRecalculate = !daysSince || daysSince > 180; // 6 months = ~180 days

    return (
        <div className="min-h-screen bg-linear-to-br from-[#F3E8FF] to-white w-full">
            <NavBar />
            
            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold bg-linear-to-r from-[#7D4DF4] to-[#A589FD] bg-clip-text text-transparent mb-3">
                        Welcome back, {user?.name || user?.firstName || 'Friend'}! 👋
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Here's what's happening in your SkillConnect community
                    </p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Column - Main Content (3 columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* GPA Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Your GPA</h2>
                                    <p className="text-sm text-gray-500">Track your academic progress</p>
                                </div>
                                <div className="text-4xl">📊</div>
                            </div>
                            
                            {currentGpa ? (
                                <div className="space-y-4">
                                    <div className="flex items-end gap-4">
                                        <div className="text-6xl font-bold text-[#7D4DF4]">{currentGpa}</div>
                                        <div className="text-2xl text-gray-400 mb-2">/ 4.0</div>
                                    </div>
                                    
                                    {daysSince !== null && (
                                        <div className={`p-4 rounded-xl ${shouldRecalculate ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
                                            <p className={`text-sm font-medium ${shouldRecalculate ? 'text-orange-700' : 'text-green-700'}`}>
                                                {shouldRecalculate ? (
                                                    <>
                                                        ⚠️ Last calculated {daysSince} days ago. 
                                                        <span className="font-bold"> Time to update!</span> 
                                                        <br />
                                                        <span className="text-xs">We recommend calculating your GPA every 6 months (180 days)</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        ✅ Updated {daysSince} days ago. You're all set!
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <button 
                                        onClick={() => {/* Open calculator */}}
                                        className="w-full py-3 bg-linear-to-r from-[#7D4DF4] to-[#A589FD] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        {shouldRecalculate ? 'Recalculate GPA' : 'Update GPA'}
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <p className="text-gray-600 mb-4">You haven't calculated your GPA yet</p>
                                    <button 
                                        onClick={() => {/* Open calculator */}}
                                        className="px-8 py-3 bg-linear-to-r from-[#7D4DF4] to-[#A589FD] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        Calculate Your GPA
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Popular Members & Skill Requests Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-3xl">⭐</div>
                                    <h2 className="text-xl font-bold text-gray-800">Popular Members</h2>
                                </div>
                                <PopularMembers />
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-3xl">🎯</div>
                                    <h2 className="text-xl font-bold text-gray-800">Skill Requests</h2>
                                </div>
                                <SkillRequests />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Active Members (1 column) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-3xl">🔥</div>
                                <h2 className="text-xl font-bold text-gray-800">Active Now</h2>
                            </div>
                            <ActiveMembers />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
