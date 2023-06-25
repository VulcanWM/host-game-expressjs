const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
// const { Server } = require("socket.io");
// const io = new Server(server);

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "ejs");

const all_joinable_ids = ["12345"]

app.get('/', (req, res) => {
    res.render("home")
});

app.get('/join', (req, res) => {
    res.render("join")
})

app.post('/join', (req, res) => {
    let game_id = req.body.game_id;
    if (all_joinable_ids.includes(game_id)){
        res.redirect("/join/" + game_id)
    } else {
        res.redirect("/join")
    }
})

app.get('/join/:game_id', (req, res) => {
    const game_id = req.params.game_id
    if (all_joinable_ids.includes(game_id)){
        // render page where it asks for nickname
        res.send("Enter nickname")
    } else{
        res.redirect("/")
    }
})

app.post('/join/:game_id', (req, res) => {
    const game_id = req.params.game_id
    if (all_joinable_ids.includes(game_id)){
        // set cookies for game id
        // set cookies for username
        // redirect to /play
        res.send("Joining game....")
    } else{
        res.redirect("/")
    }
})

app.get('/play', (req, res) => {
    // get game_id from cookies
    if (all_joinable_ids.includes(game_id)){
        // checks if username is set
        // render page where it shows it's about to start
        res.send("Joining game....")
    } else{
        res.redirect("/")
    }
})


// io.on('connection', (socket) => {
    // console.log('a user connected');
    // socket.on('chat message', (user, msg) => {
    //     io.emit('chat message', user, msg);
    // });
// });

server.listen(3000, () => {
  console.log('listening on *:3000');
});