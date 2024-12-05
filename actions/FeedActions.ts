'use server'

import { createServerSupabaseClient } from "utils/supabase/server";

export async function savePost(content){
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성

    const {data : { session }, error} = await supabase.auth.getSession();

    if(error && !session.user) {
        throw new Error("User is not authenticated");
    }

    // 'profile' 테이블에서 사용자 ID로 프로필 이미지를 업데이트 또는 삽입
    const { data: postData, error: postSaveError } = await supabase
        .from('posts')
        .insert([
            {
                content: content,
            },
        ])
        .select('id')
        .single();  // 'profile' 테이블

    if(postSaveError) {
        throw new Error(postSaveError.message);
    }

    return postData;
}

export async function getUserFeed({ userId, page, pageSize }) {
    const supabase = await createServerSupabaseClient();

    const {data, count, error: getFeedError} = await supabase.from('posts')
                                        .select(`id, content, created_at, attachments(file_url)`, { count: "exact" })
                                        .eq('creator_id', userId)
                                        .range((page - 1) * pageSize, page * pageSize - 1);


    if (getFeedError || (count === null || (page - 1) * pageSize >= count)) {
        console.error(getFeedError.message);
        return {
            data: [],
            count: 0,
            page: null,
            pageSize: null,
            getFeedError,
        };
    }
    
    const hasNextPage = page < Math.ceil(count / pageSize);

    return {
        data,
        page,
        pageSize,
        hasNextPage,
    };
}