'use strict';

const tracks = [
  'mp3/LA Chill Tour.mp3',
  'mp3/LA Fusion Jam.mp3',
  'mp3/This is it band.mp3',
];

const mediaplayer = document.querySelector('.mediaplayer');
const audio = document.querySelector('audio');
const controls = document.querySelector('.controls');
const title = controls.querySelector('.title');
const playstate = controls.querySelector('.playstate');
const stop = controls.querySelector('.stop');
const next = controls.querySelector('.next');
const back = controls.querySelector('.back');

const playstateClickHandler = () => {
  if (mediaplayer.classList.contains('play')) {
    audio.pause();
    mediaplayer.classList.remove('play');
  } else {
    audio.play();
    mediaplayer.classList.add('play');
  }
};

const stopClickHandler = () => {
  mediaplayer.classList.remove('play');
  audio.pause();
  audio.currentTime = 0;
};

const defineTrackName = src => src.split('').splice(4, (tracks[0].length - 4 - 4)).join('');

const backClickHandler = () => {
  tracks.unshift(tracks.pop());
  const trackName = defineTrackName(tracks[0]);
  title.setAttribute('title', trackName);
  audio.setAttribute('src', tracks[0]);
};

const nextClickHandler = () => {
  tracks.push(tracks.shift());
  const trackName = defineTrackName(tracks[0]);
  title.setAttribute('title', trackName);
  audio.setAttribute('src', tracks[0]);
};

function switchTrack(direction) {
  switch (direction) {
    case 'next':
      tracks.push(tracks.shift());
      break;
    case 'back':
      tracks.unshift(tracks.pop());
      break;
    default:
      break;
  }

  const trackName = defineTrackName(tracks[0]);
  title.setAttribute('title', trackName);
  audio.setAttribute('src', tracks[0]);

  if (mediaplayer.classList.contains('play')) {
    audio.play();
  }
}

playstate.addEventListener('click', playstateClickHandler);
stop.addEventListener('click', stopClickHandler);
back.addEventListener('click', () => switchTrack("back"));
next.addEventListener('click', () => switchTrack("next"));
