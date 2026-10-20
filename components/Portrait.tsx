import { useEffect, useRef, useState } from 'react';
export default function Portrait() {
  const scene = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(!document.hidden);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const mobile = matchMedia('(max-width: 700px)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    const update = () => setEligible(!mobile.matches && !reduced.matches && !connection?.saveData);
    const visibility = () => setDocumentVisible(!document.hidden);
    update(); mobile.addEventListener('change', update); reduced.addEventListener('change', update);
    connection?.addEventListener('change', update); document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: 0.05 });
    if (scene.current) observer.observe(scene.current);
    return () => { observer.disconnect(); mobile.removeEventListener('change', update); reduced.removeEventListener('change', update); connection?.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const running = eligible && visible && documentVisible && !paused && !failed;
  return <figure className="hero-art"><div className="art"><div ref={scene} className={`portrait-scene ${running ? 'motion-running' : ''}`} id="portrait-scene" data-atmosphere={running ? 'running' : 'static'}>
    <div className="fog" aria-hidden="true"><span className="fog-layer fog-one"/><span className="fog-layer fog-two"/></div>
    {!failed ? <img src="/assets/character/cutout-v7-768.webp" srcSet="/assets/character/cutout-v7-512.webp 512w, /assets/character/cutout-v7-768.webp 768w" sizes="(max-width: 700px) 90vw, 480px" width="768" height="1152" alt="Fictional blonde brand character with a human face, green eyes and a pearl-white metallic collar and white professional suit" fetchPriority="high" onError={() => setFailed(true)}/> : <p className="image-fallback">Portrait unavailable. The services and contact options remain available.</p>}
  </div><figcaption><p>From first question to a clear next step.</p><div className="workflow"><span>01 Answer</span><span>02 Capture</span><span>03 Follow through</span></div></figcaption></div>
  <div className="motion-controls">{eligible && !failed ? <button type="button" aria-controls="portrait-scene" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume ambient motion' : 'Pause ambient motion'}</button> : <span>Static atmosphere</span>}</div>
  <p className="art-disclosure">Fictional brand character · Still portrait with faint background mist. No live agent connection.</p></figure>;
}
