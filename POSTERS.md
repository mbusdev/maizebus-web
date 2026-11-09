# Poster Tracking Links

Each physical poster gets its own QR code pointing at `https://api.maizebus.com/go/<n>`.
Scanning it logs the hit and redirects to maizebus.com, so we can see which posters work.

Slugs are plain numbers counting from 0. Numbers (not location names) because the same
spot will get different designs over time. **Never reuse a number**: when you hang a new
design, take the next unused number and add a row here.

Counts: `https://api.maizebus.com/go/stats?key=<STATS_KEY>` (key is in the GitHub
Actions secrets). Implementation: [`server/src/posterLinks.ts`](server/src/posterLinks.ts).

| Slug | Link | Location | Design / notes | Date hung | Date removed |
|-----:|------|----------|----------------|-----------|--------------|
| 0 | https://api.maizebus.com/go/0 | | | | |
| 1 | https://api.maizebus.com/go/1 | | | | |
| 2 | https://api.maizebus.com/go/2 | | | | |
| 3 | https://api.maizebus.com/go/3 | | | | |
| 4 | https://api.maizebus.com/go/4 | | | | |
