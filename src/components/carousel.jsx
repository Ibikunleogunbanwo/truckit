import React from 'react'
import StarRating from './ratingstar'

const Carousel = () => {
 
  return (
    <div className='flex flex-col mt-4 justify-center items-center mx-8 p-8'>
      
      <h1 className='text-teal-500 text-sm md:text-2xl mt-12 sm:leading-4  md:leading-0 text-center'>Real stories, real experiences</h1>


      <div>
      <p className='text-gray-300 h-[48px] leading-6 text-xs md:w-[587px] md:text-center mt-6 text-justify'> <span className='md:block md:text-center text-justify'>See how our services have made a difference in the </span>
      lives of our customers, helping them move, drive, and earn with ease. </p>
      </div>


     <div className='mt-24'>
     <StarRating rating={4.5}/>

     </div>

     <div>
        <p className='text-gray-300 h-[48px] leading-6 text-xs md:w-[587px] md:text-center lg:mt-6 text-justify'>
        <span className='md::block text-justify'>This app has made finding trucking jobs so much easier! I get direct bookings, steady work,</span> and faster payments. It’s a game-changer for my business!
        </p>
        
     </div>
     <p className='place-items-center text-gray-300 mt-6'> 
        <span className='block mt-16 md:mt-2 mb-4'>-</span>Kathryn Murphy 
     
     <span className='block mt-8 text-xs'>( Truck driver)</span> 
     </p>

    </div>
  )
}

export default Carousel
