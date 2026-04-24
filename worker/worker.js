const CAL_URL = 'https://calendar.google.com/calendar/ical/d0b3cdfcbfae917ff338591f7cbbe1da76b7e3e9916e2e46d94e702125864d5f%40group.calendar.google.com/public/basic.ics';
const KV_KEY = 'ics';
const FETCH_TIMEOUT_MS = 8000;
const RETRIES = 3;

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (url.pathname !== '/') {
            return new Response('Not found', { status: 404 });
        }

        const cached = await env.CALENDAR_CACHE.get(KV_KEY);
        if (cached) return icsResponse(cached);

        // Bootstrap path: KV empty (first deploy, never populated). Try once so the site isn't broken
        // before the first cron tick. Steady-state requests never reach this.
        const fresh = await fetchWithRetry();
        if (fresh) {
            ctx.waitUntil(env.CALENDAR_CACHE.put(KV_KEY, fresh));
            return icsResponse(fresh);
        }
        return new Response('Calendar unavailable', { status: 503, headers: corsHeaders() });
    },

    async scheduled(event, env, ctx) {
        const fresh = await fetchWithRetry();
        if (fresh) {
            await env.CALENDAR_CACHE.put(KV_KEY, fresh);
        }
    },
};

async function fetchWithRetry() {
    for (let attempt = 0; attempt < RETRIES; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
            const response = await fetch(CAL_URL, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (response.ok) return await response.text();
        } catch {
            // fall through to retry
        }
        if (attempt < RETRIES - 1) {
            await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        }
    }
    return null;
}

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60',
    };
}

function icsResponse(text) {
    return new Response(text, {
        headers: {
            'Content-Type': 'text/calendar',
            ...corsHeaders(),
        },
    });
}
