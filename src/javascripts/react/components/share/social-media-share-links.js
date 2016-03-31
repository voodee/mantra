import { objectToGetParams } from './utils'


function assertProvided(argument, caller) {
  if (!argument) {
    throw new Error(`Argument not provided for ${caller}.`);
  }
}

function assertIsArray(array, caller) {
  if (!!array && typeof array.contructor === Array) {
    throw new Error(`Expected object to be an array in ${caller}.`);
  }
}

export function facebook(url, title) {
  assertProvided(url, 'facebook');

  return `https://facebook.com/sharer.php` + objectToGetParams({u: url, t: title});
}

export function twitter(url, text, via, hashtags = []) {
  assertProvided(url, 'twitter');
  assertProvided(text, 'twitter');
  assertIsArray(hashtags, 'twitter');

  return `https://twitter.com/share` + objectToGetParams({
    url,
    text,
    via,
    hashtags: hashtags.join(',')
  });
}

export function googlePlus(url) {
  assertProvided(url, 'googlePlus');

  return `https://plus.google.com/share` + objectToGetParams({url});
}

export function vkontakte(url, title, description) {
  assertProvided(url, 'vkontakte');

  return `http://vkontakte.ru/share.php?url` + objectToGetParams({url, title, description});
}