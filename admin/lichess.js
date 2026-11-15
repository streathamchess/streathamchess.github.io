// Adds a "Lichess game or study" button to the rich-text editor. The editor pastes a Lichess link
// and this inserts the include that _includes/lichess_pgn.html turns into a board.
(function () {
  "use strict";

  var NOT_GAMES = /^(training|practice|analysis|settings|streamer|insights|tutorial)$/i;

  // Returns {game} or {study, chapter?} for a Lichess link, or null
  function parse(url) {
    var text = String(url || "").trim();
    var m = text.match(/^(?:https?:\/\/)?(?:www\.)?lichess\.org\/study\/([A-Za-z0-9]{8})(?:\/([A-Za-z0-9]{8}))?(?:[/?#].*)?$/);
    if (m) {
      return m[2] ? { study: m[1], chapter: m[2] } : { study: m[1] };
    }
    // A game link has the 8-character game id, optionally followed by 4 characters for the player
    m = text.match(/^(?:https?:\/\/)?(?:www\.)?lichess\.org\/(?:embed\/)?(?:game\/)?([A-Za-z0-9]{8})(?:[A-Za-z0-9]{4})?(?:\/(?:white|black))?(?:[?#].*)?$/);
    return m && !NOT_GAMES.test(m[1]) ? { game: m[1] } : null;
  }

  CMS.registerEditorComponent({
    id: "lichess-game",
    label: "Lichess game or study",
    icon: "sports_esports",
    trigger: "button",
    fields: [
      {
        name: "url",
        label: "Lichess game or study link",
        widget: "string",
        hint: "A game link (https://lichess.org/AbCdEfGh) or a study chapter link (https://lichess.org/study/AbCdEfGh/IjKlMnOp) shows one game. A study link without a chapter shows every chapter. It must be public or unlisted.",
        pattern: ["^\\s*(https?://)?(www\\.)?lichess\\.org/\\S+\\s*$", "Paste a link from lichess.org"],
      },
    ],
    pattern: /^\{% include lichess_pgn\.html (?:game="(?<game>[A-Za-z0-9]*)"|study="(?<study>[A-Za-z0-9]+)"(?: chapter="(?<chapter>[A-Za-z0-9]+)")?) %\}$/m,
    fromBlock: function (match) {
      var g = match.groups;
      if (g.study) {
        return { url: "https://lichess.org/study/" + g.study + (g.chapter ? "/" + g.chapter : "") };
      }
      return { url: g.game ? "https://lichess.org/" + g.game : "" };
    },
    toBlock: function (data) {
      var p = parse(data.url) || {};
      var args = p.study
        ? 'study="' + p.study + '"' + (p.chapter ? ' chapter="' + p.chapter + '"' : "")
        : 'game="' + (p.game || "") + '"';
      return "{% include lichess_pgn.html " + args + " %}";
    },
    toPreview: function (data) {
      var p = parse(data.url);
      if (!p) {
        return "Not a Lichess game or study link yet";
      }
      return "Lichess " + (p.study ? "study " + p.study + (p.chapter ? " chapter " + p.chapter : "") : "game " + p.game) + ": shown as a board on the site";
    },
  });
})();
