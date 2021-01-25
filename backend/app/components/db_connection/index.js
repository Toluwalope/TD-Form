'use strict';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import dotenv from 'dotenv';
dotenv.config();
const mongoConnection = process.env.MONGODB_URI;
mongoose.connect(
	mongoConnection,
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	(err) => {
		if (err) console.log(err);
		else console.log('Db Connected');
	}
);

export default mongoose;
