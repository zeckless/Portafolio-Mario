import { NextResponse } from "next/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type SpotifyArtist = { name: string };
type SpotifyImage = { url: string };
type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  album: { name: string; images: SpotifyImage[] };
  external_urls: { spotify: string };
  duration_ms: number;
};

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("missing-credentials");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("token-failed");
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function shape(track: SpotifyTrack, isPlaying: boolean, progressMs?: number) {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumArt: track.album.images[0]?.url ?? null,
    songUrl: track.external_urls.spotify,
    durationMs: track.duration_ms,
    progressMs: progressMs ?? 0,
  };
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const current = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (current.status === 200) {
      const json = (await current.json()) as {
        is_playing: boolean;
        progress_ms: number;
        item: SpotifyTrack | null;
      };
      if (json.item) {
        return NextResponse.json(
          shape(json.item, json.is_playing, json.progress_ms),
          { headers: { "Cache-Control": "no-store, max-age=0" } },
        );
      }
    }

    // Fallback: most recent track
    const recent = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (recent.ok) {
      const json = (await recent.json()) as {
        items: { track: SpotifyTrack }[];
      };
      const last = json.items[0]?.track;
      if (last) {
        return NextResponse.json(shape(last, false), {
          headers: { "Cache-Control": "no-store, max-age=0" },
        });
      }
    }

    return NextResponse.json({ isPlaying: false }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json(
      { isPlaying: false, error: msg },
      { status: msg === "missing-credentials" ? 200 : 500 },
    );
  }
}
