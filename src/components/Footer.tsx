import React from 'react';
import { Car, Mail, Phone, MapPin, Shield, Clock, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
                <Car className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Consulta Veicular</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Plataforma Profissional</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              A plataforma mais confiável e completa para consulta de informações veiculares no Brasil. 
              Dados precisos e atualizados para sua total segurança.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-slate-300">100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-300">24/7</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Nossos Serviços</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>Consulta Completa</span>
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>Histórico do Veículo</span>
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>Verificação de Débitos</span>
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>Análise de Sinistros</span>
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span>Cotação de Seguro</span>
              </a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Suporte e Ajuda</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Central de Ajuda</span>
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Como Funciona</span>
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Perguntas Frequentes</span>
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Termos de Uso</span>
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Política de Privacidade</span>
              </a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Fale Conosco</h3>
            <div className="space-y-4 text-slate-400">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-white font-medium">contato@consultaveicular.com.br</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Telefone</p>
                  <p className="text-white font-medium">(11) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Localização</p>
                  <p className="text-white font-medium">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-5 w-5 text-emerald-400" />
                <span className="font-semibold">Atendimento</span>
              </div>
              <p className="text-sm text-slate-400">Segunda a Sexta: 8h às 18h</p>
              <p className="text-sm text-slate-400">Sábado: 8h às 14h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-slate-400">
                © 2024 Consulta Veicular. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-slate-400">SSL Certificado</span>
              </div>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                Política de Privacidade
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                Termos de Uso
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;