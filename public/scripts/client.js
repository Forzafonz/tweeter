/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}


// A function to dynamically create HTML/CSS markup to display tweets
const createTweetElement = function(input) {

  const tweetBody = `
                    <article class = "article-tweet">
                        <header>
                          <div>${input.user.avatars}</div>
                          <div id = 'handle'>${input.user.handle}</div>
                        </header>
                          <div>${input.content.text}</div>
                            <hr class = "divider2">
                        <footer>
                          <div>${user.created_at}</div>
                          <div id = 'icons'> 
                          <i class="fas fa-flag i1 fa-2x"></i>
                          <i class="fas fa-retweet i2 fa-2x"></i>
                          <i class="fab fa-gratipay i3 fa-2x"></i>
                          </div>
                         </footer>
                      </article>
  `
  return tweetBody;
}


const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); 