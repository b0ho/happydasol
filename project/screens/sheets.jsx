// Upload modal — sheet over current screen (Roman Holiday sepia)
function UploadSheet({ onClose }) {
  const [files, setFiles] = React.useState([
    { name: "trevi_2024.jpg", size: "3.2MB", caption: "그날의 저녁 햇살" },
    { name: "dinner_party.jpg", size: "4.1MB", caption: "함께 보낸 어떤 봄" },
  ]);
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(20, 12, 8, 0.6)",
      display: "flex", alignItems: "flex-end",
      zIndex: 100,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%",
        background: "var(--paper)",
        color: "var(--ink)",
        padding: "20px 22px 28px",
        position: "relative",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.45)",
      }} className="paper-grain">
        <div style={{
          width: 40, height: 4, background: "var(--ink-mute)", opacity: 0.3,
          margin: "0 auto 14px", borderRadius: 2,
        }}/>
        <div className="font-mono tracked" style={{
          fontSize: 9, color: "var(--accent-deep)", textAlign: "center",
        }}>— SUBIR UNA TOMA —</div>
        <div className="font-display" style={{
          fontSize: 24, textAlign: "center", marginTop: 4, lineHeight: 1,
          color: "var(--ink)",
        }}>사진 보내기</div>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic",
          textAlign: "center", fontSize: 13,
          color: "var(--ink-soft)", marginTop: 4,
        }}>두 사람의 장면을 남겨주세요</div>

        <div style={{
          marginTop: 16,
          padding: "26px 14px",
          border: "1.5px dashed var(--ink-mute)",
          background: "var(--paper-2)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 26 }}>🎞️</div>
          <div className="font-display" style={{
            fontSize: 17, marginTop: 6,
            color: "var(--accent-deep)",
          }}>
            Tap or drag a photo
          </div>
          <div className="font-mono tracked-tight" style={{
            fontSize: 9, color: "var(--ink-mute)", marginTop: 4,
          }}>JPG · PNG · HEIC &nbsp;·&nbsp; UP TO 5MB</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="font-mono tracked-tight" style={{
            fontSize: 9, color: "var(--ink-mute)", marginBottom: 8,
          }}>EN COLA · {files.length} READY</div>
          {files.map((f, i) => (
            <div key={i} style={{
              display: "flex", gap: 10, alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px dashed var(--rule)",
            }}>
              <div style={{
                width: 36, height: 36,
                background: "var(--ink)",
                color: "var(--paper)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                fontFamily: '"Special Elite", monospace',
                fontSize: 11, letterSpacing: "0.05em",
              }}>0{i+1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-mono" style={{
                  fontSize: 10, color: "var(--ink-mute)",
                  letterSpacing: "0.1em",
                  overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                }}>{f.name}</div>
                <input defaultValue={f.caption} placeholder="caption..." style={{
                  width: "100%", boxSizing: "border-box",
                  background: "transparent", border: "none",
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: "italic", fontSize: 14,
                  color: "var(--ink)",
                  outline: "none", padding: 0, marginTop: 2,
                }}/>
              </div>
              <div className="font-mono" style={{
                fontSize: 9, color: "var(--ink-mute)", flexShrink: 0,
                letterSpacing: "0.08em",
              }}>{f.size}</div>
            </div>
          ))}
        </div>

        <button style={{
          marginTop: 16, width: "100%", padding: "14px",
          background: "var(--accent-deep)", color: "var(--paper)",
          border: "none", cursor: "pointer",
          fontFamily: '"Special Elite", monospace',
          fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
        }}>
          UPLOAD &nbsp;·&nbsp; 올리기 ({files.length})
        </button>
        <button onClick={onClose} style={{
          marginTop: 8, width: "100%", padding: "12px",
          background: "transparent",
          color: "var(--ink)",
          border: "1px solid var(--ink-mute)",
          cursor: "pointer",
          fontFamily: '"Special Elite", monospace',
          fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
        }}>CANCEL</button>
      </div>
    </div>
  );
}

// Leave-message sheet — nickname + text only (Roman Holiday sepia)
function MessageSheet({ onClose }) {
  const [nick, setNick] = React.useState("");
  const [text, setText] = React.useState("");
  const max = 240;
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(20, 12, 8, 0.6)",
      display: "flex", alignItems: "flex-end",
      zIndex: 100,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%",
        background: "var(--paper)",
        color: "var(--ink)",
        padding: "20px 22px 28px",
        position: "relative",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.45)",
      }} className="paper-grain">
        <div style={{
          width: 40, height: 4, background: "var(--ink-mute)", opacity: 0.3,
          margin: "0 auto 14px", borderRadius: 2,
        }}/>
        <div className="font-mono tracked" style={{
          fontSize: 9, color: "var(--accent-deep)", textAlign: "center",
        }}>— ADD TO THE CREDITS —</div>
        <div className="font-display" style={{
          fontSize: 24, textAlign: "center", marginTop: 4, lineHeight: 1,
          color: "var(--ink)",
        }}>Tu Línea</div>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic",
          textAlign: "center", fontSize: 13,
          color: "var(--ink-soft)", marginTop: 4,
        }}>크레딧에 한 줄 남겨주세요</div>

        <div style={{
          marginTop: 16,
          padding: "16px",
          background: "var(--paper-2)",
          border: "1px solid var(--rule)",
          position: "relative",
        }}>
          <div style={{ marginBottom: 12 }}>
            <div className="font-mono tracked-tight" style={{
              fontSize: 9, color: "var(--ink-mute)", marginBottom: 4,
            }}>NICKNAME · 닉네임</div>
            <input value={nick} onChange={e => setNick(e.target.value)} placeholder="sky" style={{
              width: "100%", boxSizing: "border-box",
              background: "transparent", border: "none",
              borderBottom: "1px solid var(--ink-mute)",
              padding: "4px 0",
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 17,
              color: "var(--ink)", outline: "none",
            }}/>
          </div>

          <div className="font-mono tracked-tight" style={{
            fontSize: 9, color: "var(--ink-mute)", marginBottom: 4, marginTop: 8,
          }}>MESSAGE · 메시지</div>
          <textarea value={text} onChange={e => setText(e.target.value.slice(0, max))} rows={5} placeholder="두 사람에게 한 줄 남겨주세요..." style={{
            width: "100%", boxSizing: "border-box",
            background: "transparent", border: "none",
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic", fontSize: 15,
            lineHeight: 1.5,
            color: "var(--ink)",
            outline: "none", resize: "none",
          }}/>
          <div style={{
            display: "flex", justifyContent: "flex-end",
            marginTop: 6, alignItems: "center",
          }}>
            <div className="font-mono" style={{
              fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.1em",
            }}>
              {text.length}/{max}
            </div>
          </div>
        </div>

        <button style={{
          marginTop: 16, width: "100%", padding: "14px",
          background: "var(--accent-deep)", color: "var(--paper)",
          border: "none", cursor: "pointer",
          fontFamily: '"Special Elite", monospace',
          fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
        }}>
          SEND &nbsp;·&nbsp; 보내기
        </button>
        <button onClick={onClose} style={{
          marginTop: 8, width: "100%", padding: "12px",
          background: "transparent",
          color: "var(--ink)",
          border: "1px solid var(--ink-mute)",
          cursor: "pointer",
          fontFamily: '"Special Elite", monospace',
          fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
        }}>CANCEL</button>
      </div>
    </div>
  );
}

window.UploadSheet = UploadSheet;
window.MessageSheet = MessageSheet;
