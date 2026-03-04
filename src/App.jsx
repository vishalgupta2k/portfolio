import { useState } from 'react';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import Achievements from './components/Achievements';
import Recommendations from './components/Recommendations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import NoiseOverlay from './components/NoiseOverlay';
import SmoothScroll from './components/SmoothScroll';
import BackToTop from './components/BackToTop';
import CommandPalette from './components/CommandPalette';
import KonamiEgg from './components/KonamiEgg';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <SmoothScroll>
          <div className={`app ${!isDark ? 'light-mode' : ''}`}>
            <CustomCursor />
            <ScrollProgress />
            <NoiseOverlay />
            <Scene />
            <Navbar isDark={isDark} toggleTheme={toggleTheme} />
            <main className="container">
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Achievements />
              <Recommendations />
              <Projects />
              <GitHubStats />
              <Contact />
            </main>
            <Footer />
            <BackToTop />
            <CommandPalette />
            <KonamiEgg />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
