// Draws the boards for _includes/lichess_pgn.html with PgnViewerJS (js/pgnviewer).
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

  // The viewer's PGN parser fails on the commands Lichess puts in study comments, such as
  // [%anno ...], [%clk ...] and [%csl ...], so they are removed (the saved copies keep them)
  function clean(text) {
    return text.replace(/\[%[^\]]*\]/g, "").replace(/\{\s*\}/g, "");
  }

  // A study PGN holds one game per chapter, separated by a blank line before the next [Event tag
  function render(box, text) {
    clean(text).replace(/\r\n/g, "\n").trim().split(/\n\s*\n(?=\[Event )/).forEach(function (pgn, i) {
      var board = document.createElement("div");
      board.id = box.id + "-" + i;
      board.style.cssText = "width: 800px; max-width: 100%; margin-top: 20px; margin-bottom: 20px;";
      box.appendChild(board);
      try {
        pgnView(board.id, { pgn: pgn, position: "start", locale: "en", pieceStyle: "merida", theme: "chesscom" });
      } catch (error) {
        board.textContent = "This game could not be shown.";
      }
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
