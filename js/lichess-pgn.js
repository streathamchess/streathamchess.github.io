// Draws the boards for _includes/lichess_pgn.html with js/pgn-board.js (PgnViewerJS 1.6).
(function () {
  "use strict";

  function fetchText(url) {
    return fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      return response.text();
    });
  }

  // Try the saved copy first, then Lichess itself
  function load(box) {
    var urls = [box.dataset.src, box.dataset.fallback].filter(function (url, i, all) {
      return all.indexOf(url) === i;
    });
    return urls.slice(1).reduce(function (attempt, url) {
      return attempt.catch(function () {
        return fetchText(url);
      });
    }, fetchText(urls[0]));
  }

  // A chapter with no moves (an empty or unfinished chapter in a study) has nothing to show
  function hasMoves(pgn) {
    var moves = pgn.replace(/^\[.*\]\s*$/gm, "").trim();
    return moves !== "" && moves !== "*";
  }

  // A study PGN holds one game per chapter, separated by a blank line before the next [Event tag
  function render(box, text) {
    text.replace(/\r\n/g, "\n").trim().split(/\n\s*\n(?=\[Event )/).filter(hasMoves).forEach(function (pgn, i) {
      var board = document.createElement("div");
      board.id = box.id + "-" + i;
      board.style.cssText = "width: 800px; max-width: 100%; margin-top: 20px; margin-bottom: 20px;";
      box.appendChild(board);
      streathamPgnBoard(board.id, { pgn: pgn }).catch(function () {
        board.textContent = "This game could not be shown.";
      });
    });
  }

  function fail(box) {
    var link = document.createElement("a");
    link.href = box.dataset.link;
    link.textContent = "View it on Lichess";
    box.textContent = "This game could not be loaded. ";
    box.appendChild(link);
  }

  function start() {
    Array.prototype.forEach.call(document.querySelectorAll(".lichess-pgn"), function (box) {
      load(box).then(function (text) {
        render(box, text);
      }).catch(function () {
        fail(box);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
