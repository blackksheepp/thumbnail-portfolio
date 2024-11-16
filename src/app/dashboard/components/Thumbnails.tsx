import React, { FC, useEffect, useRef, useState } from 'react'
import { UploadThumb, UploadThumbProps } from './UploadThumb'
import { dragAndDrop } from '@formkit/drag-and-drop/react'
import { ReOrderThumbnails } from '@/app/server/database/queries'

interface ThumbnailsProps {
    category: string,
    thumbnails: string[],
    reload: () => void
}

const removeDuplicates = (arr: UploadThumbProps[]) => {
    return arr.filter((item, index) => {
        return arr.findIndex((i) => i.uploaded === item.uploaded) === index
    })
}

const removeDuplicateThumbs = (arr: string[]) => {
    return Array.from(new Set(arr))
}


const Thumbnails: FC<ThumbnailsProps> = ({ category, thumbnails, reload }) => {
    const [disable, setDisable] = useState(false)

    const parentRef = useRef<HTMLDivElement>(null)
    const [thumbs, setThumbs] = useState<UploadThumbProps[]>([])

    dragAndDrop({
        parent: parentRef,
        state: [thumbs, setThumbs],
        'group': 'thumbnails',
        'dragHandle': '.ri-draggable',
        onDragstart: () => {
            setDisable(true)
        },
        onDragend: () => {
            setDisable(false)
            ReOrderThumbnails(category, removeDuplicateThumbs(thumbs.flatMap((thumb) => thumb.uploaded!)))
            reload()
        }
    });


    function addThumbnail() {
        setThumbs((prevThumbs) => removeDuplicates([
            ...prevThumbs.slice(0, -1),
            { key: prevThumbs.length - 1, uploaded: thumbnails.slice(-1)[0] },
            { key: prevThumbs.length, last: true, addThumbnail: addThumbnail },
        ]));
    }


    useEffect(() => {
        setThumbs(removeDuplicates(thumbnails.flatMap((thumb, i) => {
            return {
                key: i,
                uploaded: thumb,
                last: i === thumbnails.length - 1,
                addThumbnail: addThumbnail
            } as UploadThumbProps
        })))
    }, [thumbnails])

    return (
        <div ref={parentRef} className="w-full flex flex-col gap-5">
            {thumbs.flatMap((thumb) => {
                return (
                    <div key={thumb.key} data-label={thumb}>
                        <UploadThumb key={thumb.key} uploaded={thumb.uploaded} pos={thumb.key} category={category} reload={reload} disabled={disable} last={thumb.last} addThumbnail={thumb.addThumbnail} />
                    </div>
                )
            })}
        </div>
    )
}

export default Thumbnails