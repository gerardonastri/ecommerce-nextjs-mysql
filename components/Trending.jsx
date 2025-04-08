import Image from 'next/image';
import React from 'react'
import { Heart } from "lucide-react"

const Card = ({item}) => (
    <div className='w-full'>
        <div className='relative w-full h-[350px]'>
            <Image src={item.img} alt='trend img' fill className=' object-cover z-10' />
            <span className='bg-gray-100 p-2 rounded-full flex items-center justify-center absolute top-5 right-5 z-20 cursor-pointer'><Heart className="w-5 h-5" /></span>
        </div>
        <h3 className='mt-2 text-lg'>{item.title}</h3>
        <p className='text-gray-500 text-sm'>{item.price}</p>
    </div>
)

const Trending = () => {

    const items = [
        {
          title: "T-shirt Oversize Bianca",
          price: "19.99€",
          img: "/trending/img-1.webp"
        },
        {
          title: "Jeans Slim Fit Blu",
          price: "39.99€",
          img: "/trending/img-2.jpeg"
        },
        {
          title: "Giacca in Denim",
          price: "59.99€",
          img: "/trending/img-3.jpeg"
        },
        {
          title: "Felpa con Cappuccio Nera",
          price: "29.99€",
          img: "/trending/img-4.jpeg"
        }
      ];

  return (
    <section className='wrapper !my-[100px] relative'>
        <h2 className='font-playfair text-3xl text-center font-bold'>Trending now</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
            {items.map((item, i) => (
                <Card item={item} key={i} />
            ))}
        </div>
        <button className='block mx-auto bg-white text-black border-2 border-black rounded-[1.5rem] px-8 py-2 mt-10 hover:bg-black hover:text-white cursor-pointer'>Show All</button>
    </section>
  )
}

export default Trending