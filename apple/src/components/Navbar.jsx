import React from 'react';
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants'
const Navbar = () => {
    return (
        <div className='w-full flex py-5 sm:px-10 px-5 justify-between items-center'>
            <nav className='flex w-full screen-max-width'>
                <img src={appleImg} alt="Apple Logo" 
                width={14}
                height={18}/>

                <div className='flex flex-1 justify-center max-sm:hidden'>
                    {navLists.map((item) => (
                        <div key={item} >
                            <p className='px-5 cursor-pointer text-sm text-gray hover:text-white transition-all'>{item}</p>
                        </div>
                    )) }
                </div>
                <div className='flex items-baseline max-sm:justify-end max-sm:flex-1 gap-7'>
                    <img src={searchImg} alt="search" width={18} height={18}/>
                    <img src={bagImg} alt="Bag" width={18} height={18}/>
                </div>
            </nav>
            
        </div>
    );
};

export default Navbar;