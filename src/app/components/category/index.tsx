import React, { FC } from 'react'
import { Carousel } from '../carousel'
import { Categories } from '@/app/server/database/schema/categories'
import Link from 'next/link'

interface CategoryProps {
  category: Categories
}

const Category: FC<CategoryProps> = ({ category }) => {
  if (!category.thumbs || category.thumbs.length < 1) return null

  return (
    <div className="~mt-20/64 w-full flex flex-col items-center justify-center ~sm/lg:~gap-10/20 ~lg/2xl:~gap-10/20">
      <div className="w-full flex flex-col items-start cursor-pointer">
      <Link target='_blank' href={`/category/${category.name}-${category.id}`}>
          <p className="text-white  ~sm/lg:~text-lg/3xl ~text-lg/4xl font-semibold font-primary">{category.name.toUpperCase()}</p>
          <p className="text-teal-500 ~text-sm/xl font-semibold">Show All</p>
      </Link>
      </div>
      <Carousel images={category.thumbs.slice(0, 3)} />
    </div>
  )
}

export default Category