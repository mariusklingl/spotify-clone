import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
import Center from '@/components/Center'
import { getSession } from 'next-auth/react'
import Player from '../components/Player'

export default function Home(){

  return (
    <div className='bg-black h-screen'>
      <main className='flex'>
        <Sidebar/>
        <Center/>
      </main>
      <div className='sticky bottom-0'>
        <Player/>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx){
  const session = await getSession(ctx)
  return{
    props:{
      session
    }
  }
}


