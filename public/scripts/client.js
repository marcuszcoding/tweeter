/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// Test / driver code (temporary). Eventually will get this from the server.


//User Objects
// Fake data taken from initial-tweets.json

const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  const errorBox = $('.error');
  errorBox.hide();
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
    <textarea>${escapeText(tweet.content.text)}</textarea>
  </div>
  <footer class="tweet-footer">
    <span>${jQuery.timeago(tweet.created_at)}</span>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
  </article>`;
  };

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.ajax("/tweets", { method: 'GET'})
      .then(function(data) {
        renderTweets(data);
      });
  };

  loadTweets();

  const errorHandler = function(error) {
    errorBox.slideDown("slow");
    $('.error-message').text(error);
  };

  const $form = $('#tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    let tweetValue = $('#tweet-text').val();
    if (tweetValue === "") {
      errorHandler("Error! This tweet is empty! Please enter something to tweet!");
      return;
    }
    if (tweetValue.length > 140) {
      errorHandler("Error! This tweet is too long! Please keep it under 140 characters!");
      return;
    }
    const data = $('#tweet-text').serialize();
    $.ajax("/tweets", { method: 'POST', data})
      .then(function(data) {
        errorBox.slideUp();
        loadTweets();
        $('#tweet-form').trigger("reset");
        $('.counter').val(140);
      });
  });
});