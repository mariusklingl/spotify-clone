import {getToken} from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req,next){

    //Token will exist if Logged In
    const token = await getToken({req, secret: process.env.JWT_SECRET})
    
    // Allow request if folling true
    // 1) request for a session & provider fetch
    // 2) User logged in => token 
    const {pathname} = req.nextUrl
    if(pathname.includes('/api/auth') || token){
        return NextResponse.next()
    }
    if(!token && pathname !== '/login'){
        return NextResponse.rewrite(new URL('/login', req.url))
    }


}