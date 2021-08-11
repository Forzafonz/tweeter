/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//A function to check if tweet meets conditions

const checkTweet = function(tweet) {
  let errorMsg = "";
  if (tweet.length === 0) {
    errorMsg = "Tweet cannot be empty. Plese type something and try again";
  } else if (tweet.length > 140) {
    errorMsg = "Tweet cannot be longer than 140 characters";
  }
  if (errorMsg !== "") {
    throwError(errorMsg);
    return false;
  }
  return true;
}

//A Function which will display error:

const throwError = function(errorMsg) {
    $("#error-text").text(errorMsg);
    $("#tweet-text").css('border', '2px solid red');
    $(".error").slideDown({complete: () => {
      $("#tweet-text").on('click', () => {
      $("#tweet-text").css('border', '');
      $(".error").css('display', 'none');});
    }});
}

//A function to make sure that no Cross Site Scripting (XSS) is allowed in tweets

const convertToNonXSS = function (tweet) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(tweet));
  return div.innerHTML;
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
                          <img src = "${convertToNonXSS(input.user.avatars)}" />
                          <span id = 'user-name'>${convertToNonXSS(input.user.name)}<span>
                          </div>
                          <div id = 'handle'>${convertToNonXSS(input.user.handle)}</div>
                        </header>
                          <div>${convertToNonXSS(input.content.text)}</div>
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
    event.preventDefault();
    const tweetText = $( this ).children("textarea").val();
    if (checkTweet(tweetText)) {
      $.post("/tweets", $( this ).serialize())
      .then((res) => loadTweets());
    };
  })

});