import React, { useEffect } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils';
import { useState } from 'react';
const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth > 768 ? heroVideo : smallHeroVideo)
    
    const handleResize = () => {
        if(window.innerWidth > 768) {
            setVideoSrc(heroVideo)
        } else {
            setVideoSrc(smallHeroVideo)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    
    useGSAP(() => {
        gsap.to('#title', {
            
            y: 0,
            delay: 2,
            opacity: 1,
            ease: 'power2.inOut'
    }),
        gsap.to('#cta', {
            
            y: 0,
            delay: 2,
            opacity: 1,
            ease: 'power2.inOut'
        })
    })
    return (
        <section className='relative w-full bg-black nav-height mb-24'>
          <div className='h-5/6 w-full flex-center flex-col'>
            <p id='title' className='hero-title'>iPhone 15 pro</p>
            <div className='md:w-10/12 w-9/12'>
                <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}>
                    <source src={videoSrc} type='video/mp4'/>
                </video>
            </div>
          </div>

          <div
          id='cta'
          className='flex flex-col items-center opacity-0 translate-y-20'>
            <a href="#hightlights" className='btn'>Buy</a>
            <p className='font-normal text-xl'>From $199/month or $999</p>
          </div>
        </section>
    );
};

export default Hero;