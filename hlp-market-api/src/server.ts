import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});