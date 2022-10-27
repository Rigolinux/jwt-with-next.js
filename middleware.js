
// see the next.js docs for more info on custom server and middleware

import { NextResponse } from "next/server";

//the middleware function does no support verify from jsonwebtoken an then requiere
//other module to verify the token
//in this case we using jose to verify the token
import { jwtVerify } from "jose";

export async function middleware(request) {

    //next js has a cookie extractor that will parse the cookie header and return an object
    const cookie = request.cookies.get("mytoken");

    // shows the routes where the middleware is applied
    // request.nextUrl.pathname



        //token exists? then return to login page
        if(cookie === undefined){

            return NextResponse.redirect(new URL('/Login', request.url));

        }
        // verify the token destructuring the token and get the payload 
        // the payloas is refer to if is a valid token
        try {
            const {payload}= await jwtVerify(cookie,new TextEncoder().encode("secretkey"))
            //if the token is valid then return the request
            return NextResponse.next();
            
        } catch (error) {
            return NextResponse.redirect(new URL('/Login', request.url));
            
        }
         
        
        

    

  

}

//who route is protected by the middleware
export const config ={
    matcher : ['/','/dashboard']
}