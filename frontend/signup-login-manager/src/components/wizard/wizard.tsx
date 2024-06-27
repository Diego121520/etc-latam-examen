import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const Wizard = ({step}) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <div className="wizard-container">
            <Slider {...settings}>

                {step === 1 ? (
                    <div>
                        <StepOne />
                    </div>
                ) : step === 2 ? (
                    <div>
                        <StepTwo />
                    </div>
                ) : (
                    <div>
                        <StepThree />
                    </div>
                )}

            </Slider>
        </div>
    );
};

export default Wizard;