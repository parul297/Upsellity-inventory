import 'dotenv/config';
console.log('server file running');

import { connectDB } from './src/config/db.js';

import app from "./src/app.js";

const PORT = process.env.PORT || 4001;

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});