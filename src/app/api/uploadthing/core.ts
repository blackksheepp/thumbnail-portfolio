import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadFileRouter = {
    imageUploader: f({ image: { maxFileSize: "16MB" } })
        .onUploadComplete(async ({ metadata, file }) => {
            return {};
        }),
} satisfies FileRouter;

export type UploadFileRouter = typeof uploadFileRouter;
