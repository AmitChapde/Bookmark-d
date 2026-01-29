import dotenv from "dotenv";


dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET;


if(!JWT_SECRET){
    throw new Error('Jwt secret is not defined');
}


export {JWT_SECRET};