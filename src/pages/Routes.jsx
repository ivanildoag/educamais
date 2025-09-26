import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componentes de autenticação
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

// Componentes de layout
import Layout from '../components/shared/Layout';

// Componentes do professor
import TeacherDashboard from '../components/teacher/TeacherDashboard';
import CourseManagement from '../components/teacher/CourseManagement';
import ActivityCreation from '../components/teacher/ActivityCreation';

// Componentes do aluno
import StudentDashboard from '../components/student/StudentDashboard';
import CourseView from '../components/student/CourseView';

// Componentes compartilhados
import DigitalLibrary from '../components/shared/DigitalLibrary';
import Profile from '../components/shared/Profile';

// Componente de rota protegida
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rota padrão - redireciona para login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Rotas protegidas - Professor */}
      <Route path="/teacher" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<TeacherDashboard />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="activities/create" element={<ActivityCreation />} />
        <Route path="library" element={<DigitalLibrary />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Rotas protegidas - Aluno */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
        <Route path="courses/:courseId" element={<CourseView />} />
        <Route path="library" element={<DigitalLibrary />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Rota para qualquer outro caminho não definido */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;