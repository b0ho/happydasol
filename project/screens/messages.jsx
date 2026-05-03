// Messages — credits roll. Tap any single message to highlight it (dim others + pause).
function Messages({ messages, onLeaveMessage }) {
  const [paused, setPaused] = React.useState(false);
  const [highlightIdx, setHighlightIdx] = React.useState(null);

  const tapMessage = (i, e) => {
    e.stopPropagation();
    if (highlightIdx === i) {
      setHighlightIdx(null);
      setPaused(false);
    } else {
      setHighlightIdx(i);
      setPaused(true);
    }
  };

  const tapBackground = () => {
    if (highlightIdx !== null) {
      setHighlightIdx(null);
      setPaused(false);
    } else {
      setPaused(p => !p);
    }
  };

  return (
    <div style={{
      height: "100%",
      background: "var(--ink)",
      color: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }} className="film-grain">

      <div style={{
        padding: "50px 22px 14px",
        position: "relative", zIndex: 5,
        background: "var(--ink)",
        borderBottom: "1px solid rgba(255,255,255,0.18)",
      }}>
        <div className="font-mono tracked" style={{
          fontSize: 9, color: "var(--gold)", textAlign: "center",
        }}>— END CREDITS · CRÉDITOS FINALES —</div>
        <div className="font-display" style={{
          fontSize: 26, textAlign: "center", marginTop: 4, lineHeight: 1,
          color: "var(--paper)",
        }}>
          축하의 말
        </div>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic",
          textAlign: "center",
          fontSize: 13,
          color: "rgba(255,255,255,0.72)",
          marginTop: 4,
        }}>
          With special thanks to —
        </div>
      </div>

      <div style={{
        flex: 1, position: "relative", overflow: "hidden",
        maskImage: "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
      }}
        onClick={tapBackground}
      >
        <div className={`credits-roll ${paused ? "paused" : ""}`} style={{
          position: "absolute",
          left: 0, right: 0,
          padding: "0 26px",
          textAlign: "center",
        }}>
          {messages.map((m, i) => {
            const cls =
              highlightIdx === null ? "" :
              highlightIdx === i ? "highlight" : "dim";
            return (
              <div
                key={i}
                className={`credit-msg ${cls}`}
                onClick={(e) => tapMessage(i, e)}
                style={{ marginBottom: 38, cursor: "pointer" }}
              >
                <div className="font-display" style={{
                  fontSize: 19, lineHeight: 1.1, color: "var(--gold)",
                  marginBottom: 10,
                }}>{m.from}</div>
                <div style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: "italic",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.85)",
                  textWrap: "pretty",
                }}>"{m.text}"</div>
              </div>
            );
          })}
          <div style={{ marginBottom: 38 }}>
            <div className="font-display" style={{ fontSize: 22, color: "var(--gold)" }}>FIN</div>
          </div>
        </div>

        {(paused || highlightIdx !== null) && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "var(--paper)",
            padding: "4px 10px",
            fontFamily: '"Special Elite", monospace',
            fontSize: 9, letterSpacing: "0.2em",
            zIndex: 6,
          }}>{highlightIdx !== null ? "FOCUS · 탭해서 해제" : "PAUSED · 탭하면 재생"}</div>
        )}
      </div>

      <div style={{
        padding: "14px 18px 24px",
        background: "linear-gradient(0deg, var(--ink) 70%, transparent)",
        position: "relative", zIndex: 5,
      }}>
        <button onClick={onLeaveMessage} style={{
          width: "100%",
          fontFamily: '"Special Elite", monospace',
          fontSize: 11, letterSpacing: "0.24em",
          textTransform: "uppercase",
          padding: "14px 18px",
          background: "var(--gold)",
          color: "var(--ink)",
          border: "none",
          cursor: "pointer",
        }}>
          ✎ &nbsp; 메시지 남기기 · LEAVE A MESSAGE
        </button>
        <div style={{
          textAlign: "center", marginTop: 8,
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: "italic", fontSize: 12, color: "rgba(255,255,255,0.55)",
        }}>메시지를 탭하면 그 메시지만 강조됩니다</div>
      </div>
    </div>
  );
}

window.Messages = Messages;
