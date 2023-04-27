import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'


const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
connectDB()
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',(req,res)=>{
  
  console.log(req.body)
  res.json(req.body)

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
