import { Router } from 'express';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Poster tracking links.
 *
 * Each poster gets its own QR code pointing at `/go/<slug>` on the API host
 * (e.g. https://api.maizebus.com/go/0). Hitting it appends one JSON line to
 * the click log and 302-redirects to the main site with `?src=<slug>` so the
 * origin survives into any analytics added later.
 *
 * Slugs are plain numbers counting from 0 (see POSTERS.md at the repo root
 * for which number is on which poster). Any slug matching SLUG_PATTERN is
 * accepted so nothing has to be registered ahead of time; "stats" is reserved.
 *
 * GET /go/stats?key=<STATS_KEY> returns per-slug counts as JSON.
 */

const REDIRECT_BASE = (process.env.POSTER_REDIRECT_URL || 'https://www.maizebus.com').replace(/\/+$/, '');
// In production the deploy workflow points this outside the `current/` deploy
// directory so the log survives redeploys (see deploy-backend.yml).
const LOG_PATH = process.env.CLICK_LOG_PATH || path.join(__dirname, '..', 'poster-clicks.jsonl');
const STATS_KEY = process.env.STATS_KEY || '';
const SLUG_PATTERN = /^[A-Za-z0-9_-]{1,32}$/;

interface ClickRecord {
  t: string;      // ISO timestamp
  slug: string;
  ua?: string;    // user agent
  ref?: string;   // referrer, usually absent for QR scans
  ip?: string;
}

fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });

function logClick(record: ClickRecord): void {
  fs.appendFile(LOG_PATH, JSON.stringify(record) + '\n', (err) => {
    if (err) console.error('Failed to write poster click log:', err);
  });
}

function keyMatches(provided: unknown): boolean {
  if (!STATS_KEY || typeof provided !== 'string') return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(STATS_KEY);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function compareSlugs(a: string, b: string): number {
  const na = Number(a);
  const nb = Number(b);
  const aNum = a !== '' && Number.isFinite(na);
  const bNum = b !== '' && Number.isFinite(nb);
  if (aNum && bNum) return na - nb;
  if (aNum) return -1;
  if (bNum) return 1;
  return a.localeCompare(b);
}

export function readStats() {
  const perSlug: Record<string, { count: number; first: string; last: string }> = {};
  let total = 0;

  if (fs.existsSync(LOG_PATH)) {
    for (const line of fs.readFileSync(LOG_PATH, 'utf8').split('\n')) {
      if (!line.trim()) continue;
      let rec: ClickRecord;
      try {
        rec = JSON.parse(line);
      } catch {
        continue;
      }
      total++;
      const entry = perSlug[rec.slug] ?? { count: 0, first: rec.t, last: rec.t };
      entry.count++;
      if (rec.t < entry.first) entry.first = rec.t;
      if (rec.t > entry.last) entry.last = rec.t;
      perSlug[rec.slug] = entry;
    }
  }

  const slugs = Object.fromEntries(
    Object.keys(perSlug).sort(compareSlugs).map((s) => [s, perSlug[s]])
  );
  return { total, slugs, redirectBase: REDIRECT_BASE, logPath: LOG_PATH };
}

const router = Router();

// Must be registered before /:slug so "stats" isn't treated as a poster.
router.get('/stats', (req, res) => {
  if (!STATS_KEY) {
    return res.status(503).json({ success: false, message: 'STATS_KEY is not configured' });
  }
  const provided = req.query.key ?? req.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!keyMatches(provided)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  res.set('Cache-Control', 'no-store');
  res.json(readStats());
});

router.get('/:slug', (req, res) => {
  const slug = String(req.params.slug);
  const target = new URL(REDIRECT_BASE + '/');

  if (SLUG_PATTERN.test(slug)) {
    target.searchParams.set('src', slug);
    logClick({
      t: new Date().toISOString(),
      slug,
      ua: req.get('user-agent') || undefined,
      ref: req.get('referer') || undefined,
      ip: req.get('x-forwarded-for')?.split(',')[0].trim() || req.socket.remoteAddress || undefined,
    });
  }

  // 302 (not 301) so browsers don't cache the hop and skip the log next time.
  res.set('Cache-Control', 'no-store');
  res.redirect(302, target.toString());
});

export default router;
