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
            <Link className='w-40 h-16 bg-center bg-cover relative' style={{backgroundImage : `url(${shreyasmedialogo})`}} to='/'>
              <div className='absolute bottom-[30px] right-[50px]'>
                <h1 className='text-lg font-semibold text-[#1C1C1C] font-[montserrat]'>News</h1>
              </div>
            </Link>
          </div>
        </div>
        {/* 2nd */}
        <div className='flex gap-40 xl:gap-90 py-6 px-24 xl:px-60 w-full bg-pink-100'>
          <div className='flex flex-col gap-6 w-[687px] items-start'>
              <h1 className='mt-16 text-[#E11A68] text-sm font-medium tracking-wide font-[montserrat]'>Your Gateway to Trusted News & Insights</h1>
              <h1 className='lg:text-3xl xl:text-5xl text-[#212529] font-bold leading-snug font-[montserrat]'>Stay Ahead with Real-Time News Across Every Category</h1>
              <h1 className='text-[#6C757D] text-lg leading-7 font-[inter]'>From breaking headlines to global updates in politics, sports, tech, cinema & more — all in one place, all for you</h1>
              <button className='bg-[#E11A68] px-7 py-3.5 rounded-lg text-[#FFF] font-medium font-[inter]'>Explore Now</button>
          </div>
          <div className='w-[295px]'>
            <div className='lg:w-72 lg:h-[432px] xl:w-96 xl:h-[632px] bg-center bg-cover relative ' style={{backgroundImage : `url(${mobileHeader})`}}>
                <div className='absolute -bottom-6 -right-14'>
                    <img src={mike} alt='mike' className='h-56 w-44' />
                </div>
            </div>
          </div>
        </div>



    </div>
  )
}

export default Header