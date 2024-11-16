import React, { FC } from 'react'
import { AmbientImage } from '../AmbientImage'

interface CarouselProps {
  images: string[]
}

export const Carousel: FC<CarouselProps> = ({ images }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center ~gap-10/16 sm:gap-3 w-full">
      <div className="rotate-left">
        <AmbientImage
          src={images[0] || "/img/thumb-placeholder.avif"}
          className=''
        />
      </div>
      <div className="center-image">
        <AmbientImage
          src={images[1] || "/img/thumb-placeholder.avif"}
          className=' duration-500'
        />
      </div>
      <div className="rotate-right">
        <AmbientImage
          src={images[2] || "/img/thumb-placeholder.avif"}
          className=''
        />
      </div>
    </div>
  )
}
