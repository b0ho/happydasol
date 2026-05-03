// Auth — TICKET submission with D-Day below
function AuthScreen({ onSignIn }) {
  const [name, setName] = React.useState("");

  // D-Day calculation
  const target = new Date("2026-05-16T00:00:00");
  const now = new Date();
  const diffMs = target - now;
  const days = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return (
    <div style={{
      height: "100%",
      background: "var(--paper)",
      color: "var(--ink)",
      display: "flex", flexDirection: "column",
      padding: "0 26px",
      position: "relative",
      overflowY: "auto",
    }} className="paper-grain">

      {/* top spacer */}
      <div style={{ paddingTop: 56, position: "relative", zIndex: 3 }}/>

      {/* Wedding title — clear, dominant */}
      <div style={{
        marginTop: 14, textAlign: "center",
        position: "relative", zIndex: 3,
      }}>
        <div className="font-mono tracked" style={{
          fontSize: 9, color: "var(--accent-deep)",
        }}>— THE WEDDING OF · 결혼식 —</div>
        <div className="font-display" style={{
          fontSize: 28, marginTop: 8, lineHeight: 1, color: "var(--ink)",
        }}>
          NAYOUNG <span style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: '"Pinyon Script", cursive', fontWeight: 400 }}>&amp;</span> DASOL
        </div>
        <div style={{
          marginTop: 6, fontFamily: '"Cormorant Garamond", serif',
          fontSize: 14, color: "var(--ink-soft)",
        }}>
          이나영 · 김다솔
        </div>
        <div style={{
          marginTop: 4, fontFamily: '"Special Elite", monospace',
          fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-mute)",
        }}>SAT · MAY 16 · 2026</div>
      </div>

      <div style={{
        margin: "16px 0 0", height: 1, background: "var(--ink)", opacity: 0.4,
        position: "relative", zIndex: 3,
      }}/>

      {/* Section heading */}
      <div style={{
        marginTop: 18, textAlign: "center",
        position: "relative", zIndex: 3,
      }}>
        <div className="font-mono tracked" style={{
          fontSize: 9, color: "var(--accent-deep)",
        }}>— TAQUILLA —</div>
        <div className="font-display" style={{
          fontSize: 20, marginTop: 4, lineHeight: 1,
        }}>입장권 제출</div>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic",
          fontSize: 13, color: "var(--ink-soft)", marginTop: 4,
        }}>닉네임을 입력해주세요</div>
      </div>

      {/* TICKET — more spacious */}
      <div style={{
        marginTop: 16,
        position: "relative",
        background: "var(--paper-2)",
        boxShadow: "0 0 0 1px var(--ink), 0 12px 30px rgba(0,0,0,0.18)",
        zIndex: 3,
      }}>
        <div style={{
          height: 14,
          background: "repeating-linear-gradient(90deg, var(--ink) 0 14px, var(--paper-2) 14px 22px)",
        }}/>

        <div style={{
          padding: "16px 22px 0",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <div>
            <div className="font-mono" style={{
              fontSize: 8, letterSpacing: "0.22em", color: "var(--ink-mute)",
            }}>ADMIT ONE · 입장권</div>
            <div className="font-display" style={{
              fontSize: 22, lineHeight: 1, marginTop: 4, color: "var(--accent-deep)",
            }}>BOLETO N° 001</div>
          </div>
          <div style={{
            border: "1.5px solid var(--accent-deep)", color: "var(--accent-deep)",
            padding: "4px 8px",
            fontFamily: '"Special Elite", monospace',
            fontSize: 9, letterSpacing: "0.2em",
            transform: "rotate(4deg)",
          }}>VIP</div>
        </div>

        <div style={{ padding: "14px 22px", borderTop: "1px dashed var(--rule)", marginTop: 14 }}>
          <div className="font-mono" style={{
            fontSize: 8, letterSpacing: "0.18em", color: "var(--ink-mute)",
          }}>FILM · 영화</div>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic",
            fontSize: 15, color: "var(--ink)", marginTop: 2,
          }}>NAYOUNG &amp; DASOL — A LOVE STORY</div>
        </div>

        <div style={{ padding: "0 22px 22px" }}>
          <div style={{ marginTop: 4 }}>
            <div className="font-mono" style={{
              fontSize: 8, letterSpacing: "0.2em", color: "var(--ink-mute)",
            }}>NICKNAME · 닉네임</div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="sky" style={{
              width: "100%", boxSizing: "border-box",
              background: "transparent", border: "none",
              borderBottom: "1px solid var(--ink-mute)", padding: "8px 0",
              fontFamily: '"Cormorant Garamond", serif', fontSize: 18,
              color: "var(--ink)", outline: "none",
            }}/>
            <div style={{
              fontSize: 11, color: "var(--ink-mute)",
              marginTop: 8,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
            }}>크레딧과 사진에 표시될 이름입니다</div>
          </div>
        </div>

        <div style={{
          padding: "12px 22px",
          borderTop: "1px dashed var(--rule)",
          display: "flex", justifyContent: "space-between",
          fontFamily: '"Special Elite", monospace',
          fontSize: 8, letterSpacing: "0.18em",
          color: "var(--ink-mute)",
        }}>
          <span>SALA · 01</span>
          <span>FILA · A</span>
          <span>05.16.2026</span>
        </div>

        <div style={{
          height: 14,
          background: "repeating-linear-gradient(90deg, var(--ink) 0 14px, var(--paper-2) 14px 22px)",
        }}/>
      </div>

      {/* D-Day below ticket */}
      <div style={{
        marginTop: 14, textAlign: "center", position: "relative", zIndex: 3,
      }}>
        <div style={{
          display: "inline-flex", alignItems: "baseline", gap: 10,
          padding: "8px 16px",
          border: "1.5px solid var(--accent-deep)",
          background: "var(--paper-2)",
        }}>
          <div className="font-mono tracked" style={{
            fontSize: 9, color: "var(--accent-deep)",
          }}>OPENING</div>
          <div className="font-display" style={{
            fontSize: 22, lineHeight: 1, color: "var(--accent-deep)",
          }}>D{days > 0 ? "−" : "+"}{Math.abs(days)}</div>
          <div className="font-mono tracked" style={{
            fontSize: 9, color: "var(--accent-deep)",
          }}>{days === 0 ? "TODAY" : `${days} DAYS`}</div>
        </div>
      </div>

      <button onClick={() => onSignIn && onSignIn(name)} style={{
        marginTop: 14, width: "100%", padding: "14px",
        background: "var(--accent-deep)", color: "var(--paper)",
        border: "none", cursor: "pointer",
        fontFamily: '"Special Elite", monospace',
        fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
        position: "relative", zIndex: 3,
      }}>
        SUBMIT · 제출하기
      </button>

      <div style={{ paddingBottom: 24 }}/>
    </div>
  );
}

window.AuthScreen = AuthScreen;
