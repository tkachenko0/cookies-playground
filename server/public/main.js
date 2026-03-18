const output = document.getElementById("output");

function obscure(value) {
  return value.length <= 3 ? "***" : value.slice(0, 3) + "***";
}

function buildTable(title, cookies) {
  const entries = Object.entries(cookies);
  if (entries.length === 0) {
    return `<div class="result-panel"><h3>${title}</h3><p class="empty">No cookies found</p></div>`;
  }
  const rows = entries
    .map(([name, value]) => `<tr><td>${name}</td><td>${obscure(value)}</td></tr>`)
    .join("");
  return (
    `<div class="result-panel"><h3>${title}</h3>` +
    `<table><tr><th>Name</th><th>Value</th></tr>${rows}</table></div>`
  );
}

function renderMessage(text) {
  output.innerHTML = `<p class="message">${text}</p>`;
}

async function setCookies() {
  const res = await fetch("/api/set-cookies");
  const data = await res.json();
  renderMessage(data.message);
}

async function readBoth() {
  const res = await fetch("/api/read-cookies");
  const data = await res.json();

  const raw = document.cookie;
  const clientCookies = raw
    ? Object.fromEntries(raw.split("; ").map((c) => c.split("=")))
    : {};

  output.innerHTML =
    '<div class="result-grid">' +
    buildTable("Server-side", data.receivedCookies) +
    buildTable("Client-side (document.cookie)", clientCookies) +
    "</div>";
}

async function clearCookies() {
  const res = await fetch("/api/clear-cookies");
  const data = await res.json();
  renderMessage(data.message);
}
