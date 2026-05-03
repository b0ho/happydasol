// Gallery — cinematic camera-roll grid
function Gallery({ photos, onUpload, onOpenPhoto }) {
  return (
    <div style={{
      height: "100%",
      background: "var(--paper)",
      color: "var(--ink)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflowY: "auto",
    }} className="paper-grain">

      <div style={{ padding: "50px 22px 0", position: "relative", zIndex: 3 }}>
        <div className="font-mono tracked" style={{ fontSize: 9, color: "var(--accent-deep)", textAlign: "center" }}>
          — ROLLO III · GALERÍA —
        </div>
        <div className="font-display" style={{
          fontSize: 30, textAlign: "center", marginTop: 4, lineHeight: 1,
        }}>
          La Galería
        </div>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic",
          textAlign: "center",
          fontSize: 13,
          color: "var(--ink-soft)",
          marginTop: 4,
        }}>
          — 두 사람을 담은 장면들 —
        </div>
      </div>

      <div style={{
        margin: "20px 18px 0",
        padding: "16px",
        border: "1px dashed var(--ink-mute)",
        background: "var(--paper-2)",
        position: "relative", zIndex: 3,
      }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{
            width: 46, height: 46,
            background: "var(--ink)", color: "var(--paper)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
              <rect x="1" y="4" width="20" height="14" stroke="currentColor" strokeWidth="1.4"/>
              <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.4"/>
              <rect x="7" y="2" width="8" height="3" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="font-display" style={{ fontSize: 16, lineHeight: 1.1 }}>
              Enviar una Foto
            </div>
            <div className="font-mono" style={{
              fontSize: 9, color: "var(--ink-mute)",
              letterSpacing: "0.12em", marginTop: 3,
            }}>
              MÁX · 5MB &nbsp;·&nbsp; HASTA 30 / INVITADO
            </div>
          </div>
          <button className="btn-vintage" onClick={onUpload}>SUBIR</button>
        </div>
        <div style={{
          marginTop: 10,
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic",
          fontSize: 12,
          color: "var(--ink-soft)",
          lineHeight: 1.4,
        }}>
          두 사람과 함께 찍은 사진을, 우리만의 장면을 보태주세요.
        </div>
      </div>

      <div style={{
        margin: "12px 18px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 3,
      }}>
        <MonoLabel>TU ROLLO · 12 / 30 USADAS</MonoLabel>
        <MonoLabel>{photos.length} TOMAS TOTALES</MonoLabel>
      </div>
      <div style={{ margin: "6px 18px 0", height: 2, background: "var(--rule)", position: "relative", zIndex: 3 }}>
        <div style={{ width: "40%", height: "100%", background: "var(--accent)" }}/>
      </div>

      <div style={{
        margin: "18px 12px 0",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 6,
        position: "relative", zIndex: 3,
      }}>
        {photos.map((p, i) => (
          <div key={i} onClick={() => onOpenPhoto && onOpenPhoto(i)} style={{
            aspectRatio: "1/1",
            background: `url(${p.url}) center/cover`,
            position: "relative",
            cursor: "pointer",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
          }} className="sepia-photo">
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "12px 5px 4px",
              background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.55))",
              fontFamily: '"Special Elite", monospace',
              fontSize: 7.5,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "0.08em",
              display: "flex", justifyContent: "space-between",
            }}>
              <span style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{p.by}</span>
              <span>№{String(i+1).padStart(3, "0")}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 36 }}/>

      <div style={{
        margin: "10px 22px 24px",
        textAlign: "center",
        position: "relative", zIndex: 3,
      }}>
        <div style={{ height: 1, background: "var(--ink)", opacity: 0.4, marginBottom: 8 }}/>
        <div className="font-mono tracked" style={{ fontSize: 8, color: "var(--ink-mute)" }}>
          ENVIADAS POR LOS AMIGOS QUERIDOS
        </div>
      </div>
    </div>
  );
}

window.Gallery = Gallery;
