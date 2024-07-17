const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you are using HTTPS; false otherwise
}));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'user' && password === 'pass') {
    req.session.userId = username;
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.send(`Hello ${req.session.userId}`);
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.send('Logout successful');
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
