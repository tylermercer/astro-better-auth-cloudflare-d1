# Astroflare

An opinionated starter for Astro on Cloudflare, based on the setup I use for [Innerhelm](https://innerhelm.com), [Evelyn Escobar Art](https://evelynescobar.art), [my personal site](https://tylermercer.net), and other projects.

- Deploys to Cloudflare's global edge network
- Uses GitHub actions for its deploy pipeline, powering daily builds and PR previews.
- Uses the [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) adapter and Astro's new intelligent `static` build mode. This allows you to opt-in to SSR on a per-route basis by adding `export const prerender = false` to a route.
- Provides other niceties to speed up development, outlined [below](#features).

## Getting started

Install dependencies:

```bash
npm install
```

Update the project's `name` in `wrangler.toml`. Commit this change, but don't push yet:

```toml
name = "astroflare" # change this to what you want your Cloudflare project's name to be
```

Build the site and deploy to Cloudflare. Wrangler will prompt you to create the Pages project as part of this step:

```bash
npm run build
npx wrangler pages deploy
```

Configure the following secrets in your repository (Settings > Secrets and Variables > Actions > New Repository Secret):

- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID. You can get this from the Cloudflare URL after logging in (which will be of the form `dash.cloudflare.com/[account-id]`)
- `CLOUDFLARE_API_TOKEN` - A Cloudflare API token with the ability to modify your Pages project
- `GH_PAT` - A [GitHub Personal Access Token](https://github.com/settings/tokens?type=beta) with read-only access to your repo's contents (only necessary for private repos).

Push your repository to Github! You should see a pipeline run appear in the Actions tab of your repository. Once this completes successfully, your project is ready for development.

## Features

### Core folder aliases

The folders in `src` have aliases that make it easy to reference their contents. Instead of needing to import (for example) `../../../utils/foobar.ts` to pull a utility function into a route, you can import `@utils/foobar.ts`, from anywhere in your project.

Aliases are configured for the following directories:

- `assets` - Image and other media files
- `content` - Your Astro Content Collections
- `components` - Reusable components
- `layouts` - Astro layouts
- `pages` - Astro routes
- `utils` - Other utilities. I keep utility functions in this folder, each with their own file.

### Daily builds

Your site will automatically be built and deployed each day at 15:00 UTC. This allows you to do scheduled posts, by filtering out posts with a future date from each build.

**To remove:** Remove the `cron` trigger in `.github/workflows/main.yml`.

### Commit hash logging

`@layouts/Base.astro` invokes the utility function `logCommitHash` (from `@utils`) to log the current build's commit hash on page load. This hash is provided by the deployment pipeline.

**To remove:** Delete `src/utils/logCommitHash.ts`, remove the script tag from `src/layouts/Base.astro`, and delete `PUBLIC_COMMIT_HASH: ${{ ... }}` from `.github/workflows/main.yml`.