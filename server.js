import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import teamRoute from './route/team';

mongoose.connect('mongodb://localhost:27017/maconline', { useNewUrlParser: true });

let app = express();
//let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
//app.use(urlencodedParser);

app.use(cors({ origin: '*' }));

// Route configuration
app.use(teamRoute);

app.listen(2007, () => {
    console.log('MAC Online Server is currently running on port 2007');
});
