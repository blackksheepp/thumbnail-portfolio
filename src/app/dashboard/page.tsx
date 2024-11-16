"use client";
import React, { useEffect, useRef, useState } from "react";
import AddCategory from "./components/AddCategory";
import { GetCategories, ReOrderCategories } from "../server/database/queries";
import { Categories } from "../server/database/schema/categories";
import Category from "./components/Category";
import { dragAndDrop } from "@formkit/drag-and-drop/react";
import WithAuth from "../components/withAuth";

function Dashboard() {
    const [newCategory, setNewCategory] = useState(false);
    const [collapse, setCollapse] = useState(false);

    const parentRef = useRef<HTMLDivElement>(null);
    const [categories, setCategories] = useState<Categories[]>([]);

    const getCategories = async () => {
        const resp = await GetCategories();
        const sorted = resp.sort((a, b) => a.order - b.order);
        setCategories(sorted);
    }

    useEffect(() => {
        getCategories()
    }, [newCategory])

    dragAndDrop({
        parent: parentRef,
        state: [categories, setCategories],
        'group': 'categories',
        'dragHandle': '.category.ri-draggable',
        onDragstart: (data) => {
            setCollapse(true)
        },
        onDragend: (data) => {
            ReOrderCategories(data.values.flatMap((category) => (category as Categories).name))
            setTimeout(() => setCollapse(false), 1000)
        },
    });
    return (
        <>
            <nav className="bg-black w-full flex flex-row items-center justify-between ~mt-8/14 ~px-12/32 font-primary ~sm/lg:~text-lg/2xl">
                <p><span className="text-teal-500">ADMIN</span>DASHBOARD</p>
            </nav>

            <div className="absolute w-full h-screen mt-14 ~px-8/32 flex flex-col gap-7">
                <div className="w-full flex flex-row items-center justify-between text-white font-semibold bg-gray-900 py-3 ~px-3/7 rounded-lg">
                    <p><i className="ri-add-line text-white text-xl"></i>Add a new Category</p>
                    <button onClick={() => setNewCategory(!newCategory)} disabled={newCategory} className="bg-teal-500 disabled:bg-gray-500 disabled:pointer-events-none py-1.5 px-3 rounded-lg cursor-pointer">New</button>
                </div>

                {newCategory && (<AddCategory setNewCategory={setNewCategory} />)}

                <div ref={parentRef} className="mt-8">
                    {categories.flatMap((category) => {
                        return (
                            <div key={category.order} data-label={category.order}>
                                <Category key={category.order} category={category} collapse={collapse} reload={getCategories} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default WithAuth(Dashboard);