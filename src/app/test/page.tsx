import React from 'react'

const page = () => {
  return (
    <div>

    
    <div className="fixed flex  !bg-[#ffe600] justify-center   items-center z-30 h-screen w-screen top-0 right-0  ">
    <div className=' w-28 fixed z-50 duration-13000 animate-spin  '>
    <svg  viewBox="0 0 99 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.5756 0V19.1143C46.5756 22.1002 46.107 24.9771 45.2388 27.6743C44.8995 28.7259 44.5011 29.7498 44.0451 30.7433C41.3004 36.7194 36.506 41.5432 30.5687 44.3055C29.5865 44.7614 28.5753 45.1621 27.5341 45.5021C27.5272 45.5034 27.5203 45.5077 27.5134 45.509C24.8429 46.3781 21.991 46.8479 19.0333 46.8479H0C0.361387 39.9958 2.10467 33.5125 4.95525 27.6758H14.0357L8.2824 21.8889C11.8556 16.5372 16.4397 11.9261 21.7601 8.32944L27.5149 14.1178V4.98269C33.3176 2.11549 39.7632 0.36344 46.5756 0Z" fill="black"></path>
        <path d="M46.5756 79.8573V99.0045C39.7617 98.6412 33.3148 96.889 27.5121 94.0205V84.8884L21.7575 90.6765C16.4382 87.0798 11.8528 82.4675 8.2796 77.1172L14.0329 71.3302H4.95507C2.10317 65.4922 0.361387 59.0089 0 52.1567H19.003C21.9731 52.1567 24.8332 52.6279 27.5134 53.5011C28.5589 53.8425 29.5796 54.2431 30.5659 54.7019C36.506 57.4627 41.3032 62.2851 44.0492 68.2573C44.5025 69.2438 44.8995 70.2621 45.2375 71.3095C45.2402 71.3164 45.243 71.3233 45.2445 71.3302C46.1098 74.0165 46.5769 76.8822 46.5769 79.8586L46.5756 79.8573Z" fill="black"></path>
        <path d="M93.4739 71.3302H84.3948L90.148 77.1172C86.5748 82.4688 81.9907 87.0798 76.6701 90.6752L70.9156 84.8883V94.0204C65.1129 96.8876 58.6672 98.6425 51.8521 99.0031V79.889C51.8521 76.9016 52.3206 74.0247 53.1901 71.3289C53.5266 70.2774 53.9278 69.252 54.3825 68.2586C57.1273 62.2837 61.9216 57.4586 67.8589 54.6965C68.8411 54.2405 69.8536 53.841 70.8935 53.5026C70.9018 53.4998 70.9087 53.497 70.9156 53.4957C73.5875 52.625 76.4353 52.1554 79.3943 52.1554H98.4302C98.069 59.0089 96.3271 65.4937 93.4752 71.3302H93.4739Z" fill="black"></path>
        <path d="M98.4289 46.8479H79.4246C76.4558 46.8479 73.5957 46.3768 70.9141 45.5034C69.8687 45.1621 68.8509 44.7601 67.863 44.3027C61.9216 41.5419 57.1259 36.7194 54.3797 30.7474C53.9265 29.7595 53.5281 28.7411 53.1901 27.695C53.1888 27.6881 53.1847 27.6799 53.1832 27.673C52.3191 24.9868 51.8521 22.1209 51.8521 19.1445V0C58.6645 0.36344 65.11 2.11549 70.9128 4.98269V14.115L76.6673 8.32813C81.9879 11.9235 86.572 16.5344 90.1452 21.8861L84.392 27.673H93.4711C96.323 33.5097 98.0662 39.993 98.4261 46.8479H98.4289Z" fill="black"></path>
    </svg>
    </div>

</div>
      <div className='w-full fixed z-40 top-0 left-0 flex'>
      <div className='border-x-2  border-gray-800 w-1/4 h-screen  !bg-[#ffe600] '/>
      <div className='border-x-2  border-gray-800 w-1/4 h-screen  !bg-[#ffe600] '/>
      <div className='border-x-2  border-gray-800 w-1/4 h-screen  !bg-[#ffe600] '/>
      <div className='border-x-2  border-gray-800 w-1/4 h-screen  !bg-[#ffe600] '/>
      </div>
      
      
      
</div>

  )
}

export default page




// .loading-container {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   overflow: hidden;
//   z-index: 500;
//   pointer-events: none;
// }

// .loading-container .loading-screen {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .loading-container .loading-dark {
//   background-color: rgba(var(--color-dark-rgb), 0.5);
//   background-color: rgba(var(--color-dark-rgb), 0);
//   pointer-events: none;
//   opacity: 0;
// }

// .loading-container .loading-screen .shutter {
//   width: calc((100vw - (var(--col-gap) * 2)) / 4);
//   background-color: var(--color-secondary);
//   border-radius: var(--border-radius);
//   height: calc(100% + (var(--border-radius) * 2));
//   flex-shrink: 0;
//   pointer-events: all;
//   z-index: 2;
// }

// /* [data-theme-page="dark"] .loading-container .loading-screen .shutter {
//   background-color: var(--color-dark);
// }

// [data-theme-page="light"] .loading-container .loading-screen .shutter {
//   background-color: var(--color-light);
// }

// [data-theme-page="lightgray"] .loading-container .loading-screen .shutter {
//   background-color: var(--color-lightgray);
// } */

// .loading-container .loading-screen .icon-box {
//   position: absolute;
//   width: calc(var(--title-size) * 1);
//   height: calc(var(--title-size) * 1);
//   overflow: hidden;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 5;
// }

// .loading-container .loading-screen .icon-box svg {
//   width: 70%;
//   transform: rotate(0.001deg);
//   overflow: visible;
// }

// .loading-container .loading-screen .icon-box svg g.icon {
//   transform-origin: center center;
// }

// .loading-container .loading-screen .icon-box svg path {
//   fill: var(--color-dark);
//   transform: rotate(0.001deg);
// }

// .loading-container .loading-screen .loading-icon {
//   position: absolute;
//   right: calc(var(--col-gap) * 2);
//   bottom: calc(var(--row-gap) * 1);
//   height: 1em;
//   z-index: 5;
//   display: flex;
//   transition: var(--animation-smooth) 0s;
//   opacity: 0;
//   visibility: hidden;
// }

// .loading-container .loading-screen .loading-icon.active {
//   opacity: 0.2;
//   visibility: visible;
//   transition: var(--animation-smooth) 1.5s;
// }

// .loading-container .loading-screen .loading-icon svg {
//   width: 100%;
//   transform: scale(2);
// }

// .loading-container .loading-screen .icon-box svg path {
//   fill: var(--color-dark);
// }

// @media screen and (max-width: 1120px) {
//   .loading-container .loading-screen .shutter {
//      width: calc((100vw - (var(--col-gap) * 2)) / 3);
//   }

//   .loading-container .loading-screen .shutter:nth-last-child(1) {
//      display: none;
//   }
// }

// @media screen and (max-width: 880px) {
//   .loading-container .loading-screen .shutter {
//      width: calc((100vw - (var(--col-gap) * 2)) / 2);
//   }

//   .loading-container .loading-screen .shutter:nth-last-child(2) {
//      display: none;
//   }
// }

// /* @media screen and (max-width: 600px) {
//   .loading-container .loading-screen .shutter {
//      width: calc((100vw - (var(--col-gap) * 2)) / 1);
//   }

//   .loading-container .loading-screen .shutter:nth-last-child(3) {
//      display: none;
//   }
// } */
