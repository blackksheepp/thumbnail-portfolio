"use server";

export const validatePassword = async (password: string) => {
    const correctPassword = process.env.PASSWORD;
    return password === correctPassword;
};