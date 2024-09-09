var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var path = require('path');
var indexRouter = require('./routes/index');

var cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/js', express.static(__dirname + '/js'));

app.listen(8080, () => console.log(`http://localhost:${8080} 으로 샘플 앱이 실행되었습니다.`));