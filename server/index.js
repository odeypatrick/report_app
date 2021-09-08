const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use("combined", morgan)
// initialize cors
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', require('./routes/api'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})