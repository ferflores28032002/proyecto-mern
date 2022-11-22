import {IoEyeSharp} from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../store/slices/CarritoSlices'

const CardProduct = ({producto}) => {


  const dispatch = useDispatch()

  return (
    <div className="w-60 shadow-2xl rounded-lg">


    <img 
      src={producto?.image_url} 
      className="w-full rounded-t-lg"

    />

    <div className="w-full min-h-[10rem] flex flex-col px-4 pb-4">


      <h1 className="text-[1rem] text-gray-700 font-semibold pt-2">{producto?.name}</h1>
      <h2 className="text-sm pt-2 text-gray-700">{producto?.description}</h2>
      <div className="pt-3  flex items-center justify-start gap-4">
      <h1 className="font-semibold text-gray-700">C$ {producto?.price}</h1>
      <h1 className="px-2 py-1 text-white bg-green-600 rounded-lg text-[0.7rem]">{producto?.category?.name}</h1>
      </div>


      <div className="flex gap-3 mt-6">

        <button
          className="py-2  w-32 flex-shrink-0 px-4 font-semibold bg-indigo-600 text-sm text-white rounded-md"
          onClick={() => dispatch( addToCart(producto) )}
        > 
          Add to Cart
        </button>


        <Link to={`/informacion/${producto.id}`} className='bg-gray-300 py-2 px-3 rounded-lg'
        >

        <IoEyeSharp
          className='text-gray-700'
          size={22} 
        />
        

        </Link>

      </div>




    </div>


  </div>
  )
}
export default CardProduct;
