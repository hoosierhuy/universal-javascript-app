# universal-javascript-app
ReactJS on the front, NodeJS on the server-side, MongoDB for database, and Mongoose for database ORM.

The API server listens on port 3001, the UI on port 3000 (this is a universal JavaScript app after all).

To run this locally on your machine:

 Use Yarn or NPM to install dependencies. I'm experimenting with react-scripts from Facebook, reminds me of Yeoman when I was doing Angular 1 stuff.
 
 Get a free account with mLab (formerly known as MongoLab) or use your own local instance of MongoDB.  Paste in your connection string on line #18 in the server.js file.  I personally created a secrets.js file and import it. I'm obviously not going to include this info in the repo.
 
 "npm run start-dev" will start both the api server and the ui server.  Enjoy.
 
 