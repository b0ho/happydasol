// Mobile shell — Poster (1st tab) → Enter → Auth → app (Poster · Gallery · Credits)
function MobileShell({ initial = "auth", initialTab = "poster" }) {
  const [stage, setStage] = React.useState(initial);
  const [tab, setTab] = React.useState(initialTab);
  const [sheet, setSheet] = React.useState(null);
  const [muted, setMuted] = React.useState(true);
  const [lightboxIdx, setLightboxIdx] = React.useState(null);

  const goAuth = () => { setStage("app"); setTab("poster"); };
  const goBack = () => setStage("auth");
  const photos = window.SAMPLE_PHOTOS;

  const TABS = [
    { id: "poster", label: "INVITE", icon: "✰" },
    { id: "gallery", label: "GALLERY", icon: "▢" },
    { id: "credits", label: "CREDITS", icon: "♪" },
  ];

  if (stage === "auth") {
    return (
      <div style={{ height: "100%", overflow: "hidden", position: "relative" }}>
        <AuthScreen onSignIn={goAuth} onBack={goBack}/>
        <MuteButton muted={muted} onToggle={() => setMuted(m => !m)}/>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        {tab === "poster" && <HeroPoster onEnter={null}/>}
        {tab === "gallery" && <Gallery photos={photos} onUpload={() => setSheet("upload")} onOpenPhoto={(i) => setLightboxIdx(i)}/>}
        {tab === "credits" && <Messages messages={window.SAMPLE_MESSAGES} onLeaveMessage={() => setSheet("message")}/>}

        {sheet === "upload" && <UploadSheet onClose={() => setSheet(null)}/>}
        {sheet === "message" && <MessageSheet onClose={() => setSheet(null)}/>}

        {lightboxIdx !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx(i => Math.max(0, i - 1))}
            onNext={() => setLightboxIdx(i => Math.min(photos.length - 1, i + 1))}
          />
        )}

        <MuteButton muted={muted} onToggle={() => setMuted(m => !m)}/>
      </div>

      <div style={{
        position: "relative", zIndex: 50,
        background: "var(--ink)",
        color: "var(--paper)",
        paddingBottom: 24,
        borderTop: "1px solid var(--gold)",
      }}>
        <div style={{ display: "flex", padding: "12px 6px 6px" }}>
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex: 1, background: "transparent", border: "none", cursor: "pointer",
                color: active ? "var(--gold)" : "rgba(245, 230, 200, 0.5)",
                padding: "6px 0 4px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <span className="font-display" style={{
                  fontSize: 18,
                }}>{t.icon}</span>
                <span className="font-mono tracked-tight" style={{
                  fontSize: 9,
                }}>{t.label}</span>
                {active && <div style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: "var(--gold)", marginTop: 2,
                }}/>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MuteButton({ muted, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      position: "absolute",
      top: 60, right: 14, zIndex: 70,
      width: 38, height: 38, borderRadius: "50%",
      background: "rgba(245, 230, 200, 0.92)",
      color: "var(--ink)",
      border: "1px solid var(--gold)",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
    }}>
      {muted ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 6.5h3l4-3v11l-4-3H2v-5z" fill="currentColor"/>
          <path d="M12 6l4 6M16 6l-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 6.5h3l4-3v11l-4-3H2v-5z" fill="currentColor"/>
          <path d="M12 5.5c1.5 1 1.5 6 0 7M14.5 3.5c2.5 2 2.5 9 0 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      )}
    </button>
  );
}

window.MobileShell = MobileShell;
window.MuteButton = MuteButton;
