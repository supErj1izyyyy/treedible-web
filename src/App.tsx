import React from 'react';
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
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
  );
};

export default App;
