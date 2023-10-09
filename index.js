const express = require('express');
const blogRouter = require('./routes/blog')
const app = express();
const mongoose = require('mongoose')

if (process.env.NODE_ENV != "production")
{
    require("dotenv").config()
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/blog', blogRouter)
app.get('/', (req, res) => {
    res.send({message: "OK"})
})

const PORT = process.env.PORT || 4000
const URL = process.env.DB_URL 

//Connect to database
mongoose.connect(URL, { useNewUrlParser: true })
.then(() => console.log('Connected to database.....'))
.catch((err) => console.log('An error occured:', err.message))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


