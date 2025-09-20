import React from 'react';

const Explore = () => {
  return (
    <div id='explore' className='h-screen flex flex-col md:flex-row items-center justify-center bg-heroBG px-6 md:px-16 py-8'>
      
      {/* Left Column */}
      <div className='md:w-1/2 md:pr-8 mb-6 md:mb-0'>
        <h2 className='text-2xl md:text-3xl text-white font-bold mb-3 border-b-2 border-green-700 inline-block'>
          Health and Living
        </h2>
        <p className='text-white text-sm md:text-base mb-4'>
          We want to transform the quality of everyday life and resist the willful destruction of our health, soil, water, and biodiversity, for corporate gains.
        </p>
        <button className='px-4 py-1.5 border border-green-700 text-green-700 font-semibold rounded hover:bg-green-700 hover:text-white transition text-sm'>
          Read More
        </button>
      </div>

      {/* Right Column */}
      <div className='md:w-1/2'>
        <img 
          src="img8.jpg" 
          alt='Tomato Plant' 
          className='w-full h-64 md:h-72 rounded-lg shadow-md mb-2 object-cover' 
        />
        <p className='text-white text-xs md:text-sm'>
          Tomato plant on the terrace garden at Green Path restaurant and organic fair trade store in Bangalore. The Green Path is a set of diverse eco-initiatives in the state of Karnataka. Its aim is to promote and help people establish eco-friendly lifestyles through easily replicable models of sustainability.
        </p>
      </div>
    </div>
  );
}

export default Explore;
