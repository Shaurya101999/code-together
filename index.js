const express = require('express');
const app = express() ;
const path = require('path')

const expressLayouts = require('express-ejs-layouts');

const port = 5000 ;

const db = require('./config/mongoose');
// for session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// for storing session even if it is restarted 
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

// chat
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer);

let connections = [];

io.on("connect", (socket) => {
  connections.push(socket);
  console.log(`${socket.id} has connected`);

  socket.on("propogate", (data) => {
    connections.map((con) => {
      if (con.id !== socket.id) {
        con.emit("onpropogate", data);
      }
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} is disconnected`);
    connections = connections.filter((con) => con.id !== socket.id);
  });
});
//

app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(session({
    name: 'code-together',
    secret: 'code',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect Mongo setup okay')
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log(`Server is running on port : ${port} `);
});