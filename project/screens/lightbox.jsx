// Lightbox — fullscreen photo viewer with caption + author
function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];
  if (!photo) return null;
  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div style={{
        padding: "50px 18px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "var(--gold)",
      }} onClick={e => e.stopPropagation()}>
        <div className="font-mono tracked" style={{ fontSize: 9 }}>
          № {String(index + 1).padStart(3, "0")} / {String(photos.length).padStart(3, "0")}
        </div>
        <button onClick={onClose} style={{
          background: "transparent", border: "1px solid rgba(255,255,255,0.4)",
          color: "rgba(255,255,255,0.85)",
          padding: "4px 10px", cursor: "pointer",
          fontFamily: '"Special Elite", monospace',
          fontSize: 9, letterSpacing: "0.2em",
        }}>CLOSE · 닫기</button>
      </div>

      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 8px", position: "relative",
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onPrev} disabled={index === 0} style={{
          position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)",
          color: "rgba(255,255,255,0.85)", width: 36, height: 36,
          cursor: index === 0 ? "default" : "pointer",
          opacity: index === 0 ? 0.3 : 1,
          fontFamily: "serif", fontSize: 18,
        }}>‹</button>

        <img src={photo.url} alt={photo.caption || ""} className="sepia-photo" style={{
          maxWidth: "100%", maxHeight: "100%",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.2), 0 12px 40px rgba(0,0,0,0.6)",
        }}/>

        <button onClick={onNext} disabled={index === photos.length - 1} style={{
          position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)",
          color: "rgba(255,255,255,0.85)", width: 36, height: 36,
          cursor: index === photos.length - 1 ? "default" : "pointer",
          opacity: index === photos.length - 1 ? 0.3 : 1,
          fontFamily: "serif", fontSize: 18,
        }}>›</button>
      </div>

      <div style={{
        padding: "16px 22px 36px", textAlign: "center",
        color: "rgba(255,255,255,0.92)",
      }} onClick={e => e.stopPropagation()}>
        <div className="font-mono tracked" style={{
          fontSize: 9, color: "var(--gold)",
        }}>UPLOADED BY · @{photo.by}</div>
        {photo.caption && (
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontSize: 16, marginTop: 8, lineHeight: 1.4,
          }}>"{photo.caption}"</div>
        )}
      </div>
    </div>
  );
}

window.Lightbox = Lightbox;
