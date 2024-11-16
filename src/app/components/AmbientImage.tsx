import React from 'react'
import Image from 'next/image'

export const AmbientImage = ({ src, className, style }: { src: string, className: string, style?: any }) => {
    return (
        <div className="relative grid place-items-center cursor-zoom-in group" style={style}>
            <Image
                src={src}
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className={`~sm/md:~w-[24rem]/[29rem] ~md/2xl:~w-[20rem]/[34rem] h-auto absolute z-10 object-cover rounded-lg peer hover:scale-125 md:hover:scale-150 hover:z-20 transition-all ease-in-out duration-500 ${className}`}
                priority
            />
            <Image
                src={src}
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className={`~sm/md:~w-[24rem]/[29rem] ~md/2xl:~w-[20rem]/[34rem] h-auto object-cover ~blur-[1.2rem]/[2.5rem] pointer-events-none peer-hover:scale-125 md:peer-hover:scale-150 transition-all ease-in-out duration-500 ${className}`}
                priority
            />
        </div>
    )
}
