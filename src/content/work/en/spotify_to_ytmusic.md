---
title: "Spotify to YouTube Music"
summary: "A Python command-line tool for transferring playlists and liked tracks from Spotify to YouTube Music and updating migrated collections."
category: "automation"
stack: ["Python", "Spotify API", "ytmusicapi", "OAuth"]
problem: "Switching music services means manually rebuilding playlists and favorites, which takes time and can leave tracks behind."
solution: "The CLI reads public or private playlists and saved tracks from Spotify, searches for matches on YouTube Music, and manages playlist creation, updates, and removal."
outcome: "A repeatable process for migrating one playlist, every public playlist, or a library of liked songs between the two platforms."
featured: false
order: 7
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/spotify_to_ytmusic"
---

## Migration from the terminal

The project is derived from the open-source `sigma67` tool and documents the changes made in this fork. It supports Spotify credentials and either browser or OAuth authentication for YouTube Music.

## Available operations

Beyond the initial copy, the command can update previously transferred playlists, like corresponding tracks, and remove playlists from the destination.
