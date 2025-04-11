import { Heart } from "lucide-react"
import Image from "next/image"

const Card = ({item}) => (
    <div className='w-full'>
        <div className='relative w-full h-[350px]'>
            <Image src={item.img || "/products/img-1.avif"} alt='trend img' fill className=' object-cover z-10' />
            <span className='bg-gray-100 p-2 rounded-full flex items-center justify-center absolute top-5 right-5 z-20 cursor-pointer'><Heart className="w-5 h-5" /></span>
        </div>
        <h3 className='mt-2 text-lg'>{item.title || item.name}</h3>
        <p className='text-gray-500 text-sm'>{item.price}€</p>
    </div>
)

export default Card