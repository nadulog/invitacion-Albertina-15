"use client";

import { useEffect, useRef, useState } from "react";

const EVENT = new Date("2026-10-17T21:00:00-03:00").getTime();
type ModalName = "location" | "song" | "gift" | "rsvp" | null;

function DiscoBall({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`disco-ball ${className}`} />;
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [modal, setModal] = useState<ModalName>(null);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const countdownRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const tick = () => {
      const left = Math.max(0, EVENT - Date.now());
      setTime({ days: Math.floor(left / 86400000), hours: Math.floor(left / 3600000) % 24, minutes: Math.floor(left / 60000) % 60, seconds: Math.floor(left / 1000) % 60 });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [entered]);

  useEffect(() => {
    const panel = countdownRef.current;
    if (!panel) return;
    if (!("IntersectionObserver" in window)) { panel.classList.add("is-visible"); return; }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      panel.classList.add("is-visible");
      observer.disconnect();
    }, { threshold: .32 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  const enter = (music: boolean) => {
    setEntered(true);
    if (music && audioRef.current) audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    else { audio.pause(); setMusicPlaying(false); }
  };

  const calendar = () => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Albertina — Mis XV",
      dates: "20261018T000000Z/20261018T070000Z",
      details: "Una noche soñada. Te espero para celebrar mis XV.",
      location: "Parque Belgrano, Pergamino, Buenos Aires"
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  return <main>
    <audio ref={audioRef} src="/twice.mp3" loop preload="auto" />
    <div className={`splash splash-reference ${entered ? "splash--gone" : ""}`} aria-hidden={entered}>
      <img src="/intro-albertina.png" alt="Albertina, Mis XV. Estás por entrar a mi noche." />
      <div className="splash-hotspots">
        <button onClick={() => enter(true)} aria-label="Entrar con música">ENTRAR CON MÚSICA ♫</button>
        <button onClick={() => enter(false)} aria-label="Entrar sin música">ENTRAR SIN MÚSICA</button>
      </div>
    </div>
    {entered && <button className={`music-toggle ${musicPlaying ? "is-playing" : ""}`} onClick={toggleMusic} aria-label={musicPlaying ? "Pausar música" : "Reproducir música"} aria-pressed={musicPlaying}><span aria-hidden="true">♫</span></button>}

    <section className="hero welcome-cover">
      <div className="welcome-cover__copy">
        <p className="welcome-cover__kicker">UNA NOCHE PARA RECORDAR</p>
        <h2><span>Quiero compartir</span><strong>mis <em>XV</em> con las<br />personas que<br />quiero.</strong></h2>
        <p className="welcome-cover__body">Hay momentos que se sueñan durante mucho tiempo y se guardan para siempre. Me encantaría vivir esta noche rodeada de abrazos, risas, música y todos los recuerdos que vamos a crear juntos.</p>
      </div>
      <div className="welcome-polaroids" aria-label="Fotos de Albertina">
        <figure className="welcome-polaroid welcome-polaroid--front"><img src="/albertina-polaroid.png" alt="Albertina" /></figure>
      </div>
    </section>

    <section ref={countdownRef} className="countdown countdown-panel" aria-label="Cuenta regresiva">
      <div className="countdown-art-frame">
        <img className="countdown-art" src="/countdown-delfina-pink.png" alt="La cuenta regresiva ya comenzó. Faltan para mi noche soñada." />
        <img className="countdown-reflections-image" src="/countdown-reflections-pink.png" alt="" aria-hidden="true" />
        <div className="timer countdown-live">{Object.entries(time).map(([label, value]) => <div key={label}><strong key={`${label}-${value}`} className="tick-pop">{String(value).padStart(2,"0")}</strong><span>{{days:"DÍAS",hours:"HORAS",minutes:"MINUTOS",seconds:"SEGUNDOS"}[label as keyof typeof time]}</span></div>)}</div>
      </div>
    </section>

    <section className="when when-art-section" aria-label="Sábado 17 de octubre de 2026 a las 21 horas">
      <img src="/fecha-hora-albertina-v2.png" alt="Sábado 17 de octubre de 2026, 21:00 horas" />
      <button className="calendar-hotspot" onClick={calendar} aria-label="Guardar los XV de Albertina en mi calendario">GUARDAR EN MI CALENDARIO</button>
    </section>

    <section className="location location-art-section" aria-label="Cómo llegar a Gaia Eventos">
      <img src="/ubicacion-albertina.png" alt="Cómo llegar a Gaia Eventos. Parque Belgrano, Pergamino, Buenos Aires." />
      <button className="location-hotspot" onClick={() => { setCopied(false); setModal("location"); }} aria-label="Ver ubicación de Gaia Eventos">VER UBICACIÓN</button>
    </section>

    <section className="dress dress-art-section" aria-label="Dress Code: elegancia, brillo y personalidad">
      <img src="/dress-code-albertina.png?v=2" alt="La noche tiene un código. Dress Code: elegancia, brillo y personalidad. Se reservan los tonos rosa bebé y nude claro." />
    </section>

    <section className="music">
      <div className="music-copy"><h2>LA MÚSICA TAMBIÉN<br />CUENTA ESTA HISTORIA</h2><p>SUMÁ ESA CANCIÓN QUE NO PUEDE FALTAR EN MI FIESTA.</p><button onClick={() => window.open("https://open.spotify.com/playlist/0rIOTsHOrL1Q5m4aFD8BVt?si=MSv2-M0AQGyncrRC5dQV8A&utm_source=whatsapp&pi=zDpI3dhITaGCb&pt=6fd266748659061bf748c294c4380de5", "_blank", "noopener,noreferrer")}>AGREGAR MI CANCIÓN</button></div>
      <div className="zoe-turntable" aria-label="Tocadiscos rosa con un disco girando">
        <img className="zoe-turntable__base" src="/turntable-base-albertina.png" alt="Tocadiscos rosa" />
        <img className="zoe-turntable__vinyl" src="/vinyl-albertina.png" alt="Disco de vinilo rosa girando" />
        <img className="zoe-turntable__tonearm" src="/tonearm-albertina.png" alt="" aria-hidden="true" />
      </div>
    </section>

    <section className="bloom bloom-art-section" aria-label="BloomKeep, los recuerdos de esta noche">
      <img src="/bloomkeep-albertina.png" alt="BloomKeep. Durante la noche vas a poder compartir tus fotos en la red social de mi cumple." />
      <button className="bloom-hotspot" onClick={() => window.open("https://app.bloomkeep.site/albertina-15", "_blank", "noopener,noreferrer")} aria-label="Entrar al BloomKeep de Albertina">ENTRAR A BLOOMKEEP</button>
    </section>

    <section className="gifts gifts-art-section" aria-label="Regalos">
      <div className="gift-art-frame">
        <img src="/regalos-albertina.png?v=2" alt="Regalos. Lo más lindo de esta noche va a ser compartirla con vos, pero si querés hacerme un regalo." />
        <button className="gift-hotspot" onClick={() => { setCopied(false); setModal("gift"); }} aria-label="Ver datos para el regalo">VER DATOS</button>
      </div>
    </section>

    <section className="rsvp rsvp-art-section" aria-label="Confirmar asistencia hasta el 27 de septiembre">
      <img src="/rsvp-albertina.png" alt="¿Venís? Quiero festejar esta noche con vos. Tenés tiempo para confirmar hasta el 27 de septiembre." />
      <button className="rsvp-hotspot" onClick={() => window.open("https://bloomdate-rsvp.netlify.app/r/cumple-xv-albertina", "_blank", "noopener,noreferrer")} aria-label="Confirmar asistencia en BloomDate RSVP">CONFIRMAR ASISTENCIA</button>
    </section>
    <footer className="bloomdate-footer" aria-label="Contacto de BloomDate">
      <p className="bloomdate-footer__credit">HECHO CON AMOR <span aria-label="corazón rosa">♥</span> POR <img src="/bloomdate-logo.svg" alt="BloomDate" /></p>
      <nav className="bloomdate-footer__links" aria-label="Canales de contacto">
        <a href="https://wa.me/541140436324" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp 54 11 4043 6324"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L0 24l6.5-1.7c1.7.9 3.6 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.2-3.4-8.4Zm-8.4 18.2c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.4 4.7Zm5.4-7.3c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3 0 1.7 1.3 3.4 1.4 3.6.2.2 2.5 3.8 6 5.3 2.2.9 3 .9 4.1.8.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.2-.2-.4-.3-.7-.4Z"/></svg></a>
        <a href="https://www.instagram.com/bloomdate.invitaciones/" target="_blank" rel="noopener noreferrer" aria-label="Instagram bloomdate.invitaciones"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg></a>
        <a href="https://bloomdate-site.netlify.app/" target="_blank" rel="noopener noreferrer" aria-label="Sitio web de BloomDate"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm7.9 10h-3.1a17.5 17.5 0 0 0-1.3-6A9 9 0 0 1 19.9 11ZM12 3c1.2 0 2.5 3 2.8 8H9.2C9.5 6 10.8 3 12 3ZM8.5 5a17.5 17.5 0 0 0-1.3 6H4.1A9 9 0 0 1 8.5 5ZM4.1 13h3.1a17.5 17.5 0 0 0 1.3 6A9 9 0 0 1 4.1 13Zm7.9 8c-1.2 0-2.5-3-2.8-8h5.6c-.3 5-1.6 8-2.8 8Zm3.5-2a17.5 17.5 0 0 0 1.3-6h3.1a9 9 0 0 1-4.4 6Z"/></svg></a>
      </nav>
      <p className="bloomdate-footer__rights">© TODOS LOS DERECHOS RESERVADOS 2026</p>
    </footer>

    {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><div className="modal" role="dialog" aria-modal="true" aria-label="Información" onMouseDown={e => e.stopPropagation()}><button className="close" onClick={() => setModal(null)} aria-label="Cerrar">×</button>
      {modal === "location" && <><p className="eyebrow">CÓMO LLEGAR</p><h2>Gaia Eventos</h2><p>Parque Belgrano, Pergamino, Buenos Aires</p><button onClick={() => window.open("https://maps.app.goo.gl/yvAMXFXj2TPWWceR6", "_blank", "noopener,noreferrer")}>ABRIR EN GOOGLE MAPS</button><button onClick={() => window.open("https://www.waze.com/ul?q=Parque%20Belgrano%2C%20Pergamino%2C%20Buenos%20Aires&navigate=yes", "_blank", "noopener,noreferrer")}>ABRIR EN WAZE</button><button onClick={async () => { await navigator.clipboard.writeText("Parque Belgrano, Pergamino, Buenos Aires"); setCopied(true); }}>{copied ? "DIRECCIÓN COPIADA ✓" : "COPIAR DIRECCIÓN"}</button></>}
      {modal === "gift" && <><p className="eyebrow">REGALOS</p><h2>Datos</h2><p><strong>Nombre:</strong><br />Albertina Gia Cobone</p><p><strong>Alias:</strong><br />albertina.g.dni</p><p><strong>Entidad:</strong><br />Banco de la Provincia de Buenos Aires</p><button onClick={async () => { await navigator.clipboard.writeText("albertina.g.dni"); setCopied(true); }}>{copied ? "ALIAS COPIADO ✓" : "COPIAR ALIAS"}</button></>}
      {modal === "song" && <form onSubmit={e => {e.preventDefault(); setSent(true)}}><p className="eyebrow">MI PLAYLIST</p><h2>Sumá tu canción</h2>{sent ? <p>¡Gracias! Tu canción quedó anotada ♫</p> : <><label>Tu nombre<input required name="name" /></label><label>Canción y artista<input required name="song" /></label><button>ENVIAR CANCIÓN</button></>}</form>}
      {modal === "rsvp" && <form onSubmit={e => {e.preventDefault(); setSent(true)}}><p className="eyebrow">RSVP</p><h2>¿Venís?</h2>{sent ? <p>¡Gracias por responder! Tu confirmación quedó registrada.</p> : <><label>Nombre y apellido<input required name="fullname" /></label><label>Asistencia<select name="attendance"><option>Confirmo asistencia</option><option>No podré asistir</option></select></label><label>Cantidad de invitados<input type="number" min="1" value="1" readOnly /></label><label>Restricciones alimentarias<textarea name="food" /></label><label>Mensaje opcional<textarea name="message" /></label><button>ENVIAR CONFIRMACIÓN</button></>}</form>}
    </div></div>}
  </main>;
}
