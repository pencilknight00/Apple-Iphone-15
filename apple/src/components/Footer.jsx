import React from 'react';
import { footerLinks } from '../constants';

const Footer = () => {
    return (
        <footer className='py-5 sm:px-10 px-5'>
            <div className='screen-max-width'>
                <div>
                    <p className='font-semibold text-gray text-xs'>
                        More ways to shop: {' '} 
                        <span className='underline text-blue'>Visit an Apple Store</span>, {' '}
                        <span className='underline text-blue'>call 1-800-MY-APPLE</span>, or  {' '}
                        <span className='underline text-blue'>find a reseller</span> {' '} near you.

                    </p>
                </div>

                <div className='bg-neutral-700 my-5 h-[1px] w-full'/>
                <div className='flex md:flex-row flex-col md:items-center justify-between'>
                    <p className='font-semibold text-gray text-xs'>Copyright @ 2024 Apple Inc. All rigths reserved</p>
                </div>
                <div className='flex'>
                    {footerLinks.map((link, index) => (
                        <p className='font-semibold text-gray text-xs' key={link}>{link}{' '}
                        {index !== footerLinks.length - 1 && (<span className='mx-2'> | </span>) }</p>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;