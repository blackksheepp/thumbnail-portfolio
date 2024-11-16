'use server'
import sharp from 'sharp';

export const ConvertToAvif = async (file: File): Promise<Blob> => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const avifBuffer = await sharp(buffer)
        .avif({ quality: 75 })
        .toBuffer();

    return new Blob([avifBuffer], { type: "image/avif" })
}