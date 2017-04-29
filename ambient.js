var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);
//var path = require('path');
//var av = require('tessel-av');
//var mp3 = path.join(__dirname, 'fairytale.mp3');
//var sound = new av.Speaker(mp3);
socket = require('socket.io-client')('http://localhost:3000');

socket.on('ServerReady', function(){
   ambient.on('ready',function(){
      setInterval(function(){
         var sd;
         var ld;
         ambient.getSoundLevel(function(err,sounddata){
            if(err) throw err;
            sd = sounddata.toFixed(8);
         });
         ambient.getLightLevel(function(err, lightdata){
            if(err) throw err;
            ld  = lightdata.toFixed(8);
         });
         console.log('sound: '+sd+', light: '+ld);
         socket.emit('Push',[sd,ld]);
      });
   },5000);
   ambient.on('error', function(err){
      console.log(err);
   });
});
