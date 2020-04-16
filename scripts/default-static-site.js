
const express = require('express');
const server = express();
const options = {
    index: ['index.html','hostingstart.html']
};

server.use('/', express.static(__dirname, options));

server.get('/*', (req, res) => {
  res.sendFile(__dirname + "/" + options.index[0]);
});

server.listen(process.env.PORT);
