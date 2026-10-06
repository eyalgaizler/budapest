// Map links always open in Google Maps.
// On Android another navigation app (Waze) can be set as the default for
// google.com/maps links, so a tap on one opens that app instead. On Android,
// rewrite the tapped link into an intent that names the Google Maps app; if
// Google Maps is not installed, Chrome opens the same link on the web instead.
// iPhone and desktop keep the plain https link, which Google Maps already owns.
(function () {
  if (!/Android/i.test(navigator.userAgent)) return;
  var MAPS = /^https:\/\/(www\.google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl)\//i;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !MAPS.test(a.href)) return;
    var web = a.href;
    a.href = 'intent://' + web.replace(/^https:\/\//i, '') +
      '#Intent;scheme=https;package=com.google.android.apps.maps;S.browser_fallback_url=' +
      encodeURIComponent(web) + ';end';
    a.removeAttribute('target');
  }, true);
})();
