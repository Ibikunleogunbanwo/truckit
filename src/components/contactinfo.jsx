import React from 'react'

const Contactinfo = () => {
  return (

    <div>
   <p className="text-teal-500 font-bold mt-10 mb-4">
        4. Contact information
      </p>
    <div className='grid lg:grid-cols-4 my-4 gap-2 '>
      <div className='flex flex-col'>
        <label htmlFor="contact_name"
        className='text-sm mb-1 font-semibold'
        >
        Primary contact person:
        </label>
        <input type="text" 
        className='text-sm p-4 border border-gray-300 rounded-md'
        placeholder='john Wick'
        />
      </div>

      <div className='flex flex-col'>
        <label htmlFor="phone_number"
        className='text-sm mb-1 font-semibold'
        >
        Phone number:
        </label>
        <input type="tel" 
        className='text-sm p-4 border border-gray-300 rounded-md '
        placeholder=''
        />
      </div>

      <div className='flex flex-col'>
        <label htmlFor="email"
        className='text-sm mb-1 font-semibold'
        >
        Email address:
        </label>
        <input type="text" 
        className='text-sm p-4 border border-gray-300 rounded-md'
        placeholder=''
        />
      </div>
      </div>
<div>

</div>

<div>

</div>

    </div>
  )
}

export default Contactinfo
