'use client'

import './globals.css'
import { Inter } from 'next/font/google'

import jwt_decode from 'jwt-decode'

import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Login',
  description: 'Please Login',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [user, setUser] = useState({})

  function handleCallbackResponse(response){
    console.log(response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById('signInDiv').hidden = true
  }

  function handleSignOut(event){
    setUser({})
    document.getElementById('signInDiv').hidden = false
  }

  useEffect(() => {
    /*global google */

    google.accounts.id.initialize({
      client_id: '437173804817-3ktvjr1rrcs3qmll9rdg76a876508cbi.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {theme: 'outline', size: 'large'}
    )

    google.accounts.id.prompt()
  },[])

  return (
    <html lang="en">
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <body className={inter.className}>
        <div className='flex flex-row justify-between p-4'>
        <div id='signInDiv'></div>

{user &&
<div>
  <img src={user.picture}></img>
  
</div>

}

{Object.keys(user).length != 0 &&
  <div>
    <h1>Welcome, {user.name}</h1>
    <p>{user.email}</p>
    <button className='border rounded border-sky-500 transition duration-500 ease-in-out pt-2 pb-2 px-4 py-4 text-white bg-sky-500 hover:font-semibold' onClick={(e) => handleSignOut(e)}>Sign Out</button>
  </div>


}
        </div>
        
        
        {children}
        </body>
    </html>
  )
}
