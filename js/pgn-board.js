// Shows a game with PgnViewerJS 1.6 (js/pgnviewer-1.6.11) in the club's style: a bordered box with a
// grey header (players, then "date | ECO | result") like the old viewer, and the mouse wheel over the
// board steps through the moves.
//
//   streathamPgnBoard("board1", { pgnFile: "/assets/news/alan_game.pgn", orientation: "white" });
//   streathamPgnBoard("board1", { pgn: "[Event ...] 1. e4 e5 ..." });
//
// The options are those of PGNV.pgnView, plus pgnFile. Returns a promise.
(function () {
  "use strict";

  var FONT = '"Lucida Grande", Verdana, Arial, "Bitstream Vera Sans", sans-serif';
  var WHEEL_STEP_MS = 60;

  // Value of a PGN tag, or "" when it is missing or unknown ("?")
  function tag(pgn, name) {
    var match = pgn.match(new RegExp('^\\[' + name + ' "([^"]*)"\\]', "m"));
    var value = match ? match[1].trim() : "";
    return value === "?" || value === "????.??.??" ? "" : value;
  }

  function element(css, text) {
    var div = document.createElement("div");
    div.style.cssText = css;
    div.textContent = text;
    return div;
  }

  function header(pgn) {
    var box = element("background-color: #f3f3f3; color: #333; font-family: " + FONT + "; padding: 10px;", "");
    var white = tag(pgn, "White");
    var black = tag(pgn, "Black");
    var rest = [tag(pgn, "Date"), tag(pgn, "ECO"), tag(pgn, "Result")].filter(Boolean).join(" | ");
    if (white || black) {
      box.appendChild(element("font-size: 18px; font-weight: bold;", white + " vs. " + black));
    }
    if (rest) {
      box.appendChild(element("font-size: 80%; font-weight: 500;", rest));
    }
    return box;
  }

  // The wheel moves one move forward or back while the mouse is over the board; the page scrolls
  // as usual when the game cannot move any further in that direction
  function enableWheel(host) {
    var board = host.querySelector(".outerBoard") || host;
    var last = 0;
    board.addEventListener("wheel", function (event) {
      if (!event.deltaY) {
        return;
      }
      var button = document.getElementById(host.id + (event.deltaY > 0 ? "Buttonnext" : "Buttonprev"));
      // The viewer greys a button out ("gray") when the game cannot move that way
      if (!button || button.className.indexOf("gray") !== -1) {
        return;
      }
      event.preventDefault();
      var now = Date.now();
      if (now - last >= WHEEL_STEP_MS) {
        last = now;
        button.click();
      }
    }, { passive: false });
  }

  window.streathamPgnBoard = function (id, config) {
    var box = document.getElementById(id);
    var source = config.pgn !== undefined
      ? Promise.resolve(config.pgn)
      : fetch(config.pgnFile).then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.text();
      });
    return source.then(function (pgn) {
      box.style.border = "2px solid gray";
      box.style.boxSizing = "border-box";
      box.appendChild(header(pgn));
      var host = document.createElement("div");
      host.id = id + "Game";
      host.style.padding = "10px";
      box.appendChild(host);
      var wide = box.clientWidth >= 640;
      var options = Object.assign(
        { locale: "en", pieceStyle: "merida", theme: "blue", layout: wide ? "left" : "top" },
        wide ? { boardSize: "388px" } : {}, // the old viewer's board size
        config,
        { pgn: pgn },
      );
      delete options.pgnFile;
      PGNV.pgnView(host.id, options);
      enableWheel(host);
    });
  };
})();
