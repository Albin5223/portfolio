import './App.css'
import './header.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ProjectList from './pages/Projects'
import Contact from './pages/Contact'
import Formation from './pages/Formation'
import Experiences from './pages/Experiences'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        {/* spacer pour réserver la place du header dans le flux */}
        <div className="site-header-spacer" aria-hidden="true" />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/formation" element={<Formation />} />
            <Route path="/experiences" element={<Experiences />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
