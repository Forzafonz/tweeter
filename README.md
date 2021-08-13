# Tweeter Project:

Tweeter is a simple, single-page Twitter clone. It has the following features: 

1. A new tweet form slides up and down when the `arrow button` in the top left corner is pressed
2. Tweet form dynamically update a number of characters in entered text. By default the maximum number of chars is `140`.
3. If a number of entered character is not between `1` and `140` an error message will slide up when trying to submit a tweet. 
4. The error message will slide down only after an error has been fixed.
5. After each tweet submission a new tweet will appear on top of existing tweets.
6. A `scroll to top` button will appear if a viewport (i.e. screen) no longer displays tweeter area
7. Web-site is responsive and will change layout if a screen width is below treshold.

# Dependencies:

* `Node.js`
* `Express`
* `Ajax`
* `JQuery`
* `Chance`
* `Body Parser`
* `Font Awesome` (for incons)
* `Nodemon` (development only)

# Getting Started

1. Clone repository in your local folder: `git clone git@github.com:Forzafonz/tweeter.git tweeter`
1. Switch into tinyApp directory. `cd tweeter`
1. Install all dependencies (using the `npm install` command). 
1. Run the development web server using the `npm start` command.
1. Go to `localhost:8080` in your browser of choice

# Functionality Demonstration:

## New Tweet
![New Tweet](/public/images/New-Tweet.gif)
## Error 1 (tweet is too short):
![Error1](/public/images/Error1.gif)
## Error 1 (tweet is too long):
![Error2](/public/images/Error2.gif)
## Scroll Up Button:
![Scroll Up Button](/public/images/Scroll-Up-Button.gif)
## General Functionality:
![General Functionality](/public/images/General-Functionality.gif)