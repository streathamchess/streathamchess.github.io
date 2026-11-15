---
title: Lichess embed test (temporary)
layout: default
sitemap: false
---

Temporary test page for the Lichess embed, to be deleted.

A single game:

{% include lichess_pgn.html game="37hDahEv" %}

One chapter of a study:

{% include lichess_pgn.html study="Zwqt6BdF" chapter="TFFN2q5c" %}

An empty include (must render nothing):

{% include lichess_pgn.html game="" %}

The end.
