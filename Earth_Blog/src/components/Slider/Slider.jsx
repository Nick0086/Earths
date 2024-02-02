import React,{useEffect} from 'react'
import "./slider.css"
import Button from '../Button';

function Slider() {

    useEffect(() => {

        // Add 'show' class to trigger the fade-in animation when component mounts
        const sliderElement = document.querySelector('.slider');
        sliderElement.classList.add('show');
    }, []);


    return (
        <section>
            <div className='sliderCss flex justify-center items-center ' >
                <div className='bg-white rounded-lg slider ease-in-out lg:w-2/4 md:w-3/4 w-[90%] h-3/4 md:p-10 p-5 text-center' >
                    <p className='text-light-green text-[12px] tracking-wide mb-5 '>Explore the Colourful World</p>
                    <h2 className='md:text-[40px] md:leading-[48px] text-3xl text-dark-green font-semibold mb-5' >Join our 100,000+ Subscribers List Today!</h2>
                    <Button>Subscribe Now</Button>
                </div>
            </div>
        </section>
    )
}

export default Slider;