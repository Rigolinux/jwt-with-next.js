

//allows to create a session for the user
import jwt from 'jsonwebtoken'

//create cookies 
import {serialize} from 'cookie'

export default function loginhandler(req, res) {

    //get credentials from request
    const { email, password } = req.body

    //check if credentials are correct

    //if credentials are correct, create a token
    if (email === 'admin@gmail.com' && password === '123456') {

        //create a token with who data you want in it aditional to the secret key
        const token = jwt.sign({ 
            exp : Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, //token expires in 7 days
            email,
            password 
        }, 'secretkey')

        //create a cookie with the token
        //aditionaly the keys allow to set the cookie options and aditional configurations
        const serializer = serialize('mytoken', token, {
            //set the cookie to be only accesible by the server
            httpOnly: true,
            //verify that the cookie is in production for use in production
            secure: process.env.NODE_ENV === 'development',
            //set the cookie to be accesible a any server
            sameSite: 'strict',
            //set the cookie to expire in 7 days
            maxAge: 60 * 60 * 24 * 7,
            //route where the cookie will be used
            path: '/'

        })

        //send token to client in the headers
        res.setHeader('Set-Cookie', serializer)
       return res.status(200).json({ message: 'Login Succcess' })
    }
    

    return res.status(401).json({ erorr: 'Login Failed' })

}