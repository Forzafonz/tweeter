/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//A function to check if tweet meets conditions

const checkTweet = function(tweet) {

  if (tweet.length === 0) {
    alert("Tweet cannot be empty");
    return false;
  } if (tweet.length > 140) {
    alert("Tweet cannot be longer than 140 characters");
    return false;
  }
  return true;
}

// A function to load all existing tweets from the database
const loadTweets = function(){
  $(".article-tweet").remove();
  $.get('/tweets').then((tweets) => renderTweets(tweets));
}

const createTweetElement = function(input) {

  
// A function to dynamically create HTML/CSS markup to display tweets
  const $tweetBody = `
                    <article class = "article-tweet">
                        <header>
                          <div>
                          <img src = "${input.user.avatars}" />
                          <span id = 'user-name'>${input.user.name}<span>
                          </div>
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

  loadTweets();

// "Catch default event handler for submit button, prevent it and replace with a custom one made with Ajax" 
  $("#tweet-form").submit(function (event) {
    console.log("I am triggered!")
    event.preventDefault();
    const tweetText = $( this ).children("textarea").val();
    if (checkTweet(tweetText)) {
      $.post("/tweets", $( this ).serialize())
      .then((res) => loadTweets());
    };
  })

});