(function() {
  'use strict';

  const getSelection = window.getSelection || (() => '');

  prevent('contextmenu');
  prevent('selectstart', function() {
    const selection = getSelection();
    if (selection.type === 'Range') selection.removeAllRanges();
  });

  function prevent(type, callback = Function.prototype, target = document) {
    const propName = 'on' + type;

    target[propName] = function(e) {
      e.preventDefault();
      e.stopPropagation();
      callback(e);
      return false;
    };

    target.addEventListener(type, function(e) {
      e.preventDefault();
      e.stopPropagation();
      callback(e);
    }, true);

    Object.defineProperty(target, propName, {
      get: function() { return null; },
      set: function(v) {},
    });
  }
})();