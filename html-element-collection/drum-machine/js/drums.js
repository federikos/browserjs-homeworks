'use strict';

const drumKits = document.querySelectorAll('.drum-kit__drum');

drumKits.forEach((li) => {
  const player = li.querySelector('audio');
  li.addEventListener(
    'click',
    () => player.play(),
  );
});
