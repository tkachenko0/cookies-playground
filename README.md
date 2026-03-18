# Cookies Playground

Hands-on project to explore how different HTTP cookie configurations work.

## Quick Start

```bash
docker compose up --build -d
```

## Flow

1. Open [http://127.0.0.1:8181](http://127.0.0.1:8181)
1. Click "Set Cookies", this sets cookies with different flags (HttpOnly, Secure, SameSite, etc.)
1. Click "Read Cookies"m compare server-side vs client-side to see which cookies are visible to JavaScript
1. Open [http://localhost:8282](http://localhost:8282)
1. Click the navigation link, this performs a top-level navigation to the main server
1. Check the JSON response: `samesite-strict` is missing because the browser blocks Strict cookies when arriving from a different site
1. Now go directly to [http://127.0.0.1:8181/api/read-cookies](http://127.0.0.1:8181/api/read-cookies), `samesite-strict` is present because it's a same-site request
