/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// A function to dynamically create HTML/CSS markup to display tweets
const createTweetElement = function(input) {
 
  const $tweetBody = `
                    <article class = "article-tweet">
                        <header>
                          <img src = "${input.user.avatars}" />
                          <div id = 'handle'>${input.user.handle}</div>
                        </header>
                          <div>${input.content.text}</div>
                            <hr class = "divider2">
                        <footer>
                          <div>${timeago.format(input.created_at)}</div>
                          <div id = 'icons'> 
                          <i class="fas fa-flag i1 fa-2x"></i>
                          <i class="fas fa-retweet i2 fa-2x"></i>
                          <i class="fab fa-gratipay i3 fa-2x"></i>
                          </div>
                         </footer>
                      </article>`
  return $tweetBody;

}

const renderTweets = function(tweetData) {

  // loops through tweets
  for (const tweet of tweetData) {
  // calls createTweetElement for each tweet
    const newTweet = createTweetElement(tweet)
  // takes return value and appends it to the tweets container
    $(".tweet-container").append(newTweet);
  }
}

$(document).ready(function() {

  renderTweets(tweetData);

// "Catch default event handler for submit button, prevent it and replace with a custom one made with Ajax" 
  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $( this ).serialize()
    });
  })

  const loadTweets = function() {
    $.get('/tweets').then((response) => console.log(response));
  }

  loadTweets();
});