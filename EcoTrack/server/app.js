const path = require("path");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

const app = express();

/* -------------------- Serve Frontend -------------------- */
app.use(express.static(path.join(__dirname, "../frontend")));

/* -------------------- Body Parsers -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Session -------------------- */
app.use(
  session({
    secret: "ecotrack_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax"
    }
  })
);

/* -------------------- Flash -------------------- */
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

/* -------------------- CORS -------------------- */
app.use(cors({
  origin: "http://localhost:5000",
  credentials: true
}));

/* -------------------- Routes -------------------- */
app.use("/auth", authRoutes);
app.use("/reports", reportRoutes);
app.use("/admin", adminRoutes);
app.use("/announcements", announcementRoutes);

/* -------------------- Home -------------------- */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* -------------------- Uploads -------------------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;