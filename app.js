const express = require('express');
const app = express();
const proxy = require('express-http-proxy');

app.get('/', (req, res) => {
    res.end('success')
})

app.get('/papers/*', proxy('http://10.0.7.18:9200'))

app.listen(3002, function() {
    console.log('server is running on port 3002')
})
