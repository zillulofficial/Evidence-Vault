import React, { useState } from 'react';
import EvidenceVault from './components/screens/EvidenceVault';
import EvidenceDetail from './components/screens/EvidenceDetail';
import BuyerRequests from './components/screens/BuyerRequests';

function App() {
  const [currentScreen, setCurrentScreen] = useState('vault');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(null);

  const handleViewDetail = (evidenceId) => {
    setSelectedEvidenceId(evidenceId);
    setCurrentScreen('detail');
  };

  const handleBackToVault = () => {
    setCurrentScreen('vault');
    setSelectedEvidenceId(null);
  };

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    setSelectedEvidenceId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => navigateTo('vault')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentScreen === 'vault'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Evidence Vault
              </button>
              <button
                onClick={() => navigateTo('requests')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentScreen === 'requests'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Buyer Requests
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {currentScreen === 'vault' && (
          <EvidenceVault onViewDetail={handleViewDetail} />
        )}
        
        {currentScreen === 'detail' && (
          <EvidenceDetail 
            evidenceId={selectedEvidenceId} 
            onBack={handleBackToVault}
          />
        )}
        
        {currentScreen === 'requests' && (
          <BuyerRequests />
        )}
      </main>
    </div>
  );
}

export default App;