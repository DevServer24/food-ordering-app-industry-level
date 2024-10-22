
import express from 'express';
import dotenv from 'dotenv';
import routes from './controllers/auth/routes'

dotenv.config(); 

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


app.use('/api/auth', routes); 

// Example of a session route (if you intend to create a session route)
app.get('/user-session', (req, res) => {
  res.send('User session route');
});

// Start server
app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});
