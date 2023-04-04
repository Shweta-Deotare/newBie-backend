const app = require('express')();
const bodyParser = require('body-parser');
const db = require('./gateway/databaseGateway');

app.use(bodyParser.json());

// Enable CORS
app.use(function (req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
 next();
});

try {
 db.testConnection();
 console.log('DB connection established...');
} catch (error) {
 console.log('failed DB connection...');
}

app.use('/user', require('./route/account'));

app.get('/', (req, res) => {
 res.send('hello');
})

const PORT = process.env.port || 3000;


app.listen(PORT, () => {
 console.log(`Server is running on ${PORT}`);
})