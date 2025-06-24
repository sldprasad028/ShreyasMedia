import React,{useState} from 'react'
import ReactPlayer from "react-player";
import img1 from "../../assets/img1.png";

const Video = () => {

  const [playing, setPlaying] = useState(false);

  return (
    <div className='flex flex-col px-4 md:px-8 lg:px-20 py-4'>

        {/* 2nd Section Video */}
        <div className="relative overflow-hidden rounded-xl border border-[#E11A68] mt-2 md:mt-6 lg:mt-12">
          <div className='h-[200px] md:h-[420px] lg:h-[540px] '>
            <ReactPlayer url="https://www.youtube.com/watch?v=qi-EqVtPzHc" controls playing={playing} width="100%"  height="100%" className="rounded-xl"/>
          </div>
        </div>


        {/* 1st section */}
        <div className='flex flex-col lg:flex-row lg:justify-between items-start gap-4 lg:gap-0 mt-6 lg:mt-9'>
            {/* 1st */}
            <div className='flex '>
                <h1 className='px-1 md:px-4 lg:px-6 py-2 md:py-2 lg:py-3 border border-[#E11A68] text-xs md:text-base  lg:text-lg font-[montserrat] font-semibold'>To Read the  news</h1>
                <button className='px-1 md:px-2 lg:px-6 py-1.5 md:py-2  lg:py-3  flex gap-1 md:gap-2.5 justify-center items-center bg-[#E11A68]'>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className=''>
                        <rect width="32" height="32" rx="16" fill="white"/>
                        <path d="M11.7142 8V24L24.2857 16L11.7142 8Z" fill="#E11A68"/>
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="16" fill="white" />
                        <path d="M11.7142 8V24L24.2857 16L11.7142 8Z" fill="#E11A68" />
                    </svg>
                    <h1 className='text-[#FFF] font-[montserrat] text-xs md:text-base lg:text-lg font-semibold'>To watch the news</h1>
                </button>
            </div>
            {/* 2nd */}
            <div className='flex justify-center items-center gap-2 md:gap-4 lg:gap-6'>
                <div className='bg-[#E11A68] p-1 w-8 md:w-10 lg:w-11 h-8 md:h-10 lg:h-11 rounded-3xl flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="none">
                        <path d="M9 15.1579C7.9881 15.1579 7.12798 14.7895 6.41964 14.0526C5.71131 13.3158 5.35714 12.4211 5.35714 11.3684V3.78947C5.35714 2.73684 5.71131 1.84211 6.41964 1.10526C7.12798 0.368421 7.9881 0 9 0C10.0119 0 10.872 0.368421 11.5804 1.10526C12.2887 1.84211 12.6429 2.73684 12.6429 3.78947V11.3684C12.6429 12.4211 12.2887 13.3158 11.5804 14.0526C10.872 14.7895 10.0119 15.1579 9 15.1579ZM7.78571 24V20.1158C5.68095 19.8211 3.94048 18.8421 2.56429 17.1789C1.1881 15.5158 0.5 13.5789 0.5 11.3684H2.92857C2.92857 13.1158 3.52074 14.6055 4.70507 15.8375C5.88941 17.0695 7.32105 17.6851 9 17.6842C10.679 17.6834 12.111 17.0674 13.2961 15.8362C14.4813 14.6051 15.073 13.1158 15.0714 11.3684H17.5C17.5 13.5789 16.8119 15.5158 15.4357 17.1789C14.0595 18.8421 12.319 19.8211 10.2143 20.1158V24H7.78571Z" fill="white"/>
                    </svg>
                </div>
                <div className='px-1 md:px-3 lg:px-5 py-1.5 md:py-2 lg:py-3 flex justify-center items-center gap-1 md:gap-2.5 border border-[#E11A68]'>
                    <h1 className='text-[#E11A68] text-xs md:text-base lg:text-lg font-[montserrat] font-medium'>Select Language</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2.24994 3.74998H15.7499C15.8866 3.75041 16.0206 3.78811 16.1374 3.85902C16.2543 3.92992 16.3496 4.03136 16.4131 4.1524C16.4766 4.27344 16.5059 4.4095 16.4978 4.54594C16.4897 4.68239 16.4445 4.81404 16.3672 4.92673L9.61719 14.6767C9.33744 15.081 8.66394 15.081 8.38344 14.6767L1.63344 4.92673C1.55531 4.81427 1.50949 4.68256 1.50097 4.54589C1.49244 4.40922 1.52153 4.27282 1.58508 4.15153C1.64863 4.03023 1.7442 3.92867 1.86142 3.85787C1.97863 3.78708 2.11301 3.74977 2.24994 3.74998Z" fill="#E11A68"/>
                    </svg>
                </div>
            </div>
        </div>

        {/* <div className="my-4 flex justify-center space-x-4">
          <button onClick={() => setPlaying(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Play</button>
          <button onClick={() => setPlaying(false)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Pause</button>
        </div> */}

        {/* 3rd Section */}
        <div className='mt-8 lg:mt-6 flex flex-col gap-4'>
            <h1 className='font-[inter] md:text-base lg:text-lg font-medium'>Share on :</h1>
            <div className='flex gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" rx="14" fill="#E11A68"/>
                    <path d="M12.4285 16.8571L16.5064 14.5L12.4285 12.1429V16.8571ZM21.5114 10.705C21.6135 11.0743 21.6843 11.5693 21.7314 12.1979C21.7864 12.8264 21.81 13.3686 21.81 13.84L21.8571 14.5C21.8571 16.2207 21.7314 17.4857 21.5114 18.295C21.315 19.0021 20.8593 19.4579 20.1521 19.6543C19.7828 19.7564 19.1071 19.8271 18.07 19.8743C17.0485 19.9293 16.1135 19.9529 15.2493 19.9529L14 20C10.7078 20 8.65711 19.8743 7.84782 19.6543C7.14068 19.4579 6.68497 19.0021 6.48854 18.295C6.38639 17.9257 6.31568 17.4307 6.26854 16.8021C6.21354 16.1736 6.18997 15.6314 6.18997 15.16L6.14282 14.5C6.14282 12.7793 6.26854 11.5143 6.48854 10.705C6.68497 9.99786 7.14068 9.54214 7.84782 9.34571C8.21711 9.24357 8.89282 9.17286 9.92997 9.12571C10.9514 9.07071 11.8864 9.04714 12.7507 9.04714L14 9C17.2921 9 19.3428 9.12571 20.1521 9.34571C20.8593 9.54214 21.315 9.99786 21.5114 10.705Z" fill="white"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" rx="14" fill="#E11A68"/>
                    <path d="M22 9.52941C21.4111 9.79706 20.7763 9.97294 20.1185 10.0571C20.7916 9.65176 21.3117 9.00941 21.5564 8.23706C20.9216 8.61941 20.218 8.88706 19.4761 9.04C18.8719 8.38235 18.0229 8 17.0593 8C15.262 8 13.7935 9.46824 13.7935 11.2806C13.7935 11.5406 13.8241 11.7929 13.8776 12.03C11.1549 11.8924 8.7304 10.5847 7.11663 8.60412C6.83365 9.08588 6.67304 9.65176 6.67304 10.2482C6.67304 11.3876 7.24665 12.3971 8.13384 12.9706C7.59082 12.9706 7.08604 12.8176 6.64245 12.5882V12.6112C6.64245 14.2018 7.77438 15.5324 9.27342 15.8306C8.79223 15.9628 8.28684 15.9812 7.79732 15.8841C8.00505 16.536 8.41188 17.1064 8.96062 17.5152C9.50937 17.9239 10.1724 18.1505 10.8566 18.1629C9.69688 19.081 8.25928 19.5772 6.78011 19.57C6.52008 19.57 6.26004 19.5547 6 19.5241C7.45316 20.4571 9.18164 21 11.0325 21C17.0593 21 20.3709 15.9988 20.3709 11.6629C20.3709 11.5176 20.3709 11.38 20.3633 11.2347C21.0057 10.7759 21.5564 10.1947 22 9.52941Z" fill="white"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" rx="14" fill="#E11A68"/>
                    <path d="M22.0201 14.0201C22.0201 9.59298 18.4271 6 14 6C9.57296 6 5.97998 9.59298 5.97998 14.0201C5.97998 17.9018 8.73888 21.1338 12.396 21.8797V16.4261H10.792V14.0201H12.396V12.015C12.396 10.4672 13.6552 9.20802 15.203 9.20802H17.2081V11.614H15.604C15.1629 11.614 14.802 11.9749 14.802 12.416V14.0201H17.2081V16.4261H14.802V22C18.8522 21.599 22.0201 18.1825 22.0201 14.0201Z" fill="white"/>
                </svg>
            </div>
        </div>

        <div className='m-8 lg:m-16 h-[1px] bg-slate-200'></div>
        

        
        {/* 4th Section */}
        <div className='flex flex-col py-3 lg:py-10'>
            <div className='flex gap-1 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M4.42105 6.66667H15.4737V4.44444H4.42105V6.66667ZM2.21053 20C1.60263 20 1.08242 19.7826 0.649895 19.3478C0.217368 18.913 0.000736842 18.3896 0 17.7778V2.22222C0 1.61111 0.216632 1.08815 0.649895 0.653333C1.08316 0.218519 1.60337 0.000740741 2.21053 0H17.6842C18.2921 0 18.8127 0.217778 19.2459 0.653333C19.6792 1.08889 19.8955 1.61185 19.8947 2.22222V9.38889C19.4711 8.55556 18.8632 7.8937 18.0711 7.40333C17.2789 6.91296 16.4132 6.66741 15.4737 6.66667C14.6447 6.66667 13.871 6.86111 13.1526 7.25C12.4342 7.63889 11.8355 8.18519 11.3566 8.88889H4.42105V11.1111H10.5276C10.4908 11.4815 10.4908 11.8519 10.5276 12.2222C10.5645 12.5926 10.6474 12.963 10.7763 13.3333H4.42105V15.5556H8.75921C8.40921 15.963 8.15131 16.4122 7.98553 16.9033C7.81974 17.3944 7.73684 17.9081 7.73684 18.4444V20H2.21053ZM9.94737 20V18.4444C9.94737 18 10.0627 17.5882 10.2933 17.2089C10.5239 16.8296 10.8507 16.5563 11.2737 16.3889C11.9368 16.1111 12.6232 15.903 13.3328 15.7644C14.0424 15.6259 14.756 15.5563 15.4737 15.5556C16.1914 15.5548 16.9054 15.6244 17.6157 15.7644C18.326 15.9044 19.012 16.1126 19.6737 16.3889C20.0974 16.5556 20.4245 16.8289 20.6552 17.2089C20.8858 17.5889 21.0007 18.0007 21 18.4444V20H9.94737ZM15.4737 14.4444C14.7 14.4444 14.0461 14.1759 13.5118 13.6389C12.9776 13.1019 12.7105 12.4444 12.7105 11.6667C12.7105 10.8889 12.9776 10.2315 13.5118 9.69445C14.0461 9.15741 14.7 8.88889 15.4737 8.88889C16.2474 8.88889 16.9013 9.15741 17.4355 9.69445C17.9697 10.2315 18.2368 10.8889 18.2368 11.6667C18.2368 12.4444 17.9697 13.1019 17.4355 13.6389C16.9013 14.1759 16.2474 14.4444 15.4737 14.4444Z" fill="#212529"/>
                </svg>
                <h1 className='text-[#212529] md:text-lg lg:text-xl font-bold font-[montserrat]'> Related Videos</h1>
            </div>

            <div className='mb-5 h-[1px] bg-slate-200'></div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6'>
                 <div className="relative overflow-hidden rounded-xl border border-[#E11A68]">
                    <div className='md:h-[280px] lg:h-[200px]'>
                        <ReactPlayer url="https://www.youtube.com/watch?v=qi-EqVtPzHc" controls playing={playing} width="100%" height="100%" className="rounded-xl"/>
                    </div>
                </div>
                 <div className="relative overflow-hidden rounded-xl border border-[#E11A68]">
                    <div className='md:h-[280px] lg:h-[200px]'>
                        <ReactPlayer url="https://www.youtube.com/watch?v=qi-EqVtPzHc" controls playing={playing} width="100%" height="100%" className="rounded-xl"/>
                    </div>
                </div>
                 <div className="relative overflow-hidden rounded-xl border border-[#E11A68]">
                    <div className='md:h-[280px] lg:h-[200px]'>
                        <ReactPlayer url="https://www.youtube.com/watch?v=qi-EqVtPzHc" controls playing={playing} width="100%" height="100%" className="rounded-xl"/>
                    </div>
                </div>
           </div>

            <div className='mt-10 h-[1px] bg-slate-200'></div>

        </div>

        <h1 className='mb-3 lg:mb-6 md:text-lg lg:text-xl font-bold font-[montserrat]'>Similar News</h1>

        <div className='mb-6 h-[1px] bg-slate-200'></div>
        
        {/* 5th Section */}
        <div className='flex flex-col gap-6 lg:gap-10'>
            <div className='p-3 lg:p-4 flex flex-col md:flex-row gap-4 shadow-xl rounded-xl '>
                <img src={img1} alt='img1' className='w-full md:w-44 lg:w-60 h-44 md:h-auto' />
                <div className='flex flex-col gap-2 md:gap-3'>
                    <h1 className='bg-[#E11A68] rounded-2xl px-1 md:px-2 lg:px-3 py-1 md:py-1.5 text-[#FFF] font-[inter] font-medium text-[10px] md:text-sm lg:text-base w-11 md:w-16 lg:w-20'>Politics</h1>
                    <h1 className='font-[montserrat] md:text-lg lg:text-2xl font-semibold'>PM Addresses Nation on Upcoming Reforms in Parliament</h1>
                    <h1 className='text-[#6C757D] font-[inter] text-sm lg:text-lg'> Focus on digital governance and youth employment in the 40-minute speech.</h1>
                    <h1 className='text-[#6C757D] font-[inter] text-[10px] md:text-xs lg:text-sm'>👁️ 15.6K ❤️ 2.7K ⏱ 1h ago</h1>
                </div>   
            </div>
             <div className='p-3 lg:p-4 flex flex-col md:flex-row gap-4 shadow-xl rounded-xl '>
                <img src={img1} alt='img1' className='w-full md:w-44 lg:w-60 h-44 md:h-auto'/>
                <div className='flex flex-col gap-2 md:gap-3'>
                    <h1 className='bg-[#E11A68] rounded-2xl px-1 md:px-2 lg:px-3 py-1 md:py-1.5 text-[#FFF] font-[inter] font-medium text-[10px] md:text-sm lg:text-base w-11 md:w-16 lg:w-20'>Politics</h1>
                    <h1 className='font-[montserrat] md:text-lg lg:text-2xl font-semibold'>PM Addresses Nation on Upcoming Reforms in Parliament</h1>
                    <h1 className='text-[#6C757D] font-[inter] text-sm lg:text-lg'> Focus on digital governance and youth employment in the 40-minute speech.</h1>
                    <h1 className='text-[#6C757D] font-[inter] text-[10px] md:text-xs lg:text-sm'>👁️ 15.6K ❤️ 2.7K ⏱ 1h ago</h1>
                </div>   
            </div>
        </div>


    </div>
  )
}

export default Video