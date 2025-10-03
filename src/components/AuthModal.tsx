import React, { useRef, useState } from 'react';
import { X, Mail, Lock, User, MapPin, Home, Phone, Check, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

type AuthMode = 'login' | 'signup';
type SignupStep = 1 | 2;

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [signupStep, setSignupStep] = useState<SignupStep>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    addressNumber: '',
    password: '',
    confirmPassword: '',
    worksWithCars: false,
  });

  // CEP/Endereço (ViaCEP)
  const [cepError, setCepError] = useState<string | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);
  const [endereco, setEndereco] = useState<{
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
  } | null>(null);
  const lastRequestedCep = useRef<string | null>(null);

  // Password requirements
  const passwordRequirements = [
    { id: 'length', label: 'Mínimo de 8 caracteres', regex: /.{8,}/ },
    { id: 'number', label: 'Um número', regex: /[0-9]/ },
    { id: 'lowercase', label: 'Uma letra minúscula', regex: /[a-z]/ },
    { id: 'uppercase', label: 'Uma letra maiúscula', regex: /[A-Z]/ },
    { id: 'special', label: 'Um caractere especial', regex: /[^A-Za-z0-9]/ },
  ];

  const checkPasswordRequirements = (password: string) => {
    return passwordRequirements.map(req => ({
      ...req,
      valid: req.regex.test(password)
    }));
  };

  const [passwordChecks, setPasswordChecks] = useState(
    checkPasswordRequirements('')
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSignupForm(prev => ({ ...prev, password: value }));
    setPasswordChecks(checkPasswordRequirements(value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let inputValue: string | boolean = type === 'checkbox' ? checked : value;

    // Máscaras simples
    if (authMode === 'signup') {
      if (name === 'phone') {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        const part1 = digits.slice(0, 2);
        const part2 = digits.slice(2, 7);
        const part3 = digits.slice(7, 11);
        inputValue = part3 ? `(${part1}) ${part2}-${part3}` : part2 ? `(${part1}) ${part2}` : part1 ? `(${part1}` : '';
      } else if (name === 'addressNumber') {
        inputValue = value.replace(/\D/g, '').slice(0, 6);
      }
    }

    if (authMode === 'login') {
      setLoginForm(prev => ({ ...prev, [name]: inputValue }));
    } else {
      setSignupForm(prev => ({ ...prev, [name]: inputValue }));
    }
  };

  // CEP helpers (ViaCEP)
  const maskCep = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 8);
    const p1 = digits.slice(0, 5);
    const p2 = digits.slice(5);
    return p2 ? `${p1}-${p2}` : p1;
  };

  const fetchCep = async (digits: string) => {
    if (digits.length !== 8) {
      setCepError('Informe um CEP válido com 8 dígitos.');
      setEndereco(null);
      return;
    }
    if (lastRequestedCep.current === digits && endereco) return;
    try {
      setLoadingCep(true);
      setCepError(null);
      lastRequestedCep.current = digits;
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data?.erro) {
        setEndereco(null);
        setCepError('CEP não encontrado.');
        lastRequestedCep.current = null;
      } else {
        setEndereco({
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          localidade: data.localidade || '',
          uf: data.uf || '',
        });
      }
    } catch (e: unknown) {
      // opcional: log para diagnóstico em desenvolvimento
      console.error('[AuthModal][ViaCEP] erro ao buscar CEP', e);
      setEndereco(null);
      setCepError('Falha ao buscar CEP. Verifique sua conexão.');
      lastRequestedCep.current = null;
    } finally {
      setLoadingCep(false);
    }
  };

  const handleCepValue = (raw: string) => {
    const masked = maskCep(raw);
    setSignupForm(prev => ({ ...prev, cep: masked }));
    setCepError(null);
    const digits = masked.replace(/\D/g, '');
    if (digits.length === 8) fetchCep(digits);
  };

  const handleSignupStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupStep(2);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }
    try {
      setLoading(true);
      await authService.register({
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
      });
      onClose();
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao cadastrar.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      await authService.login({ email: loginForm.email, password: loginForm.password });
      onClose();
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha no login.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => (prev === 'login' ? 'signup' : 'login'));
    setSignupStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
      <div className="mx-auto my-8 bg-white rounded-2xl w-full max-w-md max-h-screen overflow-y-auto">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {authMode === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}
            </h2>
            <p className="text-gray-600 text-sm">
              {authMode === 'login'
                ? 'Acesse sua conta para continuar'
                : 'Preencha os dados para se cadastrar'}
            </p>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">{error}</div>
              )}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="text-center text-sm text-gray-600">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Cadastre-se
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={signupStep === 1 ? handleSignupStep1 : handleSignupSubmit} className="space-y-4">
              {error && signupStep === 2 && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">{error}</div>
              )}
              {signupStep === 1 ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={signupForm.name}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                        E-mail
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="signup-email"
                          name="email"
                          value={signupForm.email}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={signupForm.phone}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Continuar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* CEP */}
                      <div className="space-y-1">
                        <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                          CEP
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={signupForm.cep}
                            onChange={(e) => handleCepValue(e.currentTarget.value)}
                            onInput={(e) => handleCepValue(e.currentTarget.value)}
                            onBlur={(e) => handleCepValue(e.currentTarget.value)}
                            inputMode="numeric"
                            maxLength={9}
                            autoComplete="postal-code"
                            pattern="[0-9]{5}-?[0-9]{3}"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="00000-000"
                            required
                          />
                        </div>
                        {cepError && <p className="text-xs text-red-600 mt-1">{cepError}</p>}
                        {loadingCep && <p className="text-xs text-gray-500 mt-1">Buscando CEP...</p>}
                      </div>

                      {/* Número da residência */}
                      <div className="space-y-1">
                        <label htmlFor="addressNumber" className="block text-sm font-medium text-gray-700">
                          Nº residência
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Home className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="addressNumber"
                            name="addressNumber"
                            value={signupForm.addressNumber}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nº"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                        Senha
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="signup-password"
                          name="password"
                          value={signupForm.password}
                          onChange={handlePasswordChange}
                          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      <div className="mt-2 space-y-1">
                        {passwordChecks.map((req) => (
                          <div key={req.id} className="flex items-center text-sm">
                            {req.valid ? (
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
                            )}
                            <span className={req.valid ? 'text-green-600' : 'text-gray-500'}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirmar nova senha
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={signupForm.confirmPassword}
                          onChange={handleInputChange}
                          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Endereço preenchido pelo CEP */}
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Logradouro</label>
                        <input type="text" value={endereco?.logradouro || ''} readOnly className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Bairro</label>
                          <input type="text" value={endereco?.bairro || ''} readOnly className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cidade</label>
                          <input type="text" value={endereco?.localidade || ''} readOnly className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">UF</label>
                          <input type="text" value={endereco?.uf || ''} readOnly className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nº residência</label>
                          <input type="text" value={signupForm.addressNumber} readOnly className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg" />
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-2">
                      <p className="mb-2">
                        Ao se cadastrar, você concorda com nossa{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                          Política de Privacidade
                        </a>{' '}
                        e com os{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                          Termos de Uso
                        </a>.
                      </p>
                      <p>Seus dados serão utilizados para comunicação de acordo com a nossa Política de Privacidade.</p>
                    </div>

                    <div className="space-y-3 pt-2">

                      <div className="flex items-center">
                        <input
                          id="worksWithCars"
                          name="worksWithCars"
                          type="checkbox"
                          checked={signupForm.worksWithCars}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="worksWithCars" className="ml-2 block text-sm text-gray-700">
                          Trabalho com venda de veículos
                        </label>
                      </div>
                    </div>


                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setError(null); setLoading(false); setSignupStep(1); }}
                      className="w-full mb-3 bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      {loading ? 'Finalizando...' : 'Finalizar cadastro'}
                    </button>
                  </div>
                </>
              )}

              <div className="text-center text-sm text-gray-600">
                {signupStep === 1 ? 'Já tem uma conta? ' : 'Já tem uma conta? '}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {signupStep === 1 ? 'Faça login' : 'Faça login'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
