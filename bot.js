const Discord = require('discord.js');
const fs = require('fs');
const {token,prefix} = require('./config.json');
const cCharacters = "xd"
const client = new Discord.Client();
var data = {}

function saveData(){
	fs.writeFile('data.json',JSON.stringify(data),'utf8',function(err){ if (err) {return console.log(err)}})
}

function loadData(){
	fs.readFile('data.json',function(err,rawdata){
		data = JSON.parse(rawdata)
	})
}

loadData()

client.on('ready',()=> {
	console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message',message => {
	if (!message.author.bot && message.content.includes(cCharacters)){
		if (data[message.author]){
			data[message.author] += 1
		}else{
			data[message.author] = 1
		}
		saveData()
	}

	if (message.content.startsWith(prefix) && !message.author.bot){
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase()
		//console.log(message.guild)
		if (commandName == "count"){
			if (args[0]){
				var guild = message.guild
				if (guild.member(args[0].replace(/[\\<>@#&!]/g, ""))){
					message.channel.send(`They have said ${cCharacters} ${data[args[0]] || 0} times.`)
				}else{
					message.channel.send("User doesn't exist!")
				}
			}else{
				message.channel.send(`You have said ${cCharacters} ${data[message.author] || 0} times.`)
			}
		}
	}
});


client.login(token);
