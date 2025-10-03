import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Car,
  Search,
  BookOpen,
  User,
  ChevronDown,
  History,
  Award,
  MessageSquare,
  LogOut,
  X
} from 'lucide-react';
import authService from '../../services/authService';

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: Search, name: 'Consultar', path: '/dashboard/consultar' },
    { icon: BookOpen, name: 'Catálogo Olho no Carro', path: '/dashboard/catalogo' },
    { icon: History, name: 'Histórico de Consultas', path: '/dashboard/historico' },
    { icon: Award, name: 'Indique e Ganhe', path: '/dashboard/indique' },
    { icon: MessageSquare, name: 'Fale Conosco', path: '/dashboard/contato' },
    { icon: BookOpen, name: 'Gerenciar Blog', path: '/dashboard/blog-admin' },
  ];

  const SidebarContent = (
    <div className="h-full w-full bg-white border-r border-gray-200 flex flex-col p-4 space-y-4">
      {/* Logo e Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 p-2 rounded-full">
            <Car className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-800">OLHO NO CARRO</span>
        </div>
        <div className="flex items-center space-x-3">

          {/* Botão fechar no mobile */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-800"
            aria-label="Fechar menu"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Saldo */}
      <div className="bg-gray-50 p-4 rounded-lg text-center space-y-2">
        <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">SEU SALDO ATUAL</span>
        <p className="text-3xl font-bold text-gray-800">R$ 0,00</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          COMPRAR CONSULTAS
        </button>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 space-y-1">
        {navItems.slice(0, 2).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Menu Perfil Dropdown */}
        <div>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <User size={20} />
              <span>Perfil</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>
          {isProfileOpen && (
            <div className="mt-1 pl-8 space-y-1">
              <NavLink
                to="/dashboard/perfil/meus-dados"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                Meus Dados
              </NavLink>
      
            </div>
          )}
        </div>

        {navItems.slice(2).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Navegação Inferior */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => {
            authService.logout();
            navigate('/');
          }}
          className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
        <div className="text-center text-xs text-gray-400 space-y-1 pt-2">
          <a href="#" className="hover:underline">Política de Cookies</a>
          <a href="#" className="hover:underline block">Política de Privacidade</a>
          <a href="#" className="hover:underline block">Termos e Condições de Uso</a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Drawer mobile */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
      >
        {SidebarContent}
      </div>
      {/* Backdrop mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:shrink-0">
        {SidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
