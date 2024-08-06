const express = require('express')
const app = express()
const cors = require('cors'); 

app.use(cors());

app.use(express.json())
app.use(require('./routes/produtoRoute'))

app.listen(3000, () => {
  console.log('server running on port 3000')
})
