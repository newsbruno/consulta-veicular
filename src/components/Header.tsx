import React, { useState } from 'react';
import { Car, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { name: string; href: string }[] = [
    { name: 'Recursos', href: '#recursos' },
    { name: 'Preços', href: '#precos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Blog', href: '/blog' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Se for link externo (começa com /), deixa o navegador lidar
    if (href.startsWith('/')) {
      setMobileMenuOpen(false);
      return;
    }
    
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : 'shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-3 rounded-xl shadow-lg">
              <Car className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Consulta Veicular</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Plataforma Profissional</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            <div className="ml-6">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                ENTRAR
              </button>
              <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
              />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 hover:text-slate-900 hover:bg-slate-50 p-3 rounded-lg transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-slate-700 hover:text-slate-900 hover:bg-slate-50 block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4">
              <button 
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                ENTRAR
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;