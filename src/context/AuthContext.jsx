import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/mockData';

// Criando o contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  // Estado para armazenar o usuário atual
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar se há um usuário salvo no localStorage ao carregar
  useEffect(() => {
    const savedUser = localStorage.getItem('educamais_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Função de login
  const login = (email, password) => {
    // Simulando verificação de credenciais
    const user = users.find(u => u.email === email);
    
    if (user) {
      // Em um sistema real, verificaríamos a senha com hash
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('educamais_user', JSON.stringify(user));
      return { success: true, user };
    }
    
    return { success: false, message: 'Credenciais inválidas' };
  };

  // Função de logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('educamais_user');
  };

  // Função de registro
  const register = (userData) => {
    // Simulando registro de usuário
    // Em um sistema real, enviaríamos para o backend
    const newUser = {
      id: `USER${Date.now()}`,
      ...userData
    };
    
    // Simulando sucesso
    return { success: true, user: newUser };
  };

  // Função de recuperação de senha
  const recoverPassword = (email) => {
    // Simulando envio de email de recuperação
    const user = users.find(u => u.email === email);
    
    if (user) {
      return { success: true, message: 'Email de recuperação enviado' };
    }
    
    return { success: false, message: 'Email não encontrado' };
  };

  // Valor do contexto
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    recoverPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;