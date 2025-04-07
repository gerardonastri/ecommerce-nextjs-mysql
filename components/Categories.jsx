import Image from 'next/image'
import React from 'react'

const Categories = () => {

    const items = [
        {
            title: "Men",
            img: "/cats/man.webp"
        },
        {
            title: "Women",
            img: "/cats/woman.webp"
        },{
            title: "Kids",
            img: "/cats/kids.webp"
        }
    ]

  return (
    <section className="md:wrapper max-w-[90%] mx-auto flex flex-col md:flex-row gap-10 !mt-[100px]">
        {items.map((item, i) => (
            <div className='md:flex-1 w-full h-[450px] relative rounded-md'>
                <Image src={item.img} alt='category' fill className='object-cover rounded-md' />
                <button className='absolute bottom-3 right-3 bg-white rounded-3xl text-black px-4 py-2'>{item.title}</button>
            </div>
        ))}
      </section>
  )
}

export default Categories