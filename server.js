const fs = require('fs')
const configureFile = require('./configureFile');
const initServer = (options) => {
  fs.stat('resonance.json',(err, status)=>{
    if(err){
      configureFile(null, server);
    }
    if(!err){
        server()
    }
  })

}

const server = ()=>{
    var config = require(process.cwd()+'/resonance.json');
    var io = require('socket.io')(config.port)
    var redis = require('redis')

    var sub = redis.createClient();

    var chans = config.channels.map(function(chan){
        var chan = io.of('/'+chan)
        return chan
    })

    sub.on("message",function(channel, data){
        var message = JSON.parse(data)
        chans.map(function(chan){
            if(chan.name == '/'+channel){
                chan.emit(message.event, message.music)
            }
        })
    });
    config.channels.map(function(chan){
        sub.subscribe(chan)
    })
    console.log('Serving on port '+config.port)
}
module.exports = exports = initServer
