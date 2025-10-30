import React from 'react'
import Banner from './components/Banner'
import DevelopersContainer from './components/DevelopersContainer'

export default function page() {
    // https://i.ibb.co.com/xwfFrXB/kanak.png
    // https://i.ibb.co.com/G3HQz3bd/afroja.png
    // https://i.ibb.co.com/21VH40yc/aysha.png
    // https://i.ibb.co.com/DPP1HNvP/zunayed.png
    // https://i.ibb.co.com/N2ggcrNH/zingring.png
    // https://i.ibb.co.com/gMNkMSrL/mustakim.png
    // https://i.ibb.co.com/S7ckddxH/Profile-Md-Imran-Hossen-Jia-Pixel.jpg
    const developerInfo = [
        {
            id: 1,
            image: "https://i.ibb.co.com/S7ckddxH/Profile-Md-Imran-Hossen-Jia-Pixel.jpg",
            name: 'Md Imran Hossen',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/MdImranHossen01',
            portfolioLink: '',
            email: 'example@gmail.com',
            lastEdu: {
                institute: "Government Titumir College",
                degree: "MBA, Finance and Banking",
                date: "Jan 2015 - Dec 2022",
            }
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/xwfFrXB/kanak.png",
            name: 'Kanak Ray',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/Captain-Kanak',
            portfolioLink: '',
            email: 'example@gmail.com',
            lastEdu: {
                institute: "Government Titumir College",
                degree: "MBA, Finance and Banking",
                date: "Jan 2015 - Dec 2022",
            }
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/gMNkMSrL/mustakim.png",
            name: 'Md Mustakim',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/mustakim67',
            portfolioLink: '',
            email: 'example@gmail.com',
            lastEdu: {
                institute: "Government Titumir College",
                degree: "MBA, Finance and Banking",
                date: "Jan 2015 - Dec 2022",
            }
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
            lastEdu: {
                institute: "Barishal Polytechnic Institute",
                degree: "Diploma in Electrical Engineering",
                date: "Jan 2023 - Present",
            }
        },
        {
            id: 5,
            image: 'https://i.ibb.co.com/G3HQz3bd/afroja.png',
            name: 'Afroza Akter',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/Afroza-Nipa13',
            portfolioLink: '',
            email: 'example@gmail.com',
            lastEdu: {
                institute: "Government Titumir College",
                degree: "MBA, Finance and Banking",
                date: "Jan 2015 - Dec 2022",
            }
        },
        {
            id: 6,
            image: 'https://i.ibb.co.com/N2ggcrNH/zingring.png',
            name: 'Zingrin Lonchen',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/zingrin',
            portfolioLink: '',
            email: 'example@gmail.com',
            lastEdu: {
                institute: "Government Titumir College",
                degree: "MBA, Finance and Banking",
                date: "Jan 2015 - Dec 2022",
            }
        },
        {
            id: 7,
            image: 'https://i.ibb.co.com/21VH40yc/aysha.png',
            name: 'Ayasha Akter',
            position: 'Full-stack Developer',
            linkedInLink: '',
            gitHubLink: 'https://github.com/nipaayasha05',
            portfolioLink: '',
            email: 'example@gmail.com',
            lastEdu: {
                institute: "Government Titumir College",
                degree: "MBA, Finance and Banking",
                date: "Jan 2015 - Dec 2022",
            }
        },
    ]
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to bottom, #00001190, #000011), url(/binary_effect_background.webp)`
            }}
            className="bg-fixed bg-cover">
            <Banner />
            <DevelopersContainer developerInfo={developerInfo} />

        </div>
    )
}
