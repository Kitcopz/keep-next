import Image from 'next/image'
import Link from 'next/Link'

export default function Home() {
  return (
    <div className ='flex flex-col items-center'>
      <h1 className='text-5xl font-extrabold leading-loose items-center'>Hello, my name is Keep.</h1>
      <p className="text-3xl font-regular font-serif center">This is my page</p>
      <Link href='/about'>Go to About Page</Link>
    </div>
   
  )
}
