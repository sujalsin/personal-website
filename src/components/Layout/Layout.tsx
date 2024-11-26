import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from "../Background/AnimatedBackground";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground variant="gradient" />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
