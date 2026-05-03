const express = require("express");
const multer  = require("multer");
const Database = require("better-sqlite3");
const path = require("path");
const fs   = require("fs");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Storage dirs ─────────────────────────────────────────────
fs.mkdirSync("uploads", { recursive: true });

// ── Database ─────────────────────────────────────────────────
const db = new Database("wedding.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname   TEXT NOT NULL,
    text       TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS photos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    filename   TEXT NOT NULL,
    caption    TEXT DEFAULT '',
    nickname   TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed sample messages once
if (db.prepare("SELECT COUNT(*) as n FROM messages").get().n === 0) {
  const ins = db.prepare("INSERT INTO messages (nickname, text) VALUES (?, ?)");
  [
    ["sky",       "나영아, 너의 웃음을 처음 본 그 봄날부터 지금까지, 너는 늘 누군가의 햇살이었어. 다솔 오빠 옆에서도 계속 그렇게 빛나길."],
    ["재현",      "다솔, 형이 밤새 라면 끓이며 했던 그 말 — '나영이는 내가 본 사람 중에 제일 다정한 사람'. 두 사람이 만든 다정함, 평생 갑니다."],
    ["minji_",    "축하해. 너희 둘이 같이 있을 때의 공기를 나는 좋아해. 가볍고 따뜻하고 분명한."],
    ["하나",      "언니, 결혼 정말 축하해요. 형부 잘 부탁드려요."],
    ["Junho",     "Felicidades. 결혼식날 1열에서 박수칠게."],
    ["yuri.lee",  "로마에서 둘이 처음 만났을 때의 그 영화 같은 장면, 평생 가져가."],
    ["다은",      "내 인생에서 본 가장 단단한 사랑. 두 사람이라서 가능한 일."],
    ["hyunwoo",   "형, 결혼 진심으로 축하해요. 형수님께도 안부 전해주세요."],
    ["소라",      "쌤, 결혼 축하드려요! 결혼식날 꽃다발 들고 갈게요 🤍"],
    ["min_seok",  "선임님, 결혼 축하드립니다. 두 분 행복하세요!"],
    ["anonymous", "두 분 모두 처음 뵙지만, 사진만 봐도 잘 어울리세요. Felicidades."],
  ].forEach(([nick, text]) => ins.run(nick, text));
}

// ── Multer ───────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(jpeg|png|webp|heic|heif)$/.test(file.mimetype);
    cb(ok ? null : new Error("이미지 파일만 업로드할 수 있습니다."), ok);
  },
});

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(express.static("."));          // serves Wedding Invitation.html + project/
app.use("/uploads", express.static("uploads"));

// ── API: Messages ─────────────────────────────────────────────
app.get("/api/messages", (_req, res) => {
  const rows = db.prepare("SELECT * FROM messages ORDER BY created_at ASC").all();
  res.json(rows);
});

app.post("/api/messages", (req, res) => {
  const { nickname, text } = req.body ?? {};
  if (!nickname?.trim() || !text?.trim())
    return res.status(400).json({ error: "닉네임과 메시지를 입력해주세요." });
  if (text.length > 240)
    return res.status(400).json({ error: "메시지는 240자 이내로 작성해주세요." });

  const r = db.prepare("INSERT INTO messages (nickname, text) VALUES (?, ?)").run(nickname.trim(), text.trim());
  res.json(db.prepare("SELECT * FROM messages WHERE id = ?").get(r.lastInsertRowid));
});

// ── API: Photos ───────────────────────────────────────────────
app.get("/api/photos", (_req, res) => {
  const rows = db.prepare("SELECT * FROM photos ORDER BY created_at ASC").all();
  res.json(rows.map(p => ({ ...p, url: `/uploads/${p.filename}`, by: p.nickname })));
});

app.post("/api/photos", (req, res) => {
  upload.single("photo")(req, res, err => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({ error: "파일 크기는 5MB 이하여야 합니다." });
    if (err)
      return res.status(400).json({ error: err.message });

    const { caption = "", nickname } = req.body ?? {};
    if (!nickname?.trim()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "닉네임이 필요합니다." });
    }
    if (!req.file)
      return res.status(400).json({ error: "사진 파일이 없습니다." });

    // 30-photo limit per person
    const count = db.prepare("SELECT COUNT(*) as n FROM photos WHERE nickname = ?").get(nickname.trim()).n;
    if (count >= 30) {
      fs.unlinkSync(req.file.path);
      return res.status(429).json({ error: "1인당 최대 30장까지 업로드할 수 있습니다." });
    }

    const r = db.prepare("INSERT INTO photos (filename, caption, nickname) VALUES (?, ?, ?)").run(
      req.file.filename, caption.trim(), nickname.trim()
    );
    const photo = db.prepare("SELECT * FROM photos WHERE id = ?").get(r.lastInsertRowid);
    res.json({ ...photo, url: `/uploads/${photo.filename}`, by: photo.nickname });
  });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎬  Wedding Invitation server`);
  console.log(`    http://localhost:${PORT}/Wedding%20Invitation.html\n`);
});
