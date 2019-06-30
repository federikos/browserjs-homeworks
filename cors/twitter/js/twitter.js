'use strict';

const body = document.getElementsByTagName('body')[0];
const externalScript = document.createElement('script');
externalScript.src = 'https://neto-api.herokuapp.com/twitter/jsonp?callback=getData';

body.appendChild(externalScript);

const dataWallpaper = document.querySelector('[data-wallpaper]');
const dataUsername = document.querySelector('[data-username]');
const dataDescription = document.querySelector('[data-description]');
const dataPic = document.querySelector('[data-pic]');
const dataTweets = document.querySelector('[data-tweets]');
const dataFollowers = document.querySelector('[data-followers]');
const dataFollowing = document.querySelector('[data-following]');

function getData(data) {
  dataWallpaper.src = data.wallpaper;
  dataUsername.innerText = data.username;
  dataDescription.innerText = data.description;
  dataPic.src = data.pic;
  dataTweets.innerText = data.tweets;
  dataFollowers.innerText = data.followers;
  dataFollowing.innerText = data.following;
}