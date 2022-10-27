

//check if the token is valid
import {verify} from 'jsonwebtoken';


export default function Profilehandler(req, res) {

    //req.cookies shows all cookies

    //desconstruct mytoken the names can change
    const { mytoken } = req.cookies

    //verify the token requieres the token and the secret
    //if the token is valid the function returns the payload
    //if the token is invalid the function returns an error

    if(!mytoken) {
        return res.status(401).json({ message: 'Not Authorized' })

    }

    try{
        const payload = verify(mytoken, 'secretkey')
        return res.json({email: payload.email, password: payload.password})

    }
    catch(err){
        return res.status(401).json({ message: 'invalid token' })
    }
}
 