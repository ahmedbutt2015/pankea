express = require('express')

const app = express();
const port = 9000

app.use(express.json())
app.post('/test1',(req,res)=> {
  console.log("test 1 data received: ",req.body)
  res.status(200).send(req.body)
})
app.post('/test2',(req,res)=> {
  console.log("test 1 data received: ",req.body)
  res.status(200).send(req.body)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
