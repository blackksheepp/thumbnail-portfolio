import React, { useState, useRef, FC, useEffect } from 'react';
import Image from 'next/image';
import { ImageInput } from '@/app/components/ImageInput';
import { RemoveThumbnail, ReplaceThumbnail } from '@/app/server/database/queries';

export interface UploadThumbProps {
    uploaded?: string,
    pos?: number,
    key: number,
    reload?: () => void,
    category?: string
    disabled?: boolean
    last?: boolean
    addThumbnail?: () => void
}

export const UploadThumb: FC<UploadThumbProps> = ({ uploaded, pos: i, reload, category, disabled, last, addThumbnail }) => {
    const thumbRef = useRef<HTMLInputElement>(null);
    const [thumb, setThumb] = useState<File>();
    const [thumbUrl, setThumbUrl] = useState("");
    const [replace, setReplace] = useState(false);
    const [replaceUrl, setReplaceUrl] = useState("");

    const uploadThumb = () => {
        thumbRef.current?.click();
    }

    return (
        <div className={`w-full flex flex-col md:flex-row items-start justify-between gap-3 md:gap-5 text-white font-semibold bg-gray-900 ${uploaded ? 'py-4 px-5' : 'py-5 px-6'} rounded-lg`}>
            <div className="w-fit flex flex-col md:flex-row gap-6">
                <div className={`${uploaded ? 'w-full h-auto md:w-auto md:h-24' : 'h-36'} relative`}>
                    <ImageInput file={thumb} setFile={setThumb} setImageUrl={setThumbUrl} ref={thumbRef} name={category} disabled={disabled || thumbUrl !== ""} callback={reload!} replace={replace} replaceUrl={replaceUrl} />
                    <Image
                        src={thumbUrl === "" ? uploaded ? uploaded : "/img/thumb-placeholder.avif" : thumbUrl}
                        alt='logo'
                        width={0}
                        height={0}
                        sizes='100vh'
                        className="h-full w-auto cursor-pointer"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {uploaded
                        ? (
                            <div className="">
                                <p>Position {i! + 1}</p>
                                <div className="w-full flex flex-row items-center justify-between gap-2.5">
                                    <div className="flex flex-row gap-4">
                                        <button disabled={disabled} onClick={() => {
                                            setReplaceUrl(uploaded!)
                                            setReplace(true);
                                            uploadThumb();
                                        }} className="w-fit bg-teal-500 disabled:bg-gray-500 disabled:pointer-events-none py-1 px-5 rounded-lg select-none cursor-pointer">Replace</button>
                                        <button disabled={disabled} onClick={() => {
                                            RemoveThumbnail(category!, uploaded)
                                            reload!()
                                        }} className="w-fit bg-teal-500 disabled:bg-gray-500 disabled:pointer-events-none py-1 px-5 rounded-lg select-none cursor-pointer">Delete</button>
                                    </div>
                                    {uploaded && <i className="ri-draggable cursor-move text-teal-500 text-3xl md:hidden"></i>}
                                </div>
                            </div>
                        )
                        : (
                            <>
                                <p>{thumb ? `${thumb.name} Uploaded!` : "Upload a Thumbnail"}</p>
                                {!thumb && <button disabled={disabled} onClick={uploadThumb} className="w-fit bg-teal-500 disabled:bg-gray-500 disabled:pointer-events-none py-1 px-5 rounded-lg select-none cursor-pointer">Upload</button>}
                            </>
                        )
                    }
                </div>
            </div>
            <div className="w-fit flex flex-row gap-4 justify-end">
                {last && (
                    <div className="flex flex-col gap-2 md:items-end">
                        <p>Add Another Thumbnail</p>
                        <button disabled={disabled || (uploaded ? false : thumbUrl === "")} onClick={addThumbnail} className="w-fit bg-teal-500 disabled:bg-gray-500 disabled:pointer-events-none py-1 px-5 rounded-lg cursor-pointer">Add Another</button>
                    </div>
                )}
                {uploaded && <i className="ri-draggable cursor-move text-teal-500 text-3xl py-6 hidden md:block"></i>}
            </div>
        </div>
    )
}

