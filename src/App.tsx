import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CalculatorSection } from './components/Calculator/CalculatorSection';
import { MaterialComparison } from './components/MaterialComparison';
import { ServicesSection } from './components/ServicesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <CalculatorSection />
          <MaterialComparison />
          <ServicesSection />
          <WorkflowSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
