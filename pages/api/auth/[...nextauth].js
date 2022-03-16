import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi,{ LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token){
    try{
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)
        spotifyApi.setClientId(process.env.NEXT_PUBLIC_CLIENT_ID)

        const {body: refreshedAccessToken } = await spotifyApi.refreshAccessToken()
        console.log('Refreshed Token is ', refreshedAccessToken)
        return {
            ...token,
            accessToken: refreshedAccessToken.access_token,
            accessTokenExpires: Date.now() + refreshedAccessToken.expires_in * 1000,
            refreshToken: refreshedAccessToken.refresh_token ?? token.refreshToken 
        }

    }catch(e){
        console.log(e, 'hier')
        return{
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }

}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, account, user }) {
            //initial signIn
            console.log(token)
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000 //convert to ms 
                }
            }
            // Return previous token if not expires 
            if(Date.now() < token.accessTokenExpires){
                console.log('Exisitng Token is valid', token)
                return {
                    ...token
                }
            }
            //IF AccessToken expired
            console.log('Exisitng Token expired')
            return await refreshAccessToken(token)
        },
        async session({session,token}){
            session.user.accessToken = token.accessToken,
            session.user.refreshToken = token.refreshToken,
            session.user.username = token.username

            return session
        }
    }
})



