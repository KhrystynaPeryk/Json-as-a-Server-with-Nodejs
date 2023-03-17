const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const data = require('./data.json');

const server = http.createServer(app);
const fs = require('fs');

const port = process.env.PORT || 3001;
require('dotenv').config();

app.use(express.json())
app.use(
    cors({
        origin: [process.env.ORIGIN],
    })
)

app.post('/dashboard/update', async (req, res, next) => {
    console.log(req.body)
  // Read the data from data.json
    const rawData = fs.readFileSync('data.json');
    const data = JSON.parse(rawData);

  // Update the object with the given key
    const key = Object.keys(req.body)[0]; // get the key of the object
    data[key] = req.body[key];

  // Write the updated data back to data.json
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

  // Send a response back to the client
    res.send('Data updated successfully');
})

app.get('/dashboard', async (req, res, next) => {
    console.log('Hello from Dashboard!')
    res.send(data);
});


server.listen(port, () => console.log('Listening on port 3001'));