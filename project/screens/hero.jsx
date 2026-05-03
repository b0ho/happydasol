// Hero — uses the pre-made poster image as the full bleed visual.
// Minimal chrome below: D-Day pill + film perforations.
function HeroPoster({ onEnter }) {
  // D-Day calculation
  const target = new Date("2026-05-16T00:00:00");
  const now = new Date();
  const diffMs = target - now;
  const days = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return (
    <div style={{
      height: "100%",
      background: "var(--ink)",
      color: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top sprocket strip */}
      <div style={{
        flexShrink: 0,
        padding: "44px 0 0",
      }}>
        <Sprockets/>
      </div>

      {/* Poster — full bleed */}
      <div style={{
        flex: 1,
        position: "relative",
        margin: "8px 14px 0",
        background: `url(${window.SAMPLE_HERO}) center/cover, var(--paper-2)`,
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.5)",
        overflow: "hidden",
      }} className="film-grain">
        {/* Floating gold stamp - top right */}
        <div style={{
          position: "absolute",
          top: 14, right: 14,
          border: "1.5px solid var(--gold)",
          color: "var(--gold)",
          padding: "5px 10px",
          fontFamily: '"Special Elite", monospace',
          fontSize: 9, letterSpacing: "0.22em",
          background: "rgba(20, 12, 8, 0.5)",
          backdropFilter: "blur(4px)",
          transform: "rotate(3deg)",
          zIndex: 4,
        }}>VIP · INVITED</div>

        {/* Bottom film-strip caption */}
        <div style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          padding: "30px 14px 12px",
          background: "linear-gradient(0deg, rgba(15,8,5,0.78) 0%, rgba(15,8,5,0.4) 60%, transparent 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          zIndex: 3,
        }}>
          <div className="font-mono tracked" style={{
            fontSize: 8, color: "rgba(245, 230, 200, 0.78)",
          }}>REEL · 01 / 04</div>
          <div className="font-mono tracked" style={{
            fontSize: 8, color: "rgba(245, 230, 200, 0.78)",
          }}>SEOUL · 2026</div>
        </div>
      </div>

      {/* D-Day strip */}
      <div style={{
        flexShrink: 0,
        padding: "14px 14px 4px",
        display: "flex",
        gap: 10,
        alignItems: "stretch",
      }}>
        <div style={{
          flex: 1,
          padding: "10px 14px",
          border: "1px solid var(--gold)",
          background: "rgba(245, 230, 200, 0.04)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <div className="font-mono tracked" style={{
            fontSize: 8, color: "var(--gold)",
            opacity: 0.75,
          }}>OPENING<br/>D−DAY</div>
          <div className="font-display" style={{
            fontSize: 30, lineHeight: 1, color: "var(--gold)",
          }}>D{days > 0 ? "−" : "+"}{Math.abs(days)}</div>
          <div style={{ flex: 1 }}/>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontSize: 12, color: "rgba(245, 230, 200, 0.7)",
            textAlign: "right", lineHeight: 1.2,
          }}>결혼식까지<br/>{days}일</div>
        </div>
      </div>

      {/* Bottom sprocket strip */}
      <div style={{
        flexShrink: 0,
        padding: "10px 0 4px",
      }}>
        <Sprockets/>
      </div>
    </div>
  );
}

function Sprockets() {
  const holes = Array.from({ length: 16 });
  return (
    <div style={{
      display: "flex",
      gap: 4,
      padding: "0 8px",
      justifyContent: "space-between",
    }}>
      {holes.map((_, i) => (
        <div key={i} style={{
          width: "100%",
          maxWidth: 14,
          height: 8,
          borderRadius: 1,
          background: "rgba(245, 230, 200, 0.18)",
          border: "1px solid rgba(245, 230, 200, 0.35)",
        }}/>
      ))}
    </div>
  );
}

window.HeroPoster = HeroPoster;
