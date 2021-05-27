const express = require('express')
const app = express({ dest: 'uploads/' })
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
