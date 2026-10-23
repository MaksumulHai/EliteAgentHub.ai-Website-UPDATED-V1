import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

const slides = [
  {
    name: 'AI voice agents', image: 'voice-agent',
    alt: 'Illustrative brand character wearing a headset at her desk',
    title: 'A friendly first response—even when you’re busy.',
    description: 'Handle incoming inquiries, capture caller details, and support appointment booking with a connected, tested calendar.',
    status: 'Voice demonstration preparing · Booking requires calendar setup and testing',
    to: '/voice-demo', action: 'Explore voice assistance',
  },
  {
    name: 'Website chat', image: 'chat-agent',
    alt: 'Illustrative brand character typing beside a website chat conversation on screen',
    title: 'Help visitors take the next step.',
    description: 'Answer common questions, collect inquiries, and guide visitors to book an appointment.',
    status: 'Chat demonstration preparing · Booking requires calendar setup and testing',
    to: '/chat', action: 'Explore website chat',
  },
  {
    name: 'Websites & landing pages', image: 'website-building',
    alt: 'Illustrative website design workspace showing a service business page on desktop and phone',
    title: 'A clearer path from visitor to inquiry.',
    description: 'Practical, mobile-friendly pages built around your services and the action you want customers to take.',
    status: 'Discuss a scoped website or page project',
    to: '/landing-pages', action: 'Explore websites & pages',
  },
  {
    name: 'Website reviews', image: 'website-audit',
    alt: 'Illustrative website review workspace with a page layout and example charts, not client results',
    title: 'Find what’s getting in the way.',
    description: 'Review your content, navigation, and inquiry journey, with clear recommendations for improvement.',
    status: 'Review scope and source access agreed before work',
    to: '/contact?interest=website-review', action: 'Discuss a website review',
  },
] as const;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateMotion(); updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  const rotating = !paused && !hovered && !focused && !reducedMotion && documentVisible;
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [rotating]);

  const selectSlide = (index: number) => {
    setActive((index + slides.length) % slides.length);
    setPaused(true);
  };

  return <><h1 className="visually-hidden">Give every inquiry a clear next step.</h1>
  <section className="hero hero-carousel" aria-label="Explore our services" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="hero-window" id="hero-slides" aria-live={rotating ? 'off' : 'polite'}>
      <div className="hero-track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((slide, index) => <div className="hero-slide" key={slide.image} role="group" aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}: ${slide.name}`} aria-hidden={index !== active} inert={index !== active}>
          <img className="hero-scene" src={`/assets/hero/${slide.image}-1672.webp`}
            srcSet={`/assets/hero/${slide.image}-960.webp 960w, /assets/hero/${slide.image}-1672.webp 1672w`}
            sizes="100vw" width="1672" height="941" alt={slide.alt}
            fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async"/>
          <div className="wrap hero-slide-inner"><div className="hero-slide-copy">
            <p className="eyebrow">{slide.name}</p><h2>{slide.title}</h2>
            <p className="intro">{slide.description}</p><p className="hero-readiness">{slide.status}</p>
            <div className="actions"><Link className="button mint" to={slide.to}>{slide.action}</Link>
              <Link className="button outline" to="/contact">Discuss your business</Link></div>
          </div></div>
        </div>)}
      </div>
    </div>
    <div className="wrap hero-controls">
      <div className="hero-direction"><button type="button" aria-label="Previous slide" aria-controls="hero-slides" onClick={() => selectSlide(active - 1)}><ArrowIcon direction="left" chevron/></button>
        <button type="button" aria-label="Next slide" aria-controls="hero-slides" onClick={() => selectSlide(active + 1)}><ArrowIcon chevron/></button></div>
      <div className="hero-indicators" role="group" aria-label="Choose a service slide">{slides.map((slide, index) =>
        <button type="button" key={slide.image} aria-label={`Show slide ${index + 1}: ${slide.name}`} aria-current={index === active ? 'true' : undefined}
          aria-controls="hero-slides" onClick={() => selectSlide(index)}><span aria-hidden="true"/></button>)}</div>
      {reducedMotion ? <p className="hero-rotation-state">Automatic rotation off · reduced motion</p> :
        <button className="hero-pause" type="button" aria-controls="hero-slides" onClick={() => setPaused(current => !current)}>{paused ? 'Resume rotation' : 'Pause rotation'}</button>}
      <p className="hero-caption">Illustrative scenes · No live agent connection or client results shown.</p>
    </div>
  </section></>;
}
