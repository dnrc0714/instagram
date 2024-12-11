"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
    if(error) {
        console.log(error);
        throw error
    }
}
export async function uploadFile(formData: FormData, savePath) {
    const supabase = await createServerSupabaseClient();

    const files = Array.from(formData.entries()).map(([name, file]) => file as File);

    const results = await Promise.all(files.map(file => 
                                        supabase.storage
                                        .from(savePath)
                                        .upload(file.name, file, {upsert: true})
    ));

    return results;
}

export async function searchFiles(search: string = "") {
    const supabase = await createServerSupabaseClient();
    const {data: files, error} = await supabase.storage
                                        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
                                        .list(null);

    handleError(error);

    const filteredFiles = files.filter(file => file.name.includes(search));

    return filteredFiles;
}

export async function deleteFile(filePath) {
    const supabase = await createServerSupabaseClient();
    const {data, error} = await supabase.storage
                                        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
                                        .remove(filePath);

    handleError(error);
    console.log(data);
    console.log(filePath)

    return data;                                   
}