
'use strict';

const drumKits = document.querySelectorAll('.drum-kit__drum');

for (const li of drumKits) {
  const player = li.querySelector('audio');
  li.addEventListener(
    'click',
    () => player.play(),
  );
}
