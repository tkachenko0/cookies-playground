const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const COOKIE_NAMES = [
  "basic",
  "httponly",
  "secure",
  "samesite-strict",
  "samesite-lax",
  "samesite-none",
];

app.get("/api/set-cookies", (_req, res) => {
  res.cookie("basic", "hello", { maxAge: 60_000 });
  res.cookie("httponly", "secret-value", { httpOnly: true, maxAge: 60_000 });
  res.cookie("secure", "https-only", { secure: true, maxAge: 60_000 });
  res.cookie("samesite-strict", "strict-val", {
    sameSite: "strict",
    maxAge: 60_000,
  });
  res.cookie("samesite-lax", "lax-val", { sameSite: "lax", maxAge: 60_000 });
  res.cookie("samesite-none", "none-val", {
    sameSite: "none",
    secure: true,
    maxAge: 60_000,
  });

  res.json({ message: "Cookies set" });
});

app.get("/api/read-cookies", (req, res) => {
  res.json({ receivedCookies: req.cookies });
});

app.get("/api/clear-cookies", (_req, res) => {
  for (const name of COOKIE_NAMES) res.clearCookie(name);
  res.json({ message: "All cookies cleared" });
});

const port = 8181;

app.listen(port, () => console.log(`Server running on port ${port}`));
