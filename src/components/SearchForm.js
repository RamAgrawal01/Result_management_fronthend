import React, { useState } from 'react';
import {toast} from "react-hot-toast"

const SearchForm = ({ onSearch , percentage}) => {
  const [rollNumber, setRollNumber] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(rollNumber);
};


  return (
    <form onSubmit={submitHandler} className='flex flex-col lg:space-y-[1.7rem] sm:space-y-[1.5rem] space-y-[0.6rem]'>

        <div className=' flex items-center space-x-[3rem]'>
        <label htmlFor="rollNumber" className='text-[#fde68a] lg:text-[1.25rem] sm:text-[1.25rem] text-[0.8rem] '>Enter Roll Number</label>
        <input
        className='bg-[#f9a8d4] bg-opacity-20 rounded-xl lg:h-[1.7rem] sm:h-[1.7rem] h-[0.8rem] hover:border px-3 py-2 text-blue-200'
        type="text"
        id="rollNumber"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        required
      />
        </div>

     
      <button type="submit" className='text-[1.2rem] font-bold bg-[#ec4899] w-[12rem] rounded-2xl py-1.5 mx-auto
       hover:scale-105 hover:transition-all duration-200 hover:bg-opacity-60'>Show Marksheet</button>
    </form>
  );
};

export default SearchForm;