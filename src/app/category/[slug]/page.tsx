"use client";
import { NavBar } from "@/app/components";
import { GetCategory } from "@/app/server/database/queries";
import { Categories } from "@/app/server/database/schema/categories";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Category() {
    const params = useParams();
    const slug = params.slug;
    const [name, id] = (slug as string).split('-');
    const [category, setCategory] = React.useState<Categories | null>(null);
    
    useEffect(() => {
        GetCategory(Number(id)).then((data) => {
            console.log(data);
            if (data) {
                setCategory(data);
            }
        });
    }, [])

    return (
        <>
            <NavBar scrolled={false} />
            <div className="bg-[url('/img/bg.avif')] bg-contain mix-blend-screen opacity-40 scale-x-[200%] absolute w-full h-full -z-10 pointer-events-none"></div>

            <div className="~pt-24/52 ~px-8/32">
                <p className="text-white ~text-3xl/7xl font-semibold font-primary">{name.toUpperCase()}</p>
                <div className=" w-full ~p-4/8 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {category && category.thumbs && category.thumbs.map((thumb, index) => (
                        <Image
                            key={index}
                            src={thumb}
                            alt=""
                            width={0}
                            height={0}
                            sizes='100vw'
                            className="w-full h-auto object-cover pointer-events-none"
                            priority
                        />
                    ))}
                </div>
            </div>
        </>
    )
}