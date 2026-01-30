const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
app.use(express.static(path.join(__dirname, "../frontend")));


// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Session Setup -------------------- */

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


/* -------------------- Flash Messages -------------------- */

app.use(flash());

// Make flash messages available everywhere
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

/* -------------------- Routes -------------------- */

app.use("/auth", authRoutes);
app.use("/reports", reportRoutes);
app.use("/admin", adminRoutes);
app.use("/announcements", announcementRoutes);



/* -------------------- Test Route -------------------- */

app.get("/", (req, res) => {
  res.send("EcoTrack API is running");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out");
  });
});


module.exports = app;
