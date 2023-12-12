import { connect } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ENV_DB;
console.log(process.env.ENV_DB)
function connectDB() {
  connect(uri).catch(err => console.log(err));
}

export { connectDB };