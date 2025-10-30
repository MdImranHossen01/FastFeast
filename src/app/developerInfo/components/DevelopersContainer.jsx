import Image from 'next/image'
import React from 'react'
import { FaGithub, FaLinkedin, FaUserCircle } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io';
import "../style.css";

export default function DevelopersContainer({ developerInfo }) {
    return (
        <section className="px-3 py-5 md:py-10">
            <div className="container mx-auto space-y-10">
                {
                    developerInfo?.map((developer, index) =>
                        <div
                        style={{
                            
                        }}
                            key={developer?.id}
                            className={`glass-card flex flex-col-reverse gap-5 ${index % 2 == 0 ? 'md:flex-row' : 'md:flex-row-reverse'} bg-base-100 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 md:p-10`}>
                            <div className="md:flex-2 flex items-center justify-center">
                                <div className="text-center space-y-1.5">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-50">
                                        {developer?.name}
                                    </h3>
                                    <div className="text-lg font-semibold text-gray-400">
                                        {developer?.position}
                                    </div>
                                    <div className="text-xl font-bold text-gray-100">
                                        {developer?.lastEdu.institute}
                                    </div>
                                    <div className="text-lg font-semibold text-gray-400">
                                        {developer?.lastEdu.degree}
                                    </div>
                                    <p className="flex gap-3  text-2xl justify-center *:hover:scale-110
                                                 *:duration-300 *:hover:text-orange-600/80 *:z-20 
                                            ">
                                        <a
                                            className=' '
                                            href={developer.linkedInLink}
                                            title={developer.linkedInLink}
                                            target='_blank'>
                                            <FaLinkedin color='' />
                                        </a>

                                        <a
                                            className=' '
                                            href={developer.gitHubLink}
                                            title={developer.gitHubLink}
                                            target='_blank'>
                                            <FaGithub />
                                        </a>

                                        <a
                                            className=' '
                                            href={`mailto:${developer.email}`}
                                            title={developer.email}
                                            target='_blank'>
                                            <IoIosMail />
                                        </a>

                                        <a
                                            className=' '
                                            href={developer.portfolioLink}
                                            title={developer.portfolioLink}
                                            target='_blank'>
                                            <FaUserCircle />
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <figure className="md:flex-1">
                                <Image
                                    height={500}
                                    width={500}
                                    src={developer.image}
                                    className='aspect-square w-full rounded-2xl object-cover'
                                    alt={`Image of ${developer?.name}`} />

                            </figure>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
