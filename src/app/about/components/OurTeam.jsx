import React from 'react'
// import womanAvatar from '../../../assets/aboutPage/woman_avatar.png'
// import Image from 'next/image'
import { FaGithub, FaLinkedin, FaUserCircle } from 'react-icons/fa'
import { IoIosMail } from "react-icons/io";

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
                            <div key={developer.id} className='rounded-xl min-w-2xs max-w-xs bg-white shadow-xl p-5 text-center group  transition-all duration-300'>
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
                                    <div className="flex gap-4 mt-5 text-2xl justify-center *:hover:scale-110 *:hover:text-orange-500">
                                        <a
                                            href={developer.linkedInLink}
                                            title={developer.linkedInLink}
                                            target='_blank'><FaLinkedin color=''/>
                                        </a>

                                        <a href={developer.gitHubLink}
                                            title={developer.gitHubLink}
                                            target='_blank'><FaGithub />
                                        </a>

                                        <a
                                            href={`mailto:${developer.email}`}
                                            title={developer.email}
                                            target='_blank'><IoIosMail />
                                        </a>

                                        <a
                                            href={developer.portfolioLink}
                                            title={developer.portfolioLink}
                                            target='_blank'><FaUserCircle />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
