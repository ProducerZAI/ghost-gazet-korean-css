(function() {
function placeWidget() {
  var subscribeBtn = document.querySelector('a[href="/signup/"]');
  if (!subscribeBtn || !subscribeBtn.parentElement) return false;
  if (document.querySelector('.gtranslate_wrapper')) return true;
  var wrapper = document.createElement('div');
  wrapper.className = 'gtranslate_wrapper';
  subscribeBtn.after(wrapper);
  return true;
}
  if (!placeWidget()) {
    var observer = new MutationObserver(function() {
      if (placeWidget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function buildMenu() {
    var wrapper = document.querySelector('.gtranslate_wrapper');
    if (!wrapper || wrapper.querySelector('.gt-flag-menu')) return false;
    var current = wrapper.querySelector('a.glink.gt-current-lang');
    var others = Array.from(wrapper.querySelectorAll('a.glink:not(.gt-current-lang)'));
    if (!current || others.length === 0) return false;

    var menu = document.createElement('div');
    menu.className = 'gt-flag-menu';
    others.forEach(function(a) { menu.appendChild(a); });
    wrapper.appendChild(menu);

    current.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      wrapper.classList.toggle('gt-open');
    });

    document.addEventListener('click', function(e) {
      if (!wrapper.contains(e.target)) wrapper.classList.remove('gt-open');
    });

    return true;
  }

  if (!buildMenu()) {
    var menuObserver = new MutationObserver(function() {
      if (buildMenu()) menuObserver.disconnect();
    });
    menuObserver.observe(document.body, { childList: true, subtree: true });
  }
})();
