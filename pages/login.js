import {getProviders, signIn} from 'next-auth/react'

export default function Login({providers}){
    return(
        <div className='flex flex-col items-center justify-center bg-black min-h-screen'>
            <img className='w-52 mb-5' src='https://links.papareact.com/9xl'/>
            {Object.values(providers).map((provider)=>{
                return(
                    <div key={provider.name}>
                        <button 
                        className='bg-[#18d160] text-white p-4 rounded-full'
                        onClick={()=>signIn(provider.id, {callbackUrl: '/'})}
                        >Login with {provider.name}</button>
                    </div>
                )
            })

            }
        </div>
    )
}

export async function getServerSideProps(ctx){
    const providers = await getProviders()
    console.log(providers)
    return({
        props: {
            providers,

        }
    })
}