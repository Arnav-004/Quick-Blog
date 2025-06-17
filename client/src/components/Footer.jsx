import React from 'react'
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 py-10 border-b border-gray-500/3 text-gray-500">
                {/* Left: Logo and details */}
                <div className="flex-1 min-w-[220px] mb-6 md:mb-0">
                    <img src={assets.logo} alt="App Logo" className="w-32 sm:w-44" />
                    <p className='max-w-[410px] mt-6'>
                        BlogMOS &copy; {new Date().getFullYear()}<br />
                        Your daily dose of blogs and stories.<br />
                        Contact: info@blogmos.com
                    </p>
                </div>

                {/* Right: Links */}
                <div className="flex flex-wrap justify-between w-full gap-5 md:w-[45%]">
                    {footer_data.map((section, index) =>(
                        <div key={index}  >
                            <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2 '>{section.title}</h3>
                            <ul className='text-sm space-y-1'>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className='my-2'>
                                        <a href='#'  className='hover:underline transition'>{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 &copy; BlogMos - All Rights Reserved</p>
        </div>
    );
}

export default Footer
