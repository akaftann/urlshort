import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import Url from './Url.js'
import dns from 'dns'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
connectDB()
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req,res,next)=>{
  let url
  try{
    url = req.body.url
  }catch(e){
    console.log('url is empty', req.body)
    next()
  }
  if(url){
    console.log(url)
    dns.lookup(url.replace(/^https?:\/\//,''),(err, adr, fam)=>{
      if(err){
        res.json({ error: 'invalid url' })
        return
      }
    })
  }
  next()
})
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async (req,res)=>{
  const {url} = req.body
  const base = process.env.BASE
  let urlNew = await Url.findOne({originUrl: url})
  if(urlNew){
    res.json({original_url: urlNew.originUrl, short_url: urlNew.urlId})
    return
  }
  const urlId = (getRandomInt(1, 1000)).toString();
  const shortUrl = `${url}/${urlId}`
  urlNew = new Url({
    urlId: urlId,
    originUrl: url,
    shortUrl: shortUrl
  })
  await urlNew.save()
  res.json({original_url: urlNew.originUrl, short_url: urlNew.urlId})
})

app.get('/api/shorturl/:urlId', async (req,res)=>{
  const {urlId} = req.params
  const result = await Url.findOne({urlId})
  if(result){
    return res.redirect(result.originUrl)
  }else res.status(404).json('Not found')
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
