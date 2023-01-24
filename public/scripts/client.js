/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// Test / driver code (temporary). Eventually will get this from the server.


//User Objects
// Fake data taken from initial-tweets.json
// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    return `
  <article class="tweet">
  <header class="tweet-header"> 
      <div>
        <img src=${tweet.user.avatars}>
        ${tweet.user.name}
      </div>
      <span>
      ${tweet.user.handle}
      </span>
  </header>
  <div class="text">
    <textarea>${tweet.content.text}</textarea>
  </div>
  <footer class="tweet-footer">
    <span>${jQuery.timeago(tweet.created_at)}</span>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

const loadTweets = function() {
  $.ajax("/tweets", { method: 'GET'})
  .then(function(data){
    console.log(data)
    renderTweets(data)
  })
}

loadTweets()

// renderTweets(tweetData)

const $form = $('#tweet-form');
$form.on('submit', function (event) { 
  event.preventDefault()
  const data = $('#tweet-text').serialize();
  $.ajax("/tweets", { method: 'POST', data})
  })
})