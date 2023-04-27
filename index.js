import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
const app = express();
import connectDB from './db.js'

// Basic Configuration
const port = process.env.PORT || 3000;
connectDB()
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shortulr',(req,res)=>{
  const {url} = req.body
  console.log(url)

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
