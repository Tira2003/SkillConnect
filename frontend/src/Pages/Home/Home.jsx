import NavBar from "../../components/NavBar"
import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import GPACalculator from "../../components/GPACalculator"
import Footer from "../../components/Footer"

export default function Home(){
    return(
        <div className="min-h-screen bg-linear-to-br from-[#F3E8FF] to-white w-full">
            <NavBar />

            {/* Hero takes full width */}
            <Hero />
            
            {/* Content sections with constrained width */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About Section */}
                <AboutSection />
                
                {/* GPA Calculator - available to all users */}
                <div className="my-12">
                    <GPACalculator />
                </div>
            </div>
                <Footer />
        </div>
    )
}
