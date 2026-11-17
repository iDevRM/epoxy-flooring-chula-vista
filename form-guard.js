// Blocks form messages that contain links or email addresses (sales pitches).
(function () {
  var LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|co|us|biz|info|app|dev|site|online|xyz|ai|me|ly)\b)/i;
  var EMAIL = /[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}/i;
  var SKIP = /^(email|_replyto|phone|tel)$/i;

  function textFields(form) {
    return Array.prototype.filter.call(
      form.querySelectorAll('textarea, input[type="text"], input:not([type])'),
      function (el) { return !SKIP.test(el.name || ''); }
    );
  }

  function showError(form, msg) {
    var box = form.querySelector('.form-guard-error');
    if (!box) {
      box = document.createElement('p');
      box.className = 'form-guard-error';
      box.setAttribute('role', 'alert');
      box.style.cssText = 'color:#b00020;font-weight:600;margin:10px 0;';
      var btn = form.querySelector('[type="submit"], button');
      btn ? btn.parentNode.insertBefore(box, btn) : form.appendChild(box);
    }
    box.textContent = msg;
  }

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !/formspree\.io/.test(form.action || '')) return;
    var bad = textFields(form).some(function (el) {
      return LINK.test(el.value) || EMAIL.test(el.value);
    });
    if (bad) {
      e.preventDefault();
      showError(form, 'Please remove any links or email addresses from your message. Use the email field for your email.');
    }
  }, true);
})();
