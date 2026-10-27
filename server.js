const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// On Railway, set UPLOAD_DIR to the path inside your mounted volume,
// for example: /data/uploads. Locally, use the project's uploads folder.
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed."));
  }
});

app.use("/uploads", express.static(uploadDir));

app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/gallery", (_req, res) => res.sendFile(path.join(__dirname, "gallery.html")));

app.post("/upload", upload.array("images", 20), (req, res) => {
  res.json({
    uploaded: (req.files || []).length,
    files: (req.files || []).map(file => `/uploads/${encodeURIComponent(file.filename)}`)
  });
});

app.get("/api/images", (_req, res) => {
  const images = fs.readdirSync(uploadDir)
    .filter(name => /\.(jpe?g|png|gif|webp|bmp|svg|avif)$/i.test(name))
    .map(name => ({ name, url: `/uploads/${encodeURIComponent(name)}` }));
  res.json(images);
});

app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || "Upload failed." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
