import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import Head from 'next/head'
import { useAuth } from '@/context/AuthContext'
import UserDashboard from '@/components/UserDashboard'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const {currentUser} = useAuth()
  
  return (
    <>
    <Head>
      
    </Head>
      {!currentUser ? <Login />:<UserDashboard></UserDashboard>}
      
      
    </>
  )
}
