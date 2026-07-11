import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackgroundOrbs from './components/BackgroundOrbs/BackgroundOrbs';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ResultPage from './pages/ResultPage';

/**
 * Restora — Cognitive Fatigue Research Landing Page
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-background text-on-surface font-sans overflow-x-hidden">
        <BackgroundOrbs />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
