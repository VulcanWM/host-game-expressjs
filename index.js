const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var session = require('express-session');
// const { Server } = require("socket.io");
// const io = new Server(server);

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "ejs");

const greek_alphabet = { "Α": "alpha", "α": "alpha", "Β": "beta", "β": "beta", "Γ": "gamma", "γ": "gamma", "Δ": "delta", "δ": "delta", "Ε": "epsilon", "ε": "epsilon", "Ζ": "zeta", "ζ": "zeta", "Η": "eta", "η": "eta", "Θ": "theta", "θ": "theta", "Ι": "iota", "ι": "iota", "Κ": "kappa", "κ": "kappa", "Λ": "lambda", "λ": "lambda", "Μ": "mu", "μ": "mu", "Ν": "nu", "ν": "nu", "Ξ": "xi", "ξ": "xi", "Ο": "omicron", "ο": "omicron", "Π": "pi", "π": "pi", "Ρ": "rho", "ρ": "rho", "Σ": "sigma", "σ": "sigma", "ς": "sigma", "Τ": "tau", "τ": "tau", "Υ": "upsilon", "υ": "upsilon", "Φ": "phi", "φ": "phi", "Χ": "chi", "χ": "chi", "Ψ": "psi", "ψ": "psi", "Ω": "omega", "ω": "omega" }
const all_joinable_ids = []

app.get('/', (req, res) => {
    res.render("home")
});

app.get('/host', (req, res) => {
    var game_id = (Math.floor(Math.random()*90000) + 10000).toString()
    while (all_joinable_ids.includes(game_id)){
        game_id = (Math.floor(Math.random()*90000) + 10000).toString()
    }
    all_joinable_ids.push(game_id)
    res.render("host", {game_id: game_id})
})

app.get('/join', (req, res) => {
    res.render("join_game")
})

app.post('/join', (req, res) => {
    const game_id = req.body.game_id;
    if (all_joinable_ids.includes(game_id)){
        res.redirect("/join/" + game_id)
    } else {
        res.redirect("/join")
    }
})

app.get('/join/:game_id', (req, res) => {
    const game_id = req.params.game_id
    if (all_joinable_ids.includes(game_id)){
        res.render("enter_nickname", {game_id: game_id});
    } else{
        res.redirect("/")
    }
})

app.post('/join/:game_id', (req, res) => {
    const game_id = req.params.game_id
    const nickname = req.body.nickname
    if (all_joinable_ids.includes(game_id)){
        req.session.game_id = game_id
        req.session.nickname = nickname;
        res.redirect("/play")
    } else{
        res.redirect("/")
    }
})

app.get('/play', (req, res) => {
    const game_id = req.session.game_id;
    const nickname = req.session.nickname;
    if (all_joinable_ids.includes(game_id)){
        if (nickname == undefined){
            res.redirect("/join/" + game_id)
        } else {
            res.render("play", {game_id: game_id, nickname: nickname});
        }
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