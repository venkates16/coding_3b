let express = require('express')
let app = express()
let path = require('path')
let path_dir = path.join(__dirname, 'goodreads.db')
//console.log(path_dir)
let {open} = require('sqlite')
let sqlite3 = require('sqlite3')
let db = null

let iniliazing_db_connection = async () => {
  try {
    db = await open({
      filename: path_dir,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Server is Running on port 3000')
    })
  } catch (error) {
    console.log(`the ${error.message}`)
    process.exit(1)
  }

 
}

iniliazing_db_connection()
//console.log(db)

app.get('./books/', async (request, response) => {
  let query = `
    SELECT 
    * 
    FROM 
    book
      ORDER BY 
      book_id ;

  `
  let array = await db.all(query)
  response.send(array)
})
