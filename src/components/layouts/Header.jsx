import React from 'react'
import shreyasmedialogo from "../../assets/shreyasmedialogo.png";
import mobileHeader from "../../assets/mobileHeader.png";
import mike from "../../assets/mike.png";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='flex flex-col bg-[#FFF2F6] gap-0'>
      {/* 1st */}
        <div className='w-full h-24 px-20 py-2.5'>
          <div className='flex flex-col gap-0'>
            <Link className='w-36 md:w-28 h-11  lg:w-40 lg:h-16 bg-center bg-cover relative' style={{backgroundImage : `url(${shreyasmedialogo})`}} to='/'>
              <div className='absolute bottom-[20px] right-[35px] lg:bottom-[30px] lg:right-[50px]'>
                <h1 className='text-sm lg:text-lg font-semibold text-[#1C1C1C] font-[montserrat]'>News</h1>
              </div>
            </Link>
          </div>
        </div>
        {/* 2nd */}
        <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-40 xl:gap-90 py-6 px-4 md:px-14 lg:px-24 xl:px-60 w-full bg-pink-100'>
          <div className='flex flex-col gap-4 lg:gap-6 md:w-[687px] items-start'>
              <h1 className='mt-0 md:mt-16 text-[#E11A68] text-xs md:text-sm font-medium tracking-wide font-[montserrat]'>Your Gateway to Trusted News & Insights</h1>
              <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-5xl text-[#212529] font-bold leading-snug font-[montserrat]'>Stay Ahead with Real-Time News Across Every Category</h1>
              <h1 className='text-[#6C757D] text-base lg:text-lg leading-7 font-[inter]'>From breaking headlines to global updates in politics, sports, tech, cinema & more — all in one place, all for you</h1>
              <button className='bg-[#E11A68] px-3 md:px-6 lg:px-7 py-1 md:py-3 lg:py-3.5 rounded-lg text-[#FFF] font-medium font-[inter] text-sm md:text-base'>Explore Now</button>
          </div>
          <div className='w-[295px]'>
            <div className='w-52 h-[300px]  lg:w-72 lg:h-[432px] xl:w-96 xl:h-[632px] bg-center bg-cover relative ' style={{backgroundImage : `url(${mobileHeader})`}}>
                <div className='absolute -bottom-1 right-4 lg:-bottom-6 lg:-right-14'>
                    <img src={mike} alt='mike' className='w-16 h-24 lg:h-56 lg:w-44' />
                </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Header