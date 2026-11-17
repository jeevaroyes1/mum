import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import AboutStats from '../components/AboutStats';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <AboutStats />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}