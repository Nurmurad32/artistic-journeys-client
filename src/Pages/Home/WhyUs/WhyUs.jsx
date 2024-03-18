import React from 'react';
import imgSide from "../../../assets/sectionTitleBGRotate.jpg"

import { BsShield } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiGraduationCapLine } from "react-icons/ri";
import { BsBrush } from "react-icons/bs";

import { Fade } from "react-awesome-reveal";
import CountUp from 'react-countup';

const WhyUs = () => {
    return (
        <div id='about' className='bg-[#3D98B5] rounded-lg w-full flex flex-col md:flex-row items-center py-20 px-7 mt-16' >
            <div className='w-full md:w-2/5 '>
                <img src={imgSide} alt="" className='rounded-lg' />
            </div>
            <div className='w-full md:w-3/5 pl-6'>
                <p className='text-xl text-[#FCAF5D] mt-4'>Why Ours</p>
                <p className='text-4xl my-2 text-white '>Our Best Achievements</p>
                <p className=''>Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Mauris a diam maecenas sed. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Massa tincidunt nunc pulvinar sapien et.</p>
                <div className="grid grid-cols-3 gap-2 py-2">
                    <div className=" mx-auto">
                        {/* <FaChalkboardTeacher className="mx-auto text-4xl text-[#D05A32]" /> */}
                        <p className="text-2xl md:text-4xl font-semibold mt-4"><CountUp end={23} delay={2} duration={2} />+</p>

                        <Fade cascade damping={1e-1}>
                            <p><small className="text-[#FCAF5D] text-bold text-sm md:text-xl">Professional <br /> Educators</small></p>
                        </Fade>
                    </div>
                    <div className="mx-auto">
                        {/* <RiGraduationCapLine className="mx-auto text-4xl text-[#D05A32]" /> */}
                        <p className="text-2xl md:text-4xl font-semibold mt-4"><CountUp end={234} delay={2} duration={2} />+</p>

                        <Fade cascade damping={1e-1}>
                            <p><small className="text-[#FCAF5D] text-bold text-sm md:text-xl">Student <br /> Enrolled</small></p>
                        </Fade>
                    </div>
                    <div className="mx-auto">
                        {/* <BsBrush className="mx-auto text-4xl text-[#D05A32]" /> */}
                        <p className="text-2xl md:text-4xl font-semibold mt-4"><CountUp end={145} delay={2} duration={2} />+</p>

                        <Fade cascade damping={1e-1}>
                            <p><small className="text-[#FCAF5D] text-bold text-sm md:text-xl">Classes <br /> Held</small></p>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;