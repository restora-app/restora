import BackgroundOrbs from './components/BackgroundOrbs/BackgroundOrbs';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import InfoCard from './components/InfoCard/InfoCard';
import SurveySection from './components/SurveySection/SurveySection';
import Footer from './components/Footer/Footer';
import questions from './data/questions';

/**
 * Clarity Study — Cognitive Fatigue Research Landing Page
 */
export default function App() {
  return (
    <div className="bg-background text-on-surface font-sans overflow-x-hidden">
      <BackgroundOrbs />
      <Navbar />

      <main className="relative pt-xl">
        <Hero />

        <InfoCard
          title='The "Fog" is Real'
          description='Early research suggests mental overload from digital saturation is reshaping how we process focus. We are investigating how modern screen time correlates with what participants describe as "mental friction."'
        />

        <SurveySection questions={questions} />
      </main>

      <Footer />
    </div>
  );
}
