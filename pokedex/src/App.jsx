import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { FavoritesProvider } from './context/FavoritesContext'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Detail from './pages/Detail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/explorar"    element={<Explore />} />
              <Route path="/detalle/:id" element={<Detail />} />
              <Route path="/favoritos"   element={<Favorites />} />
              <Route path="/contacto"    element={<Contact />} />
              <Route path="*"            element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#16213e',
              color: '#fff',
              border: '1px solid #2a2a4a',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#e94560', secondary: '#16213e' } },
            error:   { iconTheme: { primary: '#f87171', secondary: '#16213e' } },
          }}
        />
      </BrowserRouter>
    </FavoritesProvider>
  )
}
