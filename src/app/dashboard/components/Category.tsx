import { Carousel } from '@/app/components';
import React, { FC, useEffect, useState } from 'react'
import Thumbnails from './Thumbnails';
import { Categories } from '@/app/server/database/schema/categories';
import { GetThumbnails, RemoveCategory } from '@/app/server/database/queries';

interface CategoryProps {
    category: Categories,
    collapse: boolean,
    reload: () => void
}

const Category: FC<CategoryProps> = ({ category, collapse, reload }) => {
    const [thumbnails, setThumbnails] = useState<string[]>([])

    const getThumbnails = async () => {
        const resp = await GetThumbnails(category.name);
        if (resp) {
            setThumbnails(resp);
        }
    }

    useEffect(() => {
        if (!collapse) getThumbnails()
    }, [])

    return (
        <div className={`${collapse ? '~pb-6/12' : '~pb-14/24'} w-full flex flex-col items-center justify-center ~sm/lg:~gap-10/20`}>
            <div className={`${collapse && 'bg-gray-900 rounded-lg px-6 py-1'} w-full flex flex-row items-center justify-between`}>
                <div className="w-full flex flex-col items-start cursor-pointer">
                    <p className="text-white ~text-2xl/4xl font-semibold">{category.name}
                    </p>
                    <p className="text-teal-500 ~text-lg/xl font-semibold">Edit & Arrange</p>
                </div>
                <i className="category ri-draggable cursor-move ~text-3xl/5xl py-6 hidden md:block"></i>
                <i onClick={() => {
                    RemoveCategory(category.id!);
                    reload();
                }} className="ri-delete-bin-6-line cursor-pointer ~text-2xl/4xl py-6 hidden md:block text-teal-500"></i>
            </div>
            {!collapse && (
                <>
                    <div className="w-[80%]">
                        <Carousel images={thumbnails} />
                    </div>
                    <Thumbnails thumbnails={thumbnails} category={category.name} reload={getThumbnails} />
                </>
            )}
        </div>
    )
}

export default Category