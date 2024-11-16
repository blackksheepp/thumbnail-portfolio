import React, { FC, useEffect, useState } from 'react'
import { UploadThumbProps, UploadThumb } from './UploadThumb';
import { CreateCategory } from '@database/queries';

interface AddCategoryProps {
    setNewCategory: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCategory: FC<AddCategoryProps> = ({ setNewCategory }) => {
    const [name, setName] = useState("");
    const [ready, setReady] = useState(false);

    function addThumbnail() {
        setThumbnails((prevThumbnails) => [
            ...prevThumbnails.slice(0, -1),
            { key: prevThumbnails.length - 1 },
            { key: prevThumbnails.length, last: true, addThumbnail: addThumbnail },
        ]);
    }

    const n = 1;
    const [thumbnails, setThumbnails] = useState<UploadThumbProps[]>(Array.from({ length: n }, (_, i) => {
        return {
            key: i,
            last: i === n - 1,
            addThumbnail: addThumbnail
        } as UploadThumbProps
    }));


    const submitNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Category Created!");

        setNewCategory(false);
    }

    const handleReady = () => {
        if (name != "") {
            setReady(true);
            CreateCategory(name);
        }
    }

    return (
        <form onSubmit={submitNewCategory} className="flex flex-col gap-5">
            <div className="w-full flex flex-row items-center justify-between text-white font-semibold bg-gray-900 py-3 px-7 rounded-lg">
                <div className="w-full flex flex-row items-center">
                    <i onClick={() => setNewCategory(false)} className="ri-close-fill text-2xl mr-2 text-teal-500"></i> 
                    <input value={name} disabled={ready} onChange={(e) => setName(e.target.value)} id="name" type="text" required name="name" className="w-1/4 md:w-1/4 bg-gray-900 outline-none" placeholder="Category Name" autoFocus />
                    <i onClick={handleReady} className="ri-check-double-line text-2xl ml-2 text-teal-500 cursor-pointer"><span className="font-primary text-sm font-thin select-none">{!ready ? "Confirm" : "Confirmed"}</span></i>
                </div>
                <button type="submit" className="bg-teal-500 py-1.5 px-3 rounded-lg cursor-pointer">Add</button>
            </div>

            <div id="thumbnails" className="flex flex-col gap-5">
                {thumbnails.flatMap((thumbnail) => (
                    <UploadThumb key={thumbnail.key} category={name} disabled={!ready} last={thumbnail.last} addThumbnail={thumbnail.addThumbnail} />
                ))}
            </div>
        </form>
    )
}

export default AddCategory