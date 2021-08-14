//A function to check if tweet meets conditions

const checkTweet = function(tweet) {
  let errorMsg = "";
  if (tweet.length === 0) {
    errorMsg = "Tweet cannot be empty. Plese type something and try again!!!";
  } else if (tweet.length > 140) {
    errorMsg = "Tweet cannot be longer than 140 characters!!!";
  }
  if (errorMsg !== "") {
    throwError(errorMsg);
    return false;
  }
  return true;
};

//A Function which will display error:

const throwError = function(errorMsg) {
  $("#error-text").text(errorMsg);
  $("#tweet-text").css('border', '2px solid red');
  $(".error").slideDown({complete: () => {
    //Event listener which will hide error if user clicked on textarea
    $("#tweet-text").on('keyup', () => {

      if ($("textarea").val().length >= 0 && $("textarea").val().length < 141) {
        $("#tweet-text").css('border', '');
        $(".error").slideUp("slow");

      }
    });
  }});
};

//A function to make sure that no Cross Site Scripting (XSS) is allowed in tweets

const convertToNonXSS = function(tweet) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(tweet));
  return div.innerHTML;
};

// A function to load all existing tweets from the database
const loadTweets = function() {
  $(".article-tweet").remove();
  $.get('/tweets')
  .then((tweets) => renderTweets(tweets));
};

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
                      </article>`;
  return $tweetBody;

};


//A function to create tweets: 

const renderTweets = function(tweetData) {
  let appendTweets ='';
  // loops through tweets
  for (const tweet of tweetData) {
  // calls createTweetElement for each tweet
    const newTweet = createTweetElement(tweet);
    appendTweets = newTweet.concat(appendTweets);
  }
   // takes return value and appends it to the tweets container
   $(".tweet-container").append(appendTweets);
};

//Once document is ready begin listening:

$(document).ready(function() {

  loadTweets();

  // "Catch default event handler for submit button, supress it and replace with a custom one made with Ajax"
  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const tweetText = $(this).children("textarea").val();
    if (checkTweet(tweetText)) {
      $.post("/tweets", $(this).serialize())
      .then((res) =>  {
        $.get('/tweets')
        .then((tweets) => {
          console.log($(".tweet-container").children(':eq(1)'))
          $(".tweet-container").children(':eq(1)').before(createTweetElement(tweets[tweets.length - 1]));
        });
      })
      .then((res) => {
        $(this).children("textarea").val('');
        $(this).children("textarea").attr("placeholder", "What are you humming about?")
        $(this).children(".control").children("#text").val('140');
      });
    };
  });

  // An event listener which catches a click on write a new tweet arrow and navigates user to write twitter forms
  $(".arrow").on("click", () => {

    if ($("#tweet-form").css('display') === 'none') {

      $("#tweet-form").slideDown("slow");
      $("html, body").animate({
        scrollTop: $("#tweet-form").offset().top,
        specialEasing: {
          width: "linear",
          height: "easeOutBounce"
        }}, 'slow');
        $("#tweet-text").focus(focusHandler());
      } else {
        $("#tweet-form").slideUp("slow");
      }
  });

  //A function to check if tweet area is in view point of a user
  const isInViewport = function() {

    let elementTop = $("#tweet-text").offset().top;
    let elementBottom = elementTop + $("#tweet-text").outerHeight();

    if ($("#tweet-form").css('display') === 'none') {
    
      elementTop = $("nav").offset().top + $("nav").outerHeight();
      elementBottom = $("nav").offset().top + $("nav").outerHeight();
      
    }
    const viewportTop = $(window).scrollTop() + $("#tweet-text").outerHeight();
    const viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

// An event listener on to display/hide button for scorrling to top
  $(window).on('scroll', () => {
    if (!isInViewport()) {
      $("#scroll-to-top").css('display', 'flex');
    } else {
      $("#scroll-to-top").css('display', 'none');
    }
  });

  $("#scroll-to-top").on('click', () => {
    $("html, body").animate({
      scrollTop: 0,
      specialEasing: {
        width: "linear",
        height: "easeOutBounce"
      }}, 'slow');
    $("#tweet-text").focus(focusHandler());
  });

  //Handler for #tweet-text focus:

  const focusHandler = function () {
    $("#tweet-text").focus();
    $("#tweet-text").css('caret-color','white')
  }

  // Event lestener for a click on tweet text area
  $("#tweet-text").on('click', ()=> {
   $("#tweet-text").attr('placeholder', '');
   focusHandler();
  })
  
  // Event listener on a tweet area unfocus:
  $("#tweet-text").on('focusout', ()=> {
    if ($("#tweet-text").val() === '' ) {
      $("#tweet-text").attr('placeholder', 'What are you humming about?');
    }
  });

});