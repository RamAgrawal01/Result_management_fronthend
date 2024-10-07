import React  from 'react'
import {toast} from "react-hot-toast"


const Marksheet = ({ student, results , totalMarks , totalMaxMarks , percentage }) => {


    const finalResult = () => {

         const formattedPercentage = Math.round(percentage*100)/100 ;
         console.log(formattedPercentage);

        if (percentage > 40) {
          toast.success(`Congrats! You passed with ${formattedPercentage}%`);
        } else if (percentage < 40) {
          toast.error(`Sorry! You failed with ${formattedPercentage}%`);
        }
      };
    
  return (
    <div className='mx-auto '>
        <div className=' min-w-[300px]  lg:min-w-[700px] flex flex-col lg:flex-row justify-between sm:text-center'>
        <h3 className='lg:text-[1.2rem] sm:text-[1.2rem] text-[0.8rem] text-[#fbbf24] font-semibold'>Student Name: 
            <span className='text-[#fcd34d]'>{" "+student.name}</span></h3>

        <h3 className='lg:text-[1.2rem] sm:text-[1.2rem] text-[0.8rem] text-[#fbbf24] font-semibold'>Roll Number: 
            <span className='text-[#fcd34d]'>{" "+student.rollNumber}</span></h3>
        </div>
      
        <table className='w-full lg:min-w-[600px] border-collapse border border-gray-300 mt-[1.35rem]'>
        <thead>
          <tr className='bg-gray-200 bg-opacity-40'>
            <th className='border border-gray-300 px-4 py-2 '>Subject</th>
            <th className='border border-gray-300 px-4 py-2'>Maximum Marks</th>
            <th className='border border-gray-300 px-4 py-2'>Marks Obtained</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id} className='border border-gray-300 text-center'>
              <td className='border border-gray-300 px-4 py-2 text-[#fef9c3] font-semibold'>{result.subjectId.name}</td>
              <td className='border border-gray-300 px-4 py-2 text-[#fef9c3] font-semibold'>{result.maxMarks}</td>
              <td className='border border-gray-300 px-4 py-2 text-[#fef9c3] font-semibold'>{result.marks}</td>
            </tr>
          ))}
          <tr className='bg-[#d4d4d8] bg-opacity-20 text-center'>
            <td className='border border-gray-300 px-4 py-2 text-[#a3e635] font-bold text-[1.35rem]'>Total</td>
            <td className='border border-gray-300 px-4 py-2 text-[#a3e635] font-bold text-[1.35rem]'>{totalMaxMarks}</td>
            <td className='border border-gray-300 px-4 py-2 text-[#a3e635] font-bold text-[1.35rem]'>{totalMarks}</td>
          </tr>
        </tbody>
      </table>

          <div className='mt-[3rem] min-w-[200px] text-center'>
                 <button type="submit" className='text-[1.2rem] font-bold bg-[#ec4899] w-[12rem] rounded-2xl py-1.5
               hover:scale-105 hover:transition-all duration-200 hover:bg-opacity-60  ' 
               onClick={finalResult}>Final Outcome</button>
          </div>

      
  </div>
  );
};

export default Marksheet;


