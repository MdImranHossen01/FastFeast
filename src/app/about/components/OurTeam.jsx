import Image from 'next/image';
import React from 'react'
// import womanAvatar from '../../../assets/aboutPage/woman_avatar.png'
// import Image from 'next/image'
import { FaGithub, FaLinkedin, FaUserCircle } from 'react-icons/fa'
import { IoIosMail } from "react-icons/io";


//bg-linear-to-l from-gray-500 from-50% to-orange-600 to-50% bg-size-[500%_100%] hover:bg-right transition-all rounded-lg duration-1000 ease-in-out bg-left bg-clip-text text-transparen
// https://i.ibb.co.com/rG7Hm5XB/compressed-2.webp
// https://i.ibb.co.com/F49j3q8N/compressed-3.webp
// https://i.ibb.co.com/mr36pQzQ/compressed-4.webp
// https://i.ibb.co.com/60W92FYx/compressed-1.webp
// https://i.ibb.co.com/4nwy593V/compressed-5.webp
// https://i.ibb.co.com/7thh7Lfq/compressed-6.webp
// https://i.ibb.co.com/Xr7Hc2gf/compressed-7.webp

export const OurTeam = () => {
    // const teamData = [
    //     {
    //         id: 1,
    //         image: null,
    //         name: 'Md Imran Hossen',
    //         position: 'Full-stack Developer',
    //         linkedInLink: '',
    //         gitHubLink: 'https://github.com/MdImranHossen01',
    //         portfolioLink: '',
    //         email: 'example@gmail.com',
    //     },
    //     {
    //         id: 2,
    //         image: null,
    //         name: 'Kanak Ray',
    //         position: 'Full-stack Developer',
    //         linkedInLink: '',
    //         gitHubLink: 'https://github.com/Captain-Kanak',
    //         portfolioLink: '',
    //         email: 'example@gmail.com',
    //     },
    //     {
    //         id: 3,
    //         image: null,
    //         name: 'Md Mustakim',
    //         position: 'Full-stack Developer',
    //         linkedInLink: '',
    //         gitHubLink: 'https://github.com/mustakim67',
    //         portfolioLink: '',
    //         email: 'example@gmail.com',
    //     },
    //     {
    //         id: 4,
    //         image: 'https://i.ibb.co.com/BHtGjH0k/profile-by-canva-blue-shadow.png',
    //         name: 'Julkarnain Zunayed',
    //         position: 'Full-stack Developer',
    //         linkedInLink: 'https://www.linkedin.com/in/julkarzunayed/',
    //         gitHubLink: 'https://github.com/julkarzunayed',
    //         portfolioLink: 'https://julkar-zunayed.netlify.app/',
    //         email: 'julkarnainzunayed@gmail.com',
    //     },
    //     {
    //         id: 5,
    //         image: '/about/woman_avatar.png',
    //         name: 'Afroza Akter',
    //         position: 'Full-stack Developer',
    //         linkedInLink: '',
    //         gitHubLink: 'https://github.com/Afroza-Nipa13',
    //         portfolioLink: '',
    //         email: 'example@gmail.com',
    //     },
    //     {
    //         id: 6,
    //         image: '/about/woman_avatar.png',
    //         name: 'Zingrin Lonchen',
    //         position: 'Full-stack Developer',
    //         linkedInLink: '',
    //         gitHubLink: 'https://github.com/zingrin',
    //         portfolioLink: '',
    //         email: 'example@gmail.com',
    //     },
    //     {
    //         id: 7,
    //         image: '/about/woman_avatar.png',
    //         name: 'Ayasha Akter',
    //         position: 'Full-stack Developer',
    //         linkedInLink: '',
    //         gitHubLink: 'https://github.com/nipaayasha05',
    //         portfolioLink: '',
    //         email: 'example@gmail.com',
    //     },
    // ]
    const teamData = [
        {
            id: 1,
            image: "https://i.ibb.co.com/4nwy593V/compressed-5.webp",
            name: 'Md Imran Hossen',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/MdImranHossen01',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/7thh7Lfq/compressed-6.webp",
            name: 'Md Rezwan Hossen',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/Captain-Kanak',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/Xr7Hc2gf/compressed-7.webp",
            name: 'Md Jaber Ali',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/mustakim67',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 4,
            image: 'https://i.ibb.co.com/60W92FYx/compressed-1.webp',
            name: 'Mst Tasnim Jara',
            position: 'Full-stack Developer',
            linkedInLink: 'https://www.linkedin.com/in/julkarzunayed/',
            gitHubLink: 'https://github.com/julkarzunayed',
            portfolioLink: 'https://julkar-zunayed.netlify.app/',
            email: 'julkarnainzunayed@gmail.com',
        },
    ]
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h3 className="text-xl font-bold text-center text-gray-400">
                    MEET OUR BEST EMPLOYEES
                </h3>
                <h1 className='text-center text-4xl font-semibold my-5 mb-14'>
                    EMPLOYEES OF THE YEAR
                </h1>
                <div className="flex flex-wrap gap-5 justify-center">
                    {
                        teamData.map(developer =>
                            <div key={developer.id} className='rounded-xl min-w-[300px] max-w-[300px] bg-white shadow-xl text-center group  transition-all duration-700
                            bg-linear-to-br from-white from-50% to-red-600/30 to-50% bg-size-[0] hover:bg-right ease-in-out bg-left relative overflow-hidden
                            '>
                                <div className="bg-linear-to-bl from-red-600/5 via-red-600/10 to-red-600/50 w-[110%] h-[110%] absolute  translate-y-[100%] -translate-x-[100%] group-hover:-translate-y-10 group-hover:-translate-x-0 duration-300 z-10">

                                </div>
                                <figure>
                                    {/* Profile image */}
                                    <img
                                        className='max-h-[400px] object-cover object-top w-full group-hover:scale-105 duration-300 overflow-hidden'
                                        // width={748}
                                        // height={1123}
                                        src={developer.image}
                                        alt={`Image of ${developer.name}`}
                                    // unoptimized={true}
                                    />
                                    {/* <img
                                        className='aspect-square object-cover rounded-full group-hover:scale-105'
                                        src={developer.image || `https://placehold.co/550x400/444444/ff7800.png?text=${developer.name}`}
                                        alt={`Image of ${developer.name}`} /> */}
                                </figure>
                                <div className="mt-2 relative p-2">
                                    <p className="flex gap-4  text-2xl justify-center *:hover:scale-110 w-[95%] -top-[100%]
                                        *:transform *:translate-y-32 *:scale-0 *:group-hover:translate-y-0 *:group-hover:scale-100 *:duration-300 overflow-hidden *:bg-orange-500 text-white *:z-20 absolute
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
                                    <h5 className=" font-bold text-2xl">
                                        {developer.name}
                                    </h5>
                                    {/* <p className="">
                                        {developer.position}
                                    </p> */}

                                    {/* Social links */}

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
