import { useGSAP } from '@gsap/react';
import React, {useRef} from 'react';
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animation';
import {explore1Img, explore2Img, exploreVideo} from '../utils'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Features = () => {
    const videoRef = useRef(null)
    useGSAP(() => {
        gsap.to("#exploreVideo", {
            scrollTrigger: {
                trigger: "#exploreVideo",
                toggleActions: "play pause reverse restart",
                start: '-10% bottom'
            },
            onComplete: () => { videoRef.current.play() }
        })
        

        animateWithGsap('#feature_title', {
            y: 0,
            opacity: 1,
            ease: 'power2.inOut'})

        animateWithGsap('.g_grow', 
            { scale: 1, opacity: 1, ease: "power1" },
            { scrub: 5.5 }
        );

        animateWithGsap('.g_text', 
            { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 }
        )
        
    }, [])
    return (
        <section className='h-full common-padding bg-zinc overflow-hidden relative'>
            <div className='screen-max-width'>
                <div className='mb-12 w-full'>
                    <h1 id='feature_title' className='section-heading '>
                        Explore the full story.
                    </h1>

                    <div className='flex flex-col justify-center items-center overflow-hidden'>
                        <div className='mt-32 mb-24 pl-24 '>
                            <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
                            <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in titanium.</h2>

                        </div>

                        <div className='flex-center flex-col sm:px-10'>
                            <div className='relative h-[50vh] w-full flex items-center'>
                                <video src={exploreVideo} type='video/mp4' playsInline
                                className='w-full h-full object-cover object-center' preload='none'
                                muted autoPlay ref={videoRef} id='exploreVideo'></video>
                            </div>

                            <div className='flex flex-col relative ư-full'>
                                <div className='feature-video-container'>
                                    <div className='overflow-hidden flex-1 h-[50vh]'>
                                        <img src={explore1Img} alt="titanium" 
                                        className='feature-video g_grow'/>
                                    </div>
                                    <div className='overflow-hidden flex-1 h-[50vh]'>
                                        <img src={explore2Img} alt="titanium" 
                                        className='feature-video g_grow'/>
                                    </div>
                                </div>

                                <div className='feature-text-container'>
                                    <div className='flex-1 flex-center'>
                                        <p className='feature-text g_text'>
                                            iPhone 15 Pro is {' '}
                                            <span className='text-white'>
                                                the first iPhone to feature an aerospace-grade titanium design
                                            </span>, using the same alloy that spacescrafts use for missions to Mars.
                                        </p>
                                    </div>

                                    <div className='flex-1 flex-center'>
                                        <p className='feature-text g_text'>
                                        Titanium is one of the metals with the highest strength-to-weight ratio of any metal, making these our {' '}
                                            <span className='text-white'>
                                                lightest Pro models ever
                                            </span>. You'll notice the difference the moment you pick one up.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;