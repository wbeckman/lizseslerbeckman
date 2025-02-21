import './App.css';
import HomeSection from './HomeSection';
import Header from './Header';
import { useState } from 'react';
const App = () => {
    const [activeTab, setActiveTab] = useState('Home');
  
    // Simple conditional or switch
    const renderContent = () => {
      switch (activeTab) {
        case 'Home':
          return <HomeSection />;
        case 'About':
          return <AboutSection />;
        case 'Upcoming':
          return <UpcomingSection />;
        // etc. for other sections
        default:
          return <HomeSection />;
      }
    };
  
    return (
      <div className="bg-white text-black min-h-screen">
        <Header 
          activeTab={activeTab}
          onNavClick={setActiveTab}
        />
        <main className="pt-24 max-w-screen-xl mx-auto px-4">
          {renderContent()}
        </main>
      </div>
    );
  };
  
  export default App;