# lizseslerbeckman.com

Portfolio site for Liz Sesler-Beckman, pianist in Erie, PA. Built with React + Vite, hosted on GitHub Pages.

## Development

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

## Deployment

Deployment is automatic — **just push to `main`**. GitHub Actions will build the site and deploy it to GitHub Pages. You can monitor deploys in the Actions tab of the repository.

GitHub Pages is configured to deploy via GitHub Actions (Settings → Pages → Source: GitHub Actions).

## Calendar

Upcoming gigs are pulled from a public Google Calendar iCal feed, proxied through a Cloudflare Worker at `weathered-mode-3913.wbeckman91715.workers.dev` to handle CORS. No API key required — the calendar is public. If the Worker ever needs to be updated, log in to dash.cloudflare.com → Workers & Pages.
