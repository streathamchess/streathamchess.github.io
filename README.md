Streatham & Brixton Chess Club Website

[Live Website](http://streathamchess.org)


To start locally with incremental build
       
        sudo apt-get install ruby-all-dev
        sudo gem install bundler
        bundle install
        rake watch
        open http://127.0.0.1:4000

For details see https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/ 

## Editing the site (Sveltia CMS)

Open <https://streathamchess.org/admin/> and choose **Sign In with GitHub**. Saving commits straight to
`master`, and GitHub Pages rebuilds the site (about a minute).

* **Who can edit:** anyone with write access to this repository
  (Settings > Collaborators and teams). Anyone else can sign in but cannot save.
* **What can be edited:** `admin/config.yml` defines two collections.
  *Blog* is `_posts/` (add, edit, delete news posts). *Pages* is a fixed list of site pages
  (edit only). Pages with HTML or Liquid tags (`{% ... %}`) open in the raw editor first so they stay intact.
  The calendar, the converter and calculator pages and the layouts/menu (`_layouts/`, `_includes/`)
  are not in the CMS; edit those as files.
* **Fallback sign-in:** "Sign In Using Access Token" takes a GitHub fine-grained personal access token
  for this repository with Contents: read and write.

### How sign-in works

Sveltia CMS needs a small OAuth proxy to offer the GitHub button. Nothing for it lives in this repo
except `base_url` in `admin/config.yml`:

* **Proxy:** [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) deployed as the Cloudflare
  Worker `streatham-cms-auth` (`https://streatham-cms-auth.titorenko.workers.dev`), on the Cloudflare
  account of titorenko@gmail.com.
* **GitHub App:** `Streatham Chess CMS Auth`, owned by the `streathamchess` organisation, installed on this
  repository only, permission Contents: read and write. Tokens expire after 8 hours and refresh themselves.
* **Worker settings** (Cloudflare dashboard > Workers > streatham-cms-auth > Settings > Variables and secrets):
  `GITHUB_CLIENT_ID` (the app's Client ID), `GITHUB_CLIENT_SECRET` (secret, a client secret from the app's
  Credentials page) and `ALLOWED_DOMAINS` (`streathamchess.org, www.streathamchess.org`).
* **Rotating the secret:** create a new client secret on the GitHub App's Credentials page, replace
  `GITHUB_CLIENT_SECRET` in the Worker, then delete the old secret on GitHub.
* **Pinned version:** `admin/index.html` loads a fixed Sveltia CMS version from unpkg; change the version
  number there to upgrade.
