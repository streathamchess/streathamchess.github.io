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
  The calendar page's text is in the CMS but its events are not: they live in the embedded Google Calendar.
  The converter and calculator pages and the layouts/menu (`_layouts/`, `_includes/`)
  are not in the CMS; edit those as files.
* **Fallback sign-in:** "Sign In Using Access Token" takes a GitHub fine-grained personal access token
  for this repository with Contents: read and write.

### Chess boards

All boards use PgnViewerJS 1.6 (`js/pgnviewer-1.6.11`) through `js/pgn-board.js`, which gives them the club's
style (bordered box, grey header with players, date, ECO and result) and lets the mouse wheel step through the
moves. To show a PGN file from `assets/`, put a placeholder and a call in the post (`board1` is any unique id):

    <div id="board1" style="width: 800px; margin-top: 20px; margin-bottom: 20px;"></div>
    <script>
      streathamPgnBoard('board1', { pgnFile: '/assets/pgn/game.pgn', orientation: 'white' });
    </script>

The layout loads the viewer on any page that contains `streathamPgnBoard(`. The 2017 viewer that was in
`js/pgnviewer` has been removed; it is in the git history if ever needed.

### Adding a Lichess game or study to a post

In the rich-text editor of a news post or page, click the **Lichess game or study** button on the toolbar
and paste a link: a game (`https://lichess.org/AbCdEfGh`), or one chapter of a study
(`https://lichess.org/study/AbCdEfGh/IjKlMnOp`). A study link without a chapter shows every chapter.
The game or study must be public or unlisted. In the raw editor, type the include yourself:
`{% include lichess_pgn.html game="AbCdEfGh" %}`, or `study="..."` with an optional `chapter="..."`.

* **On the page:** `_includes/lichess_pgn.html` leaves a placeholder and `js/lichess-pgn.js` draws the
  board(s) with `js/pgn-board.js`. `_layouts/default.html` loads the scripts when a page uses them.
* **Copies:** after a save, the GitHub Action `.github/workflows/archive-lichess.yml` runs
  `.github/scripts/archive_lichess.py`, which saves each game's PGN to `assets/pgn/lichess/` (a new commit,
  usually within a minute). The page uses that copy, so the game survives being deleted from Lichess.
  Until the copy exists the page reads the game from Lichess directly. A copy is never overwritten.
  To refresh one, delete its file and run the Action manually (Actions > Archive Lichess games > Run workflow).

### How sign-in works

Sveltia CMS needs a small OAuth proxy to offer the GitHub button. Nothing for it lives in this repo
except `base_url` in `admin/config.yml`:

* **Proxy:** [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) deployed as the Cloudflare
  Worker `streatham-cms-auth` (`https://streatham-cms-auth.titorenko.workers.dev`), on the Cloudflare
  account of the GitHub user `titorenko`.
* **GitHub App:** `Streatham Chess CMS Auth`, owned by the `streathamchess` organisation, installed on this
  repository only, permission Contents: read and write. Tokens expire after 8 hours and refresh themselves.
* **Worker settings** (Cloudflare dashboard > Workers > streatham-cms-auth > Settings > Variables and secrets):
  `GITHUB_CLIENT_ID` (the app's Client ID), `GITHUB_CLIENT_SECRET` (secret, a client secret from the app's
  Credentials page) and `ALLOWED_DOMAINS` (`streathamchess.org, www.streathamchess.org`).
* **Rotating the secret:** create a new client secret on the GitHub App's Credentials page, replace
  `GITHUB_CLIENT_SECRET` in the Worker, then delete the old secret on GitHub.
* **Pinned version:** `admin/index.html` loads a fixed Sveltia CMS version from unpkg; change the version
  number there to upgrade.
