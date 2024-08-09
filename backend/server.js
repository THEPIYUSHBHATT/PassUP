import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import bodyparser from 'body-parser'
import cors from 'cors'

import { MongoClient } from 'mongodb'
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'passup'
const app = express()
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000

app.use(bodyparser.json())
app.use(cors())

client.connect()

// eslint-disable-next-line no-undef

app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('passwords')

  const findResult = await collection.find({}).toArray()
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')

  const findResult = await collection.insertOne(password)
  res.send({ success: true, result: findResult })
})

app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')

  const findResult = await collection.deleteOne(password)
  res.send({ success: true, result: findResult })
})

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})
