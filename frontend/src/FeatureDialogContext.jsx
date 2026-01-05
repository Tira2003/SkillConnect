import { createContext, useContext, useState } from 'react';

const FeatureDialogContext = createContext();

export function FeatureDialogProvider({ children }) {
  const [featureDialog, setFeatureDialog] = useState({ isOpen: false, feature: null });

  const openFeatureDialog = (featureName) => {
    setFeatureDialog({ isOpen: true, feature: featureName });
  };

  const closeFeatureDialog = () => {
    setFeatureDialog({ isOpen: false, feature: null });
  };

  return (
    <FeatureDialogContext.Provider value={{ featureDialog, openFeatureDialog, closeFeatureDialog }}>
      {children}
    </FeatureDialogContext.Provider>
  );
}

export function useFeatureDialog() {
  const context = useContext(FeatureDialogContext);
  if (!context) {
    throw new Error('useFeatureDialog must be used within FeatureDialogProvider');
  }
  return context;
}
