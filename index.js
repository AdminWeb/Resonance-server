#!/usr/bin/env node
const fs = require('fs');
const server = require('./server')
const configureFile = require('./configureFile')
const colors = require('colors')
console.log(' Resonance Server '.bgGreen.blue)

const functions = []
functions.push({key:'s',exec:server})
functions.push({key:'-c',exec:configureFile})

const data = process.argv.slice(2)
const options = data.filter((d)=> d.indexOf('-')>-1)
const commands = data.filter((d) => d.indexOf('-') === -1)
commands.map((d)=>{
  functions.map((i)=>{
    if(i.key == d){
      i.exec(options)
    }
  })
})
options.map((d)=>{
  functions.map((i)=>{
    if(i.key == d){
      i.exec(options)
    }
  })
})