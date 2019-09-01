const Discord = require('discord.js');
const auth = require('./auth');
const { Client, Attachment } = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const fetch = require("node-fetch");
var j = null;
var currentUserPlayingTriviaId = null;
var currentUserPlayingTriviaName = null;
// var firebaseConfig = {
//   apiKey: "AIzaSyCbqP4buk1TSKRo5W884luB6vWiCPPpgJo",
//   authDomain: "triviagamediscord.firebaseapp.com",
//   databaseURL: "https://triviagamediscord.firebaseio.com",
//   projectId: "triviagamediscord",
//   storageBucket: "",
//   messagingSenderId: "695331254426",
//   appId: "1:695331254426:web:8d704d00a62d6d66"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

client = new Client()
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});






client.on('message', message => {
  
  if (message == '.userinfo') {
    message.reply(message.author.id);
    
  }

  if (message == '.scoreboard') {
    message.reply("Will soon be implemented!");
    
  }


  if (message == '.trivia') {
    
  fetch('https://opentdb.com/api.php?amount=1&type=boolean')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
   // message.reply(JSON.stringify(myJson));
   currentUserPlayingTriviaId = message.author.id;
   currentUserPlayingTriviaName = message.author.username;
   message.reply("T or F:\n" + myJson["results"][0]["question"].replace(/&(.*);/g, ""));
   j = myJson;
  });
//replaceall(/&(.*);/g, "")
  } 
  console.log(message + " " + j)
  if(message == 'T' && j != null && message.author.id == currentUserPlayingTriviaId) {
    if(j["results"][0]["correct_answer"] == "True")
    {
      message.reply("Correct!");
    }else{
      message.reply("Incorrect");
    }

    j = null;
  }

  if(message == 'F' && j != null && message.author.id == currentUserPlayingTriviaId) {
    if(j["results"][0]["correct_answer"] == "True")
    {
      message.reply("Incorrect");
    }else{
      
      message.reply("Correct!");
    }

    j = null;
  }
  
});






 
client.login(auth.token);

