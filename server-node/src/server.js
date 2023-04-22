// import express from 'express'
// import mysql from 'mysql'
// import cors from 'cors'
// import path from 'path'
const express = require('express')
const mysql = require('mysql')
const path = require('path')
var cors = require('cors')



const app = express()
app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'xo-game'
})

connection.connect((err) => {
  if (err) console.log('Error connecting to MySQL Database => ', err)

  console.log('MySQL successfully connected')
})

app.post('/api/create/history', async (req, res) => {
  const { gameDate, gameStatus, gameDuration } = req.body

  try {
    connection.query(
      `INSERT INTO history (gameDate, gameStatus, gameDuration) 
      VALUES("${gameDate}", "${gameStatus}", ${gameDuration})`,
      (err, results, fields) => {
        if (err) {
          console.log('Error while inserting a user into the database = ', err)
          return res.status(400).send()
        }

        return res.status(201).json({
          message: 'New user successfully created!!'
        })
      }
    
    )
  } catch (error) {
    console.log('Error Create History = ', error)
  }
})

app.post('/api/query/history', async (req, res) => {
  try {
    connection.query(
      `SELECT * FROM history ORDER BY gameId DESC`,
      (err, results, fields) => {
        if (err) {
          console.log('Error while inserting a user into the database = ', err)
          return res.status(400).send()
        }

        return res.status(200).send({
          message: 'Get History successfully!!',
          results,
        })
      }
    
    )
  } catch (error) {
    console.log('Error Create History = ', error)
  }
})

app.post('/api/calculate/statistics', async (req, res) => {
  try {
    connection.query(
      `SELECT * FROM history`,
      (err, results, fields) => {
        if (err) {
          console.log('Error while inserting a user into the database = ', err)
          return res.status(400).send()
        }

        let xWinPercent = 0
        let oWinPercent = 0
        let quitPercent = 0
        let drawPercent = 0

        results.forEach(item => {
          if (item?.gameStatus === 'XWIN') xWinPercent += 1
          if (item?.gameStatus === 'OWIN') oWinPercent += 1
          if (item?.gameStatus === 'QUIT') quitPercent += 1
          if (item?.gameStatus === 'DRAW') drawPercent += 1
        })

        return res.status(200).send({
          message: 'Get Statistics successfully!!',
          results: {
            xWinPercent: parseFloat((xWinPercent/results.length) * 100 ).toFixed(2),
            oWinPercent: parseFloat((oWinPercent/results.length) * 100 ).toFixed(2),
            quitPercent: parseFloat((quitPercent/results.length) * 100 ).toFixed(2),
            drawPercent: parseFloat((drawPercent/results.length) * 100 ).toFixed(2),
          },
        })
      }
    
    )
  } catch (error) {
    console.log('Error Get Statistics = ', error)
  }
})

app.post('/api/calculate/endgame', async (req, res) => {
  const { list } = req.body

  // Check columns 
  for (let i = 0; i < 3; i++) {
    if (list[i][0] === list[i][1] && list[i][1] === list[i][2] && list[i][0] !== "") {
      return res.status(200).send({
        message: 'Calculate successfully!!',
        results: list[i][0],
      })
    }
  }

  // Check rows
  for (let i = 0; i < 3; i++) {
    if (list[0][i] === list[1][i] && list[1][i] === list[2][i] && list[0][i] !== "") {
      return res.status(200).send({
        message: 'Calculate successfully!!',
        results: list[0][i],
      })
    }
  }

  // Check diagonals
  if (list[0][0] === list[1][1] && list[1][1] === list[2][2] && list[0][0] !== "") {
    return res.status(200).send({
      message: 'Calculate successfully!!',
      results: list[0][0],
    })
  }
  if (list[0][2] === list[1][1] && list[1][1] === list[2][0] && list[0][2] !== "") {
    return res.status(200).send({
      message: 'Calculate successfully!!',
      results: list[0][2],
    })
  }

  // Check for tie
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (list[i][j] === "") {
        // If there's at least one empty square, the game is not over
        // return null;
        return res.status(200).send({
          message: 'Calculate successfully!!',
          results: null,
        })
      }
    }
  }
  // All squares are filled and no winner
  return res.status(200).send({
    message: 'Calculate successfully!!',
    results: '',
  });
  
})

app.listen(3001, () => console.log('Server is running on port 3001'))
app.use(express.static(path.join(__dirname, "public")))