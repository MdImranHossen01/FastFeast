import React from 'react'
import womanAvatar from '../../../assets/aboutPage/woman_avatar.png'
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaUserCircle } from 'react-icons/fa'
import { IoIosMail } from "react-icons/io";

export default function OurTeam() {
    const teamData = [
        {
            id: 1,
            image: 'https://placehold.co/550x550/444444/ff7800.png?text=Developername',
            name: 'Developer name',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: '',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 2,
            image: null,
            name: 'Developer name',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: '',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 3,
            image: null,
            name: 'Developer name',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: '',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 4,
            image: '',
            name: 'Developer name',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: '',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 5,
            image: '/about/woman_avatar.png',
            name: 'Developer name',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: '',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 6,
            image: '/about/woman_avatar.png',
            name: 'Developer name',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: '',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
        {
            id: 7,
            image: '/about/woman_avatar.png',
            name: 'Developer name',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: '',
            portfolioLink: '',
            email: 'example@gmail.com',
        },
    ]
    return (
        <section className="my-10">
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
                            <div className='rounded-xl min-w-2xs max-w-xs bg-base-100 shadow-xl p-5 text-center'>
                                <figure>
                                    {/* <img src="" className='object-cover' alt="" /> */}
                                    <img
                                        className='aspect-square object-cover rounded-full'
                                        src={developer.image || `https://placehold.co/550x400/444444/ff7800.png?text=${developer.name}`}
                                        alt="" />
                                </figure>
                                <div className="mt-5">
                                    <h5 className=" font-bold text-2xl">
                                        {developer.name}
                                    </h5>
                                    <p className="">
                                        {developer.position}
                                    </p>
                                    <div className="flex gap-4 mt-5 text-2xl justify-center">
                                        <a href={developer.linkedInLink} target='_blank'><FaLinkedin /> </a> 
                                        <a href={developer.gitHubLink} target='_blank'><FaGithub /></a> 
                                        <a href={developer.email} target='_blank'><IoIosMail /></a> 
                                        <a href={developer.portfolioLink} target='_blank'><FaUserCircle /></a> 
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
