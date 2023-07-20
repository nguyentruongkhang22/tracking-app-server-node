import './database/config';
import helmet from 'helmet';
import express from 'express';
import morgan from 'morgan';
import { indexRouter } from './routers/index.router';

const app = express();
const middlewares = [morgan('dev'), express.json(), helmet()];

app.use(middlewares);
app.use('/v1', indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
