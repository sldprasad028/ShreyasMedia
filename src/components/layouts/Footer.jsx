import LOGO from "../../assets/shreyasmedialogo.png";

const Footer = () => {
  return (
    <div className='flex flex-col bg-[#212529] px-6 xl:px-20 py-6 '>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  lg:gap-3 xl:gap-32 '>
           {/* 1st */}
            <div className='flex flex-col  gap-4 '>
                  <div className='w-full '>
                    <div className='flex flex-col gap-0'>
                      {/* <div className='w-40 h-16  bg-center bg-cover relative' style={{backgroundImage : `url(${shreyasmedialogo})`}}>
                        <div className='absolute bottom-[30px] right-[50px]'>
                            <h1 className='text-lg font-semibold text-[#1C1C1C] font-[montserrat] text-[#FFF]'>News</h1>
                        </div>
                      </div> */}
                      <div className="relative flex justify-start  items-start">
                        <p className="text-white text-sm lg:text-[12px] absolute top-2 left-[18%] md:left-[16%] lg:left-[26%]">News</p>
                        <img src={LOGO} alt="logo" className="w-[140px] h-[53px]"/>
                      </div>
                    </div>
                  </div>
                  <p className='text-[#F8F9FA] text-sm font-[inter]'>Shreyas Media delivers breaking news, deep insights, and daily updates from around the world – covering movies, politics, sports, tech, and more, all in one place.</p>
                  <div className='flex gap-4'>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10 15L15.19 12L10 9V15ZM21.56 7.17C21.69 7.64 21.78 8.27 21.84 9.07C21.91 9.87 21.94 10.56 21.94 11.16L22 12C22 14.19 21.84 15.8 21.56 16.83C21.31 17.73 20.73 18.31 19.83 18.56C19.36 18.69 18.5 18.78 17.18 18.84C15.88 18.91 14.69 18.94 13.59 18.94L12 19C7.81 19 5.2 18.84 4.17 18.56C3.27 18.31 2.69 17.73 2.44 16.83C2.31 16.36 2.22 15.73 2.16 14.93C2.09 14.13 2.06 13.44 2.06 12.84L2 12C2 9.81 2.16 8.2 2.44 7.17C2.69 6.27 3.27 5.69 4.17 5.44C4.64 5.31 5.5 5.22 6.82 5.16C8.12 5.09 9.31 5.06 10.41 5.06L12 5C16.19 5 18.8 5.16 19.83 5.44C20.73 5.69 21.31 6.27 21.56 7.17Z" fill="#F8F9FA"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.27999 9.09 5.10999 7.38 2.99999 4.79C2.62999 5.42 2.41999 6.16 2.41999 6.94C2.41999 8.43 3.16999 9.75 4.32999 10.5C3.61999 10.5 2.95999 10.3 2.37999 10V10.03C2.37999 12.11 3.85999 13.85 5.81999 14.24C5.19083 14.4129 4.53003 14.4369 3.88999 14.31C4.1616 15.1625 4.69353 15.9084 5.41101 16.4429C6.12849 16.9775 6.99544 17.2737 7.88999 17.29C6.37366 18.4905 4.494 19.1394 2.55999 19.13C2.21999 19.13 1.87999 19.11 1.53999 19.07C3.43999 20.29 5.69999 21 8.11999 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="#F8F9FA"/>
                      </svg>
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#F8F9FA"/>
                        </svg>
                    </a>

                  </div>
            </div>
            {/* 2nd */}
            <div className='flex flex-col gap-4 text-[#F8F9FA]  pl-0 md:pl-9 xl:pl-0 '>
              <h1 className='font-[montserrat] font-bold text-sm'>Quick Links</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Contact</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Home</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Help & Support</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Privacy Policy</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Terms & Conditions</h1>
            </div>
            {/* 3rd */}
            <div className='flex flex-col gap-4 text-[#F8F9FA]'>
              <h1 className='font-[montserrat] font-bold text-sm'>Popular Categories</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>World News</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Movies & TV</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Politics</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Cricket & Sports</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Technology</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Health & Lifestyle</h1>
              <h1 className='text-[#CED4DA] font-[inter] text-sm'>Business & Finance</h1>
            </div>
            {/* 4th */}
            <div className='flex flex-col gap-3  text-[#F8F9FA]'>
              <h1 className='font-[montserrat] font-bold text-sm'>Stay Informed Daily</h1>
              <h1 className='font-[inter] text-sm lg:text-base'>Get the latest updates straight to your inbox</h1>
              <input className='w-9/12 md:w-auto  p-1 md:p-2 border border-white rounded-lg' placeholder='Enter your email' />
              {/* Submit Button */}
              <button className='w-9/12 md:w-auto px-4 py-1 md:py-2 lg:px-5 lg:py-3 bg-[#E11A68] rounded-lg font-[inter]'>
                  Subscribe
              </button>
              <h1 className='font-[inter] font-semibold text-sm'>Download Our App</h1>
              <div className='flex gap-3 md:gap-12 lg:gap-2 xl:gap-4 '>
                  <a href="https://play.google.com/store/games?device=windows" target="_blank" rel="noopener noreferrer"
                      className='p-2 md:px-4 md:py-2 lg:px-3 lg:py-2 xl:px-4  flex items-center gap-1 md:gap-2 border border-white rounded-lg cursor-pointer'>
                         <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                          <g clip-path="url(#clip0_20_77)">
                            <path d="M1.251 0.565992C1.32719 0.522411 1.4135 0.499653 1.50127 0.500004C1.58904 0.500355 1.67517 0.523803 1.751 0.567992L9.594 5.14299L7.167 7.32699L1 1.77699V0.999992C0.999928 0.911958 1.0231 0.825466 1.06717 0.749259C1.11125 0.673052 1.17466 0.609833 1.251 0.565992ZM1 3.12299V12.877L6.42 7.99999L1 3.12299ZM1 14.223V15C0.999974 15.088 1.02316 15.1744 1.06722 15.2505C1.11128 15.3267 1.17465 15.3899 1.25094 15.4337C1.32722 15.4775 1.41372 15.5004 1.5017 15.5001C1.58967 15.4998 1.67601 15.4763 1.752 15.432L9.594 10.857L7.167 8.67299L1 14.223ZM10.501 10.328L13.751 8.43199C13.8265 8.38797 13.8892 8.32492 13.9328 8.24912C13.9763 8.17332 13.9993 8.08742 13.9993 7.99999C13.9993 7.91257 13.9763 7.82667 13.9328 7.75087C13.8892 7.67507 13.8265 7.61201 13.751 7.56799L10.501 5.67199L7.914 7.99999L10.501 10.328Z" fill="white"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_20_77">
                              <rect width="15" height="15" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                          </defs>
                      </svg>
                      <h1 className='text-sm  md:text-base lg:text-[12px] xl:text-sm  font-[inter]'>Google Play</h1>
                    </a>
                    <a href="https://www.apple.com/in/app-store/" target="_blank" rel="noopener noreferrer"
                          className='p-2 md:px-4 md:py-2 lg:px-3 lg:py-2 xl:px-4 flex items-center gap-1 md:gap-2 border border-white rounded-lg cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M17.55 20.28C16.57 21.23 15.5 21.08 14.47 20.63C13.38 20.17 12.38 20.15 11.23 20.63C9.79004 21.25 9.03004 21.07 8.17004 20.28C3.29004 15.25 4.01004 7.59 9.55004 7.31C10.9 7.38 11.84 8.05 12.63 8.11C13.81 7.87 14.94 7.18 16.2 7.27C17.71 7.39 18.85 7.99 19.6 9.07C16.48 10.94 17.22 15.05 20.08 16.2C19.51 17.7 18.77 19.19 17.54 20.29L17.55 20.28ZM12.53 7.25C12.38 5.02 14.19 3.18 16.27 3C16.56 5.58 13.93 7.5 12.53 7.25Z" fill="white"/>
                        </svg>
                        <h1 className='text-sm md:text-base lg:text-[12px]  xl:text-sm  font-[inter]'>App Store</h1>
                    </a>
              </div>
            </div>


      </div>
      {/* Second Section */}
      <hr className='mt-2 md:mt-6 border border-slate-800'/>
      {/* 3rd Section */}
      <div className='px-6  md:px-20 md:py-6 flex flex-col md:flex-row justify-center md:justify-between'>
          <h1 className='font-[inter] text-[#FFF] text-center text-xs'>© 2025 Shreyas Media. All rights reserved</h1>
          <h1 className='font-[inter] text-[#FFF] text-center text-xs'>Privacy Policy | Sitemap</h1>
      </div>

    </div>
  )
}

export default Footer