"use client";

import { FC, useEffect, useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import type { UploadFileRouter } from "../api/uploadthing/core";
import { AddThumbnail, ReplaceThumbnail } from "../server/database/queries";
import { ConvertToAvif } from "../server/utils/ImageConversion";

const { useUploadThing } = generateReactHelpers<UploadFileRouter>();

interface ImageInputProps {
    ref?: React.RefObject<HTMLInputElement>,
    name: string | undefined,
    disabled?: boolean,
    file: File | undefined,
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    callback: () => void,
    replace?: boolean,
    replaceUrl?: string

}
export const ImageInput: FC<ImageInputProps> = ({ file, setFile, setImageUrl, ref, name, disabled, callback, replace, replaceUrl}) => {
    useEffect(() => {
        if (file) {
            ConvertToAvif(file).then((blob) => {
                const newFile = new File(
                    [blob],
                    file.name.replace(/\.[^/.]+$/, "") + ".avif",
                    {
                        type: "image/avif",
                        lastModified: file.lastModified
                    }
                );
                startUpload([newFile]);
            })
        }
    }, [file])

    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            const url = res[0].url;
            if (name) {
                if (replace) {
                    ReplaceThumbnail(name, replaceUrl!, url);
                } else {
                    AddThumbnail(name, url);
                }
            } else {
                console.error("ImageInput: name is undefined");
            }
            setImageUrl(url);
            callback();
        },
        onUploadError: (error) => {
            console.error("Upload error:", error);
        },
    });

    return (
        <input
            ref={ref}
            type="file"
            onChange={(e) => {
                if (e.target.files) {
                    setFile(e.target.files?.[0]);
                }
            }}
            required
            name={name}
            disabled={disabled}
            className="absolute z-40 w-full h-full opacity-0 outline-none cursor-pointer"
            accept=".jpg,.jpeg,.png,.webp,.avif,.gif"
        />
    );
}