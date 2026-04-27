import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return new NextResponse(
      `<pre>Spotify devolvió error: ${error}</pre>`,
      { status: 400, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  if (!code) {
    return new NextResponse(
      `<pre>Falta el parámetro ?code en la URL.</pre>`,
      { status: 400, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(
      `<pre>Faltan SPOTIFY_CLIENT_ID o SPOTIFY_CLIENT_SECRET en .env.local</pre>`,
      { status: 500, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI ??
    "http://127.0.0.1:3000/api/spotify/callback";
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return new NextResponse(
      `<pre>Error pidiendo token:\n${JSON.stringify(data, null, 2)}</pre>`,
      { status: 400, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  const refreshToken = data.refresh_token as string | undefined;

  return new NextResponse(
    `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Spotify Refresh Token</title>
  <style>
    body { font-family: ui-monospace, monospace; background: #0a0a0a; color: #e6e6e9; padding: 32px; line-height: 1.5; }
    .box { background: #14161c; border: 1px solid #2b2b34; border-radius: 12px; padding: 24px; max-width: 720px; }
    code { background: #1f2128; padding: 2px 6px; border-radius: 4px; word-break: break-all; }
    pre { background: #1f2128; padding: 12px; border-radius: 8px; word-break: break-all; white-space: pre-wrap; }
    h1 { margin-top: 0; }
    .ok { color: #4ade80; }
  </style>
</head>
<body>
  <div class="box">
    <h1 class="ok">✓ Token obtenido</h1>
    <p>Pega esto en tu archivo <code>.env.local</code> y reinicia el server (<code>npm run dev</code>):</p>
    <pre>SPOTIFY_REFRESH_TOKEN=${refreshToken ?? "(no se recibió refresh_token)"}</pre>
    <p style="margin-top:24px">Listo. Tu portafolio empezará a mostrar tu canción actual.</p>
  </div>
</body>
</html>`,
    { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
