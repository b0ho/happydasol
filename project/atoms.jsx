// Screens: Hero, Dedication, Gallery, Messages, Soundtrack, Auth, Upload
// Each is a self-contained mobile screen designed for ~390px width.

// ────────────────────────────────────────────────────────────
// Shared UI atoms
// ────────────────────────────────────────────────────────────

function FilmEdge({ side = "top" }) {
  // sprocket holes — film perforations
  const holes = Array.from({ length: 18 });
  return (
    <div style={{
      display: "flex",
      gap: 5,
      padding: "5px 8px",
      background: "var(--ink)",
      justifyContent: "space-between",
    }}>
      {holes.map((_, i) => (
        <div key={i} style={{
          width: 12, height: 8, borderRadius: 1,
          background: "var(--paper)",
        }}/>
      ))}
    </div>
  );
}

function StarDivider({ children = "✦" }) {
  return (
    <div className="divider-star font-serif" style={{ fontSize: 13, fontStyle: "italic" }}>
      <span>{children}</span>
    </div>
  );
}

function MonoLabel({ children, style }) {
  return (
    <div className="font-mono tracked-tight" style={{
      fontSize: 10, color: "var(--ink-mute)", ...style,
    }}>{children}</div>
  );
}

function Stamp({ text = "CERTIFIED · WITH LOVE", rot = -8 }) {
  return (
    <div style={{
      position: "absolute", display: "inline-flex", alignItems: "center", justifyContent: "center",
      transform: `rotate(${rot}deg)`,
      border: "2px solid var(--accent-deep)",
      color: "var(--accent-deep)",
      padding: "8px 12px",
      fontFamily: '"Special Elite", monospace',
      fontSize: 9, letterSpacing: "0.2em",
      borderRadius: 4,
      opacity: 0.78,
    }}>
      {text}
    </div>
  );
}

function PhotoFrame({ url, caption, by, idx, rot = 0 }) {
  return (
    <div style={{
      background: "var(--paper)",
      padding: "6px 6px 22px 6px",
      boxShadow: "0 6px 14px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
      transform: `rotate(${rot}deg)`,
      position: "relative",
    }}>
      <div style={{
        width: "100%", aspectRatio: "1/1.1",
        background: `url(${url}) center/cover`,
        position: "relative",
      }} className="sepia-photo"/>
      <div style={{
        marginTop: 6,
        display: "flex", justifyContent: "space-between",
        fontFamily: '"Special Elite", monospace',
        fontSize: 8, color: "var(--ink-mute)",
        letterSpacing: "0.1em",
      }}>
        <span>{caption}</span>
        <span>№{String(idx).padStart(3, "0")}</span>
      </div>
    </div>
  );
}

window.FilmEdge = FilmEdge;
window.StarDivider = StarDivider;
window.MonoLabel = MonoLabel;
window.Stamp = Stamp;
window.PhotoFrame = PhotoFrame;
