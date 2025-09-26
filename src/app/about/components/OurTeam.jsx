import React from 'react'
// import womanAvatar from '../../../assets/aboutPage/woman_avatar.png'
// import Image from 'next/image'
import { FaGithub, FaLinkedin, FaUserCircle } from 'react-icons/fa'
import { IoIosMail } from "react-icons/io";


//bg-linear-to-l from-gray-500 from-50% to-orange-600 to-50% bg-size-[500%_100%] hover:bg-right transition-all rounded-lg duration-1000 ease-in-out bg-left bg-clip-text text-transparen

export const OurTeam = () => {
    const teamData = [
        {
            id: 1,
            image: null,
            name: 'Md Imran Hossen',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/MdImranHossen01',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 2,
            image: null,
            name: 'Kanak Ray',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/Captain-Kanak',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 3,
            image: null,
            name: 'Md Mustakim',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/mustakim67',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 4,
            image: 'https://i.ibb.co.com/BHtGjH0k/profile-by-canva-blue-shadow.png',
            name: 'Julkarnain Zunayed',
            position: 'Full-stack Developer',
            linkedInLink: 'https://www.linkedin.com/in/julkarzunayed/',
            gitHubLink: 'https://github.com/julkarzunayed',
            portfolioLink: 'https://julkar-zunayed.netlify.app/',
            email: 'julkarnainzunayed@gmail.com',
        },
        {
            id: 5,
            image: '/about/woman_avatar.png',
            name: 'Afroza Akter',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/Afroza-Nipa13',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 6,
            image: '/about/woman_avatar.png',
            name: 'Zingrin Lonchen',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/zingrin',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 7,
            image: '/about/woman_avatar.png',
            name: 'Ayasha Akter',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/nipaayasha05',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
    ]
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h3 className="text-xl font-bold text-center text-gray-400">
                    TEAM MEATS
                </h3>
                <h1 className='text-center text-4xl font-semibold my-5'>
                    Our Beast Team
                </h1>
                <div className="flex flex-wrap gap-5 justify-center">
                    {
                        teamData.map(developer =>
                            <div key={developer.id} className='rounded-xl min-w-[220px] max-w-[280px] bg-white shadow-xl p-5 text-center group  transition-all duration-700
                            bg-linear-to-br from-white from-50% to-red-600/30 to-50% bg-size-[0] hover:bg-right ease-in-out bg-left relative overflow-hidden
                            '>
                                <div className="bg-linear-to-bl from-red-600/5 via-red-600/10 to-red-600/50 w-[110%] h-[110%] absolute  translate-y-[100%] -translate-x-[100%] group-hover:-translate-y-10 group-hover:-translate-x-10 duration-300 ">
                                    
                                </div>
                                <figure>
                                    {/* Profile image */}
                                    <img
                                        className='aspect-square object-cover rounded-full group-hover:scale-105'
                                        src={developer.image || `https://placehold.co/550x400/444444/ff7800.png?text=${developer.name}`}
                                        alt={`Image of ${developer.name}`} />
                                </figure>
                                <div className="mt-5">
                                    <h5 className=" font-bold text-2xl">
                                        {developer.name}
                                    </h5>
                                    <p className="">
                                        {developer.position}
                                    </p>

                                    {/* Social links */}
                                    <p className="flex gap-4 mt-5 text-2xl justify-center *:hover:scale-110  
                                        *:transform *:translate-y-32 *:scale-0 *:group-hover:translate-y-0 *:group-hover:scale-100 *:duration-300 overflow-hidden *:bg-orange-500 text-white
                                    ">
                                        <a
                                            className='delay-0 p-1.5'
                                            href={developer.linkedInLink}
                                            title={developer.linkedInLink}
                                            target='_blank'><FaLinkedin color='' />
                                        </a>

                                        <a
                                            className='delay-75 p-1.5'
                                            href={developer.gitHubLink}
                                            title={developer.gitHubLink}
                                            target='_blank'><FaGithub />
                                        </a>

                                        <a
                                            className='delay-150 p-1.5'
                                            href={`mailto:${developer.email}`}
                                            title={developer.email}
                                            target='_blank'><IoIosMail />
                                        </a>

                                        <a
                                            className='delay-225 p-1.5'
                                            href={developer.portfolioLink}
                                            title={developer.portfolioLink}
                                            target='_blank'><FaUserCircle />
                                        </a>
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
