"use client";

import { ExternalLink, Music, Pause, Play } from "lucide-react";
import { BorderBeam } from "./ui/BorderBeam";
import { useEffect, useState } from "react";

type Track = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string | null;
  songUrl?: string;
  durationMs?: number;
  progressMs?: number;
  error?: string;
};

export default function NowPlayingCard() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
        const json = (await res.json()) as Track;
        if (alive) setTrack(json);
      } catch {
        if (alive) setTrack({ isPlaying: false });
      }
    };
    load();
    const id = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const hasTrack = !!track?.title;
  const progress =
    hasTrack && track.durationMs && track.progressMs
      ? Math.min(100, (track.progressMs / track.durationMs) * 100)
      : hasTrack
        ? 0
        : 32;

  return (
    <a
      href={track?.songUrl ?? "https://open.spotify.com"}
      target="_blank"
      rel="noreferrer noopener"
      className="card p-4 h-full flex flex-col gap-3 group"
    >
      <BorderBeam colorFrom="#a855f7" colorTo="#22d3ee" duration={5000} />
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-neutral-700 via-neutral-800 to-black ring-1 ring-white/10">
          {track?.albumArt ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={track.albumArt}
              alt={track.album ?? ""}
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
              <Music
                size={18}
                className="absolute inset-0 m-auto text-white/60"
                strokeWidth={1.6}
              />
            </>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {track?.isPlaying ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Sonando
              </span>
            ) : (
              <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                {hasTrack ? "Última canción" : "Spotify"}
              </span>
            )}
          </div>
          <p className="text-sm font-medium truncate mt-0.5">
            {track?.title ?? "Conecta tu Spotify"}
          </p>
          <p className="text-xs subtle-text truncate">
            {track?.artist ?? "para mostrar tu música aquí"}
          </p>
        </div>

        <div className="h-9 w-9 rounded-full bg-white/10 group-hover:bg-white/15 border border-white/10 flex items-center justify-center transition shrink-0">
          {track?.isPlaying ? (
            <Pause size={14} fill="currentColor" />
          ) : hasTrack ? (
            <Play size={14} fill="currentColor" className="ml-0.5" />
          ) : (
            <ExternalLink size={14} strokeWidth={1.7} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-[width] duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </a>
  );
}
