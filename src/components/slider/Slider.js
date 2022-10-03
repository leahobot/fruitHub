import React, {useState, useEffect} from "react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import "./Slider.scss";
import {sliderData} from "../../slider-data";

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	let slideIntervals;
	let intervalTime = 6000;
	const autoScroll = true;

	useEffect(() => {
		setCurrentSlide(0);
	}, []);

	useEffect(() => {
		if (autoScroll) {
			function auto() {
				slideIntervals = setInterval(nextSlide, intervalTime);
			}
			auto();
		}
		return () => clearInterval(slideIntervals);
	}, [currentSlide, slideIntervals]);

	const slideLength = sliderData.length;

	const prevSlide = () => {
		setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
	};

	const nextSlide = () => {
		setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
	};

	return (
		<section className='slider'>
			<AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
			<AiOutlineArrowRight className='arrow next' onClick={nextSlide} />
			{sliderData.map((slide, index) => (
				<div
					key={index}
					className={index === currentSlide ? "slide current" : "slide"}>
					{index === currentSlide && (
						<div className='slider-img-container'>
							<img src={slide.image} className='slider-img' alt='slides' />
							<div className='content'>
								<h2>{slide.heading}</h2>
								<p>{slide.desc}</p>
								<hr />
								<a href='#product' className='slide-btn'>
									Shop Now
								</a>
							</div>
						</div>
					)}
				</div>
			))}
		</section>
	);
};

export default Slider;
