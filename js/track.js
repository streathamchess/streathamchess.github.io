/* Sends a few named events to Google Analytics (GA4) so we can see whether the site brings in joiners:
   join_cta_click   - a link to the "How to join" page
   directions_click - the "Directions and map" button or a Google Maps link
   contact_click    - a link to the Contact page, or an email or phone link
   converter_use    - someone starts typing in the rating converter (once per page view)
   Only the event name, where the link sits on the page and the page it leads to are sent. No email address,
   phone number or anything typed into the converter is ever sent. */
(function () {
  function send(name, params) {
    if (typeof gtag !== 'function') { return; }
    params.transport_type = 'beacon'; // still delivered while the browser leaves the page
    gtag('event', name, params);
  }

  function placement(link) {
    if (link.closest('.invite')) { return 'invite_card'; }
    if (link.closest('#sidebar, .navbar')) { return 'menu'; }
    return 'page_content';
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link) { return; }
    var href = link.getAttribute('href');
    var name = null;
    var target = href.split('?')[0];
    if (/^mailto:|^tel:/i.test(href)) {
      name = 'contact_click';
      target = href.slice(0, href.indexOf(':')); // "mailto" or "tel" only, never the address or number
    } else if (/(^|\/)contact\.html/.test(href)) {
      name = 'contact_click';
    } else if (/google\.com\/maps|\/about\/venues\.html#whitelion/.test(href)) {
      name = 'directions_click';
    } else if (/(^|\/)join\.html/.test(href)) {
      name = 'join_cta_click';
    }
    if (name) { send(name, { link_location: placement(link), link_target: target }); }
  });

  var converterUsed = false;
  document.addEventListener('input', function (e) {
    if (!converterUsed && /^(ecf-now|fide-now|ecf|fide)$/.test(e.target.id)) {
      converterUsed = true;
      send('converter_use', {});
    }
  });
})();
