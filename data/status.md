# Status (morning run 2026-11-15 03:20 London, Claude)
- Health: 14 Nov posted 3/4 (vasa, stink, celeste); 20:30 slot missed: gertie, mincemeat, kashasha all hit upload 400/processing timeout; window closed 22:00. No needs_reconcile or stale rows; flagger clean. READY stock 7 (all gate READY) but 5 have failed uploads before (ladder-cam, wow-signal, synod, gertie, mincemeat); fresh: kashasha (1 fail), gimli.
- Fix today: publish.py re-encodes a Reel to a Meta-safe profile after its first failure (tested locally with ffmpeg). Evening watchdog must check whether it worked; if not, build new Reels with an alternate encode in make-reel.
- Not done this run: new Reels and trend research (stock covers the 4 slots). Unchanged: 52nd style missing; last-biscuit unapproved.
