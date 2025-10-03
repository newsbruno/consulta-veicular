import { Routes, Route, Navigate } from 'react-router-dom';
import authService from './services/authService';

import DashboardLayout from './pages/dashboard/DashboardLayout';
import Catalogo from './pages/dashboard/Catalogo';
import Consultar from './pages/dashboard/Consultar';
import ResultadoConsulta from './pages/dashboard/ResultadoConsulta';
import ProfilePage from './pages/dashboard/ProfilePage';
import IndiqueGanhe from './pages/dashboard/IndiqueGanhe';
import Historico from './pages/dashboard/Historico';
import FaleConosco from './pages/dashboard/FaleConosco';
import Blog from './pages/dashboard/Blog';
import LandingPage from './pages/LandingPage';
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';
import BlogAdmin from './pages/blog/BlogAdmin';

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = authService.getCurrentUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Blog Routes (Public) */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="consultar" replace />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="consultar" element={<Consultar />} />
          <Route path="resultado" element={<ResultadoConsulta />} />
          <Route path="perfil/meus-dados" element={<ProfilePage />} />
          <Route path="indique" element={<IndiqueGanhe />} />
          <Route path="historico" element={<Historico />} />
          <Route path="contato" element={<FaleConosco />} />
          <Route path="blog-admin" element={<BlogAdmin />} />
          <Route path="blog-dashboard" element={<Blog />} />
        </Route>
      </Routes>
  );
}

export default App;