"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface NavBarProps {
    scrolled: boolean
}

export const NavBar: FC<NavBarProps> = ({ scrolled }) => {
    return (
        <nav className={`z-[100] bg-black bg-opacity-0 fixed w-full flex flex-row items-center justify-between ~py-6/12 ~px-8/32 font-primary ~sm/lg:~text-base/2xl ~text-lg/3xl ${scrolled && 'bg-opacity-35 backdrop-blur-xl'}`}>
            <Link href='/'> <p>SAHARSH<span className="text-teal-500">PNG</span></p></Link>
            <Image
                src="/png.svg"
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className="~w-6/8 h-auto"
            />
            <p>CONTACT</p>
        </nav>
    )
}
