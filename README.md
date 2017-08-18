# podder :radio:

Project in course Advanced web programming (TDDD27), given at Linköping University

### Functional specification
This web application shall provide a Podcast-feed for its users. The user can create a profile, and subscribe to Podcasts which will be fetched from iTunes. The subscribed podcast will then be presented in the feed as new episodes arrives.

Note that the application will not do any playing of Podcast, but only provide a space similar to a light weight Instagram shell, but for podcasts. 

### Technological specification

#### Client

The client side is written with React, using Redux.

#### Server

Server side is a Node application, using Express.js. I haven't done any major development in Node before, so the main reason for the choice was about me wanting to become more comfortable in Node. MongoDB will be used for persistent data storage, using Mongoose.

#### Authentication

The application uses JSON Web token for authorization.

#### Building

Babel will be used transpiling of the Javascript, in order to use JSX and ES6. Webpack is used for bundling.



