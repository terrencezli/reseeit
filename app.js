var express = require('express');
var path = require('path');
var app = express();

var index = require('./routes/index');
var tasks = require('./routes/tasks');

app.use(express.static(__dirname + '/src/'));
app.set('view engine', 'html');
app.use('/', index);
app.use('/api', tasks);

app.listen(3000);
console.log('Listening on port 3000...');
