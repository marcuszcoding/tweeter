/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// Test / driver code (temporary). Eventually will get this from the server.


//User Objects
// Fake data taken from initial-tweets.json

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
  let tweetValue = $('#tweet-text').val();
  if (tweetValue === "") {
   return alert("This tweet is empty")
  }
  if (tweetValue.length > 140) {
   return alert("This tweet is too long")
  }
  const data = $('#tweet-text').serialize();
  $.ajax("/tweets", { method: 'POST', data})
  })
})