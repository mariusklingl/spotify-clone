import {useSession} from 'next-auth/react'
import { useEffect, signIn } from 'react'
import spotifyApi from '../lib/spotify'

export default function useSpotify(){
    const {data:session, status} = useSession() 

    useEffect(()=>{
        if(session){
            //If refresh accesstioken refresh fails
            spotifyApi.setAccessToken(session.user.accessToken)
            if(session.error === 'RefreshAccessTokenError'){
                signIn()
            }
            
        }

    },[session])

    return spotifyApi
}







