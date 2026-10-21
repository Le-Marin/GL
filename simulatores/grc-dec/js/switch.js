function setSwitch(target, inputs) {
  'use strict';
  const qnt = inputs.length / 2;
  const index = (el) => [...el.parentNode.children].indexOf(el);

  target.addEventListener('click', function(e) {
    const trg = e.target;
    if (!trg.matches('.r-switch')) return;

    const force = trg.classList.toggle('_off');
    const i = index(trg.parentNode) - 1;
    const input1 = inputs[i];
    const input2 = inputs[qnt + i];

    input1._off = force;
    input2._off = force;
    input1.disabled = force || input1._none;
    input2.disabled = force || input2._none;

    input1.parentNode.classList.toggle('_off', force);
    input2.parentNode.classList.toggle('_off', force);
    input1._shadow.parentNode.classList.toggle('_off', force);
    input2._shadow.parentNode.classList.toggle('_off', force);
  });
}