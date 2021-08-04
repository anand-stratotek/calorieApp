const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Connecting to dataBase
connectDB();

//BodyParser Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('App Started');
// });

//Defining Routes

app.use('/api/users', require('./routes/api/users'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
