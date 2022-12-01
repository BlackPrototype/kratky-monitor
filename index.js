const _ = require('lodash')
const express = require('express')
const fs = require('fs');
const config = require('./config')
const app = express()
const { SerialPort } = require('serialport')
const { DelimiterParser } = require('@serialport/parser-delimiter')
const port = config.app.port

app.use('/public', express.static(__dirname + '/public'))

const serialPort = new SerialPort({
  path: config.serial.path,
  baudRate: config.serial.baudRate
})

const parser = serialPort.pipe(new DelimiterParser({ delimiter: '\n' }))

const writeResult = (content) => {
  fs.appendFile(config.result_fn, JSON.stringify(content) + '\n', (err) => {
    if(err) {
      return console.log(err);
    }
    console.log('Write successful!')
  })
}

parser.on('data', (data) => {
  let decodedData = data.toString('ascii') 
  let clearedData = decodedData.split('>>>')
                               .filter(Boolean)
                               .map((elem) => {
                                 return elem.split(':')
                                            .map(o => o.replace(/\s|\r/g, ''))
                               })
  let decodedObj = _.fromPairs(clearedData)
  decodedObj.date = new Date().toISOString()

  console.log(decodedObj)
  writeResult(decodedObj)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
