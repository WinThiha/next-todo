import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      
    </Head>
      <Login />
      <i className="fa-solid fa-dragon"></i>
    </>
  )
}
