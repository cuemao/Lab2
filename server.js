const http = require("http");
const socket_io = require('socket.io');
const router = require('./router');
const mariasql = require('mariasql');
console.log('Server starts...')

const server = http.createServer(router.route);
server.listen(3000);

const sql = new mariasql({
  host: '127.0.0.1',
  user: 'guest',
  password: '1234567890',
  db: 'Lab2'
});

const server_io = socket_io.listen(server);
//////////////////


/////////////////
server_io.sockets.on('connection', function(socket)  {
  
  socket.emit('ServerReady')

  socket.on('Fetch',function() {
    let q = 'select * from Data1 order by time desc limit 5 ;';
    sql.query(q, function(error,rows) {
      if(error) throw error;
      socket.emit('Draw', {chartIdx: 0, data: rows});
    });
    q = 'select * from Data2 order by time desc limit 5 ;';
    sql.query(q, function(error,rows) {
      if(error) throw error;
      socket.emit('Draw', {chartIdx: 1, data: rows});
    });
  });

  socket.on('Push', function(Data) {
    let q = 'insert into Data1 value(:value, CURRENT_TIMESTAMP)';
    sql.query(q, {value: Data[0]});
    q = 'insert into Data2 value(:value, CURRENT_TIMESTAMP)';
    sql.query(q, {value: Data[1]});
    let date = new Date();
    let dateStr = date.getFullYear() + '-' + to2digits(date.getMonth()+1) + 
      '-' + to2digits(date.getDate()) + ' ' + to2digits(date.getHours())+ ':' + 
      to2digits(date.getMinutes()) + ':' + to2digits(date.getSeconds());
    socket.broadcast.emit('Update', {value: Data, time: dateStr});
  });
    
});

function to2digits(str) {
  return ('0'+str).slice(-2);
}

sql.end();
