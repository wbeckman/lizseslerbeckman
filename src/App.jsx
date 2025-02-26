import "./App.css";
import HomeSection from "./sections/HomeSection";
import AboutSection from "./sections/AboutSection";
import UpcomingSection from "./sections/UpcomingSection";
import RecordingsSection from "./sections/RecordingsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import Header from "./Header";
import { useState } from "react";
const App = () => {
  const [activeTab, setActiveTab] = useState("Home");

  // Simple conditional or switch
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeSection />;
      case "About":
        return <AboutSection />;
      case "Upcoming":
        return <UpcomingSection />;
      // TODO - these
      // case "Recordings":
      //   return <RecordingsSection />;
      // case "Testimonials":
      //   return <TestimonialsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    // Remove min-h-screen if you don't need it
    <div className="bg-white text-black">
      <Header activeTab={activeTab} onNavClick={setActiveTab} />
      {/* Reduced to pt-16 */}
      <main className="pt-16 max-w-screen-xl mx-auto px-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
