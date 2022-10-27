

//verifies the user is logged in and then logs them out
import { verify } from "jsonwebtoken"

//removes the cookie
import cookie from "cookie"

export default function handlelogout  (req,res) {

    //desconstruct mytoken the names can change
    const { mytoken } = req.cookies
    //token exists?
    if(!mytoken) {
        return res.status(401).json({ message: 'Not Authorized' })

    }

    //verify the token requieres the token and the secret and desconstruct the payload
    try{
        verify(mytoken, 'secretkey')
        const serializer = cookie.serialize('mytoken', null, {
            //set the cookie to be only accesible by the server
            httpOnly: true,
            //verify that the cookie is in production for use in production
            secure: process.env.NODE_ENV === 'development',
            //set the cookie to be accesible a any server
            sameSite: 'strict',
            //set the cookie to expire in 7 days
            maxAge: 0,
            //route where the cookie will be used
            path: '/'

        })
        res.setHeader('Set-Cookie', serializer)
        return res.status(200).json({ message: 'Logout Succcess' })
    }
    catch(err){
        return res.status(401).json({ message: 'invalid token ola' })
    }




}