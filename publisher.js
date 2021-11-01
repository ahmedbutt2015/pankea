express = require('express')
const asyncHandler = require('express-async-handler')
const {publishData} = require('./publishData')

const app = express();
let topics = new Map();
topics.set('topic1',[]);
topics.set('topic2',[]);

const port = 8000

app.use(express.json())
app.post('/',(req,res)=> {
  console.log("data ",req.body)
})
app.post('/publish/:topic',asyncHandler(async (req, res) => {
  if (req.body.msg)
  {
    try
    {
      let subscribers = topics.get(req.params.topic)
      const msg = await publishData(subscribers,req.params.topic,req.body.msg)
      res.status(200).send({"url":req.params.topic,"msg":msg})
    }
    catch(exp)
    {
      res.status(400).send({"url":req.params.topic,"error":exp})
    }
  }
  else
    res.send({"url":req.params.topic,"error":"msg is missing"});
}))
app.post('/subscribe/:topic', (req, res) => {
  if (req.body.url)
  {
    if (!topics.has(req.params.topic))
    {
      res.send({"error":"topic is missing"});
    }
    else
    {
      let subscribers = topics.get(req.params.topic)
      subscribers.push(req.body.url)
      topics.set(subscribers)
      res.send({"url":req.body.url,"topic":req.params.topic})
    }
  }
  else
    res.send({"error":"url is missing"});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
