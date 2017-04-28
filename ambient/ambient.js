// Import the interface to Tessel hardware
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);
//var path = require('path');
//var av = require('tessel-av');
//var mp3 = path.join(__dirname, 'fairytale.mp3');
//var sound = new av.Speaker(mp3);
WebSocket = require('ws');
ws = new WebSocket('ws://192.168.1.115:8000');
ws.on('open', function(){
   ambient.on('ready',function(){
      setInterval(function(){
         ambient.getSoundLevel(function(err,sounddata){
            if(err) throw err;
            ambient.getLightLevel(function(err, lightdata){
               if(err) throw err;
               //const array = new Float32Array(2);
               var sd = sounddata.toFixed(8);
               var ld  = lightdata.toFixed(8);
               console.log('sound: '+sd+', light: '+ld);
               ws.send(sd+','+ld);
            });
            
         });
      });
   },5000);
   ambient.on('error', function(err){
      console.log(err);
   });
});
