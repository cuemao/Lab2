const tessel = require('tessel');
const ambient = require('ambient-attx4').use(tessel.port['A']);
const path = require('path');
const av = require('tessel-av');
const socket = require('socket.io-client')('http://192.168.1.187:3000');

console.log('start');
socket.on('ServerReady', function(){
   ambient.on('ready',function(){
      setInterval(function(){
         var sd;
         var ld;
         ambient.getSoundLevel(function(err,sounddata){
            if(err) throw err;
            sd = sounddata.toFixed(8);
            ambient.getLightLevel(function(err, lightdata){
               if(err) throw err;
               ld  = lightdata.toFixed(8);
               console.log('sound: '+sd+', light: '+ld);
               socket.emit('Push',[sd,ld]);
            });
         });
      },1000);
   });
   
   ambient.on('error', function(err){
      console.log(err);
   });


});

const sound = new av.Speaker('/root/Sherlock-TheGameIsOn.mp3');
var PlayStatus = false;

socket.on('Play', function(){
    console.log('tessel play');
    if(!PlayStatus){
        sound.play();
        PlayStatus = true;
    };
});

socket.on('Stop', function(){
    PlayStatus = false;
    sound.stop();
});

sound.on('empty',function(){
    PlayStatus = false;
});
