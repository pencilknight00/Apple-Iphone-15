import React, { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);


const VideoCarousel = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])
    const [loadedData, setLoadedData] = useState([])
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

    useGSAP(() => {
        gsap.to(('#slider'), {
            transform: `translateX(-${videoId * 100}%)`,
            duration: 1,
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev,
                    startPlay: true,
                    isPlaying: true
                }))
            }
        })
    }, [isEnd, videoId])

    useEffect(() => {
        if(loadedData.length > 3){
            if(!isPlaying){
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [videoId, startPlay, isPlaying, loadedData])

    const handleLoadedMetadata = (i, e) => {
        setLoadedData((prev) => [...prev, e]) 
    }

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if(span[videoId]) {
            // animate the progress of the video
            let animation = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(animation.progress() * 100);

                    if(progress !== currentProgress){
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760
                            ? '10vw'
                            : window.innerWidth < 1200
                                ? '10vw'
                                : '4vw'
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        }
                        )
                    }

                    
                },
                onComplete: () => {
                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',

                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'

                        })
                    }
                }
                
        })

        if(videoId === 0){
            animation.restart();
        }

            const animationUpdate = () => {
                animation.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }
    
            if(isPlaying){
                gsap.ticker.add(animationUpdate)
            } else {
                gsap.ticker.remove(animationUpdate)
            }

        }
    }, [videoId, startPlay])

    const handleProcess = (type, i) => {
        switch(type){
            case 'video-end':
                setVideo((prev) => ({...prev, isEnd: true, videoId: i + 1})) 
                break;
            case 'video-last':
                setVideo((prev) => ({...prev, isLastVideo: true}))
                break;
            case 'video-reset':
                setVideo((prev) => ({...prev, isLastVideo: false, videoId: 0}))
                break;     
            case 'video-play':
                setVideo((prev) => ({...prev, isPlaying: !prev.isPlaying})) 
            break;
            case 'video-pause':
                setVideo((prev) => ({...prev, isPlaying: !prev.isPlaying})) 
            break;
            default:
                return video;
        }
    }
    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, index) => (
                    <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video 
                                id='video' 
                                className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`} 
                                playsInline={true}
                                preload='auto'
                                muted
                                ref={(el) => (videoRef.current[index] = el)}
                                onPlay={() => {
                                    setVideo((prev) => ({
                                        ...prev,
                                        isPlaying: true
                                    }))
                                }}
                                onEnded={() => 
                                    index !== 3
                                    ? handleProcess('video-end', index)
                                    : handleProcess('video-last')
                                }
                                onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}>
                                    <source src={list.video} type='video/mp4'/>
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text) => (
                                    <p key={text} className='text-white md:text-2xl text-xl font-medium'>{text}</p>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, index) => (
                        <span key={index}
                        ref={(el) => (videoDivRef.current[index] = el)}
                        className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
                            <span className="absolute h-full w-full rounded-full "
                             ref={(el) => (videoSpanRef.current[index] = el)} 
                             onClick={() => {
                                
                             }}/>

                            
                        </span>  
                    ))    
                    }
                </div>
                <button className='control-btn' >
                    <img src={isLastVideo ? replayImg :  !isPlaying ? playImg : pauseImg} 
                    alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} 
                    onClick={isLastVideo ? () => handleProcess('video-reset')
                        : !isPlaying 
                        ? () => handleProcess('video-play') 
                        : () => handleProcess('video-pause')
                    }/>
                </button>
            </div>
        </>
        
    );
};

export default VideoCarousel;