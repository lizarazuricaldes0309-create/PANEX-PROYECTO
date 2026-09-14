import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Panes from './pages/Panes'
import Ubicacion from './pages/Ubicacion'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Reviews from './pages/Reviews'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound' 

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/panes" element={<Panes />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/resenas" element={<Reviews />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
