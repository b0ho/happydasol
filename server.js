const express = require("express");
const multer  = require("multer");
const Database = require("better-sqlite3");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");
const fs   = require("fs");

const app  = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || ".";
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, "wedding.db"));
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
    nickname   TEXT NOT NULL DEFAULT 'guest',
    ip         TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
try { db.prepare("ALTER TABLE photos ADD COLUMN ip TEXT DEFAULT ''").run(); } catch(_) {}

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

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(jpeg|png|webp|heic|heif)$/.test(file.mimetype);
    cb(ok ? null : new Error("Only image files are allowed (JPG, PNG, WEBP, HEIC)."), ok);
  },
});

app.use(helmet({ contentSecurityPolicy: false }));
app.set("trust proxy", 1);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later." },
});

app.use(globalLimiter);

const HTML_FILE = path.resolve(__dirname, "index.html");
app.get(["/", "/wedding"], (_req, res) => res.sendFile(HTML_FILE));
app.use("/project/assets", express.static("project/assets"));
app.use("/uploads", express.static(UPLOADS_DIR));
app.get("/music/bgm.mp3", (_req, res) => res.sendFile(path.resolve(__dirname, "assets/bgm.mp3")));
app.get("/favicon.ico", (_req, res) => res.status(204).end());

app.use(express.json({ limit: "10kb" }));

const adminAuth = (req, res, next) => {
  if (req.headers["x-admin-token"] !== process.env.ADMIN_TOKEN)
    return res.status(403).json({ error: "Forbidden" });
  next();
};
app.get("/api/admin/messages", adminAuth, (_req, res) => {
  res.json(db.prepare("SELECT id, nickname, text, created_at FROM messages ORDER BY id").all());
});
app.patch("/api/admin/messages/:id", adminAuth, (req, res) => {
  const { nickname, text } = req.body ?? {};
  if (!nickname?.trim() && !text?.trim())
    return res.status(400).json({ error: "nickname or text required." });
  if (nickname?.trim()) db.prepare("UPDATE messages SET nickname = ? WHERE id = ?").run(nickname.trim(), req.params.id);
  if (text?.trim()) db.prepare("UPDATE messages SET text = ? WHERE id = ?").run(text.trim(), req.params.id);
  res.json(db.prepare("SELECT * FROM messages WHERE id = ?").get(req.params.id));
});
app.delete("/api/admin/messages/:id", adminAuth, (req, res) => {
  db.prepare("DELETE FROM messages WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});
app.get("/api/admin/photos", adminAuth, (_req, res) => {
  res.json(db.prepare("SELECT id, nickname, caption, filename, created_at FROM photos ORDER BY id").all());
});
app.patch("/api/admin/photos/:id", adminAuth, (req, res) => {
  const { caption, nickname } = req.body ?? {};
  if (caption !== undefined) db.prepare("UPDATE photos SET caption = ? WHERE id = ?").run(caption.trim(), req.params.id);
  if (nickname?.trim()) db.prepare("UPDATE photos SET nickname = ? WHERE id = ?").run(nickname.trim(), req.params.id);
  res.json(db.prepare("SELECT * FROM photos WHERE id = ?").get(req.params.id));
});
app.delete("/api/admin/photos/:id", adminAuth, (req, res) => {
  const photo = db.prepare("SELECT filename FROM photos WHERE id = ?").get(req.params.id);
  if (photo) {
    try { fs.unlinkSync(path.join(UPLOADS_DIR, photo.filename)); } catch(_) {}
    db.prepare("DELETE FROM photos WHERE id = ?").run(req.params.id);
  }
  res.json({ ok: true });
});

app.get("/api/messages", (_req, res) => {
  res.json(db.prepare("SELECT * FROM messages ORDER BY created_at ASC").all());
});

app.post("/api/messages", writeLimiter, (req, res) => {
  const { nickname, text } = req.body ?? {};
  if (!nickname?.trim() || !text?.trim())
    return res.status(400).json({ error: "Please enter a name and message." });
  if (nickname.length > 40)
    return res.status(400).json({ error: "Nickname too long." });
  if (text.length > 500)
    return res.status(400).json({ error: "Message must be 500 characters or fewer." });

  const r = db.prepare("INSERT INTO messages (nickname, text) VALUES (?, ?)").run(nickname.trim(), text.trim());
  res.json(db.prepare("SELECT * FROM messages WHERE id = ?").get(r.lastInsertRowid));
});

app.get("/api/photos", (_req, res) => {
  const rows = db.prepare("SELECT * FROM photos ORDER BY created_at ASC").all();
  res.json(rows.map(p => ({ ...p, url: `/uploads/${p.filename}`, by: p.nickname })));
});

app.post("/api/photos", writeLimiter, (req, res) => {
  upload.single("photo")(req, res, err => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({ error: "File must be 5MB or smaller." });
    if (err)
      return res.status(400).json({ error: err.message });

    if (!req.file)
      return res.status(400).json({ error: "No photo file provided." });

    const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    const { caption = "" } = req.body ?? {};

    const count = db.prepare("SELECT COUNT(*) as n FROM photos WHERE ip = ?").get(ip).n;
    if (count >= 30) {
      fs.unlinkSync(req.file.path);
      return res.status(429).json({ error: "Upload limit reached (30 photos per person)." });
    }

    const r = db.prepare("INSERT INTO photos (filename, caption, nickname, ip) VALUES (?, ?, 'guest', ?)").run(
      req.file.filename, caption.trim(), ip
    );
    const photo = db.prepare("SELECT * FROM photos WHERE id = ?").get(r.lastInsertRowid);
    res.json({ ...photo, url: `/uploads/${photo.filename}`, by: photo.nickname });
  });
});

app.listen(PORT, () => {
  console.log(`\n🎬  http://localhost:${PORT}\n`);
});
