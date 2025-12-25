import './App.css'
import './header.css'
import Header from './components/Header'
import Home from './pages/Home'
import ProjectList from './pages/Projects'
import Contact from './pages/Contact'
import Formation from './pages/Formation'
import Experiences from './pages/Experiences'

function App() {
  return (
    <div>
      <Header />
      <div className="site-header-spacer" aria-hidden="true" />

      <main className="app-main">
        <section id="home"><Home /></section>
        <section id="projects"><ProjectList /></section>
        <section id="experiences"><Experiences /></section>
        <section id="formation"><Formation /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
}

export default App;
