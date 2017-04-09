# podder :radio:

## Specification
Project in course Advanced web programming (TDDD27), given at Linköping University

### Functional specification
This web application shall provide a Podcast-feed for its users. The user can create a profile, and subscribe to Podcasts which will be fetched from iTunes. The subscribed podcast will then be presented in the feed as new episodes arrives. For each podcast, the user can potentially like the episode. User should also be able to friend each other, and then friend's likes will also take place in the feed. The users should be able to browse each other's subscriptions, to find inspiration regarding what to listen to.

Note that the application will not do any playing of Podcast, but only provide a space where users can see each other's favorite podcast, and interact with new episode in form of likes, and potentially comments.  

### Technological specification

#### Client

The client side will be written with React, and using Redux.

#### Server

Server side will be a Node-app, using Express.js. I haven't done any major development in Node before, so the main reason for the choice is about me wanting to be more comfortable in Node. Also, I guess the possibility to render React-component server side could be interesting to experiment with as well. MongoDB will be used for data storage. It seems to play well with Node, and a lot of good tutorials and such.

#### Building and testing

Babel will be used transpiling of the Javascript, in order to use JSX and ES6. Webpack will be used for bundling. Want to include some testing as well, but not sure how ambitiously yet.



