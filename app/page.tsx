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
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const tick = () => {
      const left = Math.max(0, EVENT - Date.now());
      setTime({ days: Math.floor(left / 86400000), hours: Math.floor(left / 3600000) % 24, minutes: Math.floor(left / 60000) % 60, seconds: Math.floor(left / 1000) % 60 });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  const enter = (music: boolean) => {
    setEntered(true);
    if (music) {
      const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx(); audioRef.current = ctx;
      const gain = ctx.createGain(); gain.gain.value = 0.025; gain.connect(ctx.destination);
      [261.6, 329.6, 392].forEach((freq, i) => { const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = freq; osc.connect(gain); osc.start(ctx.currentTime + i * .12); osc.stop(ctx.currentTime + 2.8); });
    }
  };

  const calendar = () => {
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20261018T000000Z\nDTEND:20261018T070000Z\nSUMMARY:Albertina - Mis XV\nDESCRIPTION:Una noche soñada\nEND:VEVENT\nEND:VCALENDAR`;
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" })); a.download = "albertina-mis-xv.ics"; a.click(); URL.revokeObjectURL(a.href);
  };

  return <main>
    <div className={`splash ${entered ? "splash--gone" : ""}`} aria-hidden={entered}>
      <DiscoBall className="splash-ball" /><div className="glint g1" /><div className="glint g2" />
      <p className="eyebrow">MIS XV</p><h1>Albertina</h1><p className="intro-line">ESTÁS POR ENTRAR A MI NOCHE</p>
      <div className="splash-actions"><button onClick={() => enter(true)}>ENTRAR CON MÚSICA ♫</button><button className="text-button" onClick={() => enter(false)}>ENTRAR SIN MÚSICA</button></div>
    </div>

    <section className="hero section-pink">
      <div className="hero-copy"><p className="eyebrow">MIS XV</p><h2>Albertina</h2><div className="date-stamp">17 · 10 · 26</div></div>
      <div className="polaroid"><div className="photo-placeholder"><span>Tu foto<br />acá</span></div><p>mi noche soñada ✦</p></div>
      <DiscoBall className="hero-ball" />
    </section>

    <section className="countdown">
      <DiscoBall className="count-ball" /><p className="eyebrow">LA CUENTA REGRESIVA YA COMENZÓ</p><h2>FALTAN</h2><p className="script">para mi noche soñada</p>
      <div className="timer">{Object.entries(time).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2,"0")}</strong><span>{{days:"DÍAS",hours:"HORAS",minutes:"MIN",seconds:"SEG"}[label as keyof typeof time]}</span></div>)}</div>
    </section>

    <section className="when">
      <div className="when-day"><span>SÁBADO</span><strong>17</strong></div>
      <div className="when-detail"><h2>Octubre</h2><p>2026 · 21:00 HS</p><button onClick={calendar}>GUARDAR EN MI CALENDARIO</button></div>
    </section>

    <section className="location">
      <div className="map-art" aria-hidden="true"><i /><i /><i /><span>✦</span></div>
      <div><p className="eyebrow">EL DESTINO DE LA NOCHE</p><h2>CÓMO<br />LLEGAR</h2><p>La dirección estará disponible muy pronto.</p><button onClick={() => setModal("location")}>VER UBICACIÓN</button></div>
    </section>

    <section className="dress">
      <div className="dress-copy"><p>LA NOCHE TIENE UN CÓDIGO.</p><h2>Dress Code</h2><div className="code">ELEGANCIA.<br />BRILLO.<br />PERSONALIDAD.</div><small>SE RESERVAN LOS TONOS ROSA BEBÉ Y NUDE CLARO.</small></div>
      <img src="/dress-code.png" alt="Vestido champagne con brillos, visto de espalda" />
    </section>

    <section className="music">
      <div className="album"><img src="/spotify-cover.png" alt="Vinilo rosa Albertina" /><span>MI PLAYLIST</span></div>
      <div className="music-copy"><p className="eyebrow">ALBERTINA</p><h2>LA MÚSICA TAMBIÉN<br />CUENTA ESTA HISTORIA.</h2><p>SUMÁ ESA CANCIÓN QUE NO PUEDE FALTAR EN MI FIESTA.</p><button onClick={() => setModal("song")}>AGREGAR MI CANCIÓN</button></div>
    </section>

    <section className="bloom">
      <div><p className="eyebrow">LOS RECUERDOS DE ESTA NOCHE</p><h2>BloomKeep</h2><h3>La fiesta no termina cuando baja la música.</h3><p>Durante la noche vas a poder compartir tus fotos, descubrir las de todos los invitados y revivir cada momento en un álbum privado que crecerá en tiempo real.</p><button disabled>ENTRAR A BLOOMKEEP · PRÓXIMAMENTE</button><small>Fotos y mensajes · Sin videos</small></div>
      <img src="/bloomkeep.png" alt="Amigas sacándose una selfie durante la fiesta" />
    </section>

    <section className="gifts"><DiscoBall className="gift-ball" /><div className="giftbox" aria-hidden="true"><span className="lid" /><span className="bow">∞</span><span className="envelope">♡</span></div><div><h2>REGALOS</h2><p>Lo más lindo de esta noche<br />va a ser compartirla con vos,<br />pero si querés hacerme un regalo...</p><button onClick={() => setModal("gift")}>VER DATOS</button></div></section>

    <section className="rsvp mosaic"><div className="mosaic-inner"><p className="eyebrow">17 · 10 · 2026</p><h2>¿Venís?</h2><p>Quiero festejar esta noche con vos.</p><small>La fecha límite de confirmación se informará pronto.</small><button onClick={() => setModal("rsvp")}>CONFIRMAR ASISTENCIA</button></div></section>
    <footer className="mosaic"><div className="mosaic-inner"><h2>GRACIAS</h2><p>POR SER PARTE<br />DE ESTA NOCHE</p><span>¡QUE EMPIECE LA FIESTA!</span><strong>Albertina</strong></div></footer>

    {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><div className="modal" role="dialog" aria-modal="true" aria-label="Información" onMouseDown={e => e.stopPropagation()}><button className="close" onClick={() => setModal(null)} aria-label="Cerrar">×</button>
      {modal === "location" && <><p className="eyebrow">CÓMO LLEGAR</p><h2>Ubicación</h2><p>La dirección todavía no fue cargada. Cuando esté disponible vas a poder elegir:</p><button disabled>GOOGLE MAPS</button><button disabled>WAZE</button><button disabled>COPIAR DIRECCIÓN</button></>}
      {modal === "gift" && <><p className="eyebrow">REGALOS</p><h2>Datos</h2><p>Los datos de regalo todavía no fueron cargados. Volvé a consultar más cerca de la fecha.</p></>}
      {modal === "song" && <form onSubmit={e => {e.preventDefault(); setSent(true)}}><p className="eyebrow">MI PLAYLIST</p><h2>Sumá tu canción</h2>{sent ? <p>¡Gracias! Tu canción quedó anotada ♫</p> : <><label>Tu nombre<input required name="name" /></label><label>Canción y artista<input required name="song" /></label><button>ENVIAR CANCIÓN</button></>}</form>}
      {modal === "rsvp" && <form onSubmit={e => {e.preventDefault(); setSent(true)}}><p className="eyebrow">RSVP</p><h2>¿Venís?</h2>{sent ? <p>¡Gracias por responder! Tu confirmación quedó registrada.</p> : <><label>Nombre y apellido<input required name="fullname" /></label><label>Asistencia<select name="attendance"><option>Confirmo asistencia</option><option>No podré asistir</option></select></label><label>Cantidad de invitados<input type="number" min="1" value="1" readOnly /></label><label>Restricciones alimentarias<textarea name="food" /></label><label>Mensaje opcional<textarea name="message" /></label><button>ENVIAR CONFIRMACIÓN</button></>}</form>}
    </div></div>}
  </main>;
}
