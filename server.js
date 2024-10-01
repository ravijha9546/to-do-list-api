const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoute');
const taskRoutes = require('./src/routes/taskRoute');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect('mongodb+srv://iamravijha057:root@to-do-list-api.odqyt.mongodb.net/?retryWrites=true&w=majority&appName=to-do-list-api')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
