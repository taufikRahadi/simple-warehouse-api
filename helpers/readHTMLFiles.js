 
const fs = require('fs')

module.exports = (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        throw err
        callback(err)
      } else {
        callback(null, html)
      }
    })
  }