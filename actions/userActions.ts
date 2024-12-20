'use server'

import { createServerSupabaseClient } from "utils/supabase/server"
import { v4 as uuidv4, validate as isUUID } from "uuid";

function handleError(error) {
    if(error) {
        console.log(error);
        throw error;
    }
}

export async function saveUserProfile(profileImageUrl: string, userId, name) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성

    // 'profile' 테이블에서 사용자 ID로 프로필 이미지를 업데이트 또는 삽입
    const { data, error } = await supabase
        .from('profile')  // 'profile' 테이블
        .upsert(
            { id: userId, profile_img_url: profileImageUrl, name: name }  // 'id'와 'profile_img_url' 데이터
        ).select();

        handleError(error);
}

export async function getUserProfile(userId) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성
    const safeUserId = isUUID(userId) ? userId : uuidv4(); // 유효하지 않으면 새로운 UUID 생성

    const {data, error} = await supabase.rpc('get_user_info', {
        user_id: safeUserId
    }).maybeSingle();

    handleError(error);

    return data;
}

export async function getAllUser() {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성

    const {data, error} = await supabase.from("profile")
                                        .select(`id,
                                            profile_img_url,
                                            name
                                            `);
                                            
    handleError(error);

    return data;
}

export async function searchUsers({ search, page, pageSize }) {
    if (search == null || search === undefined || search == '') {
        return { data: [],
            count: 0,
            page: null,
            pageSize: null, }; // 빈 결과 반환
    }
    const supabase = await createServerSupabaseClient();

    const { data, count, error } = 
    await supabase
        .from("profile")
        .select("*", { count: "exact" })
        .like("name", `%${search}%`)
        .range((page - 1) * pageSize, page * pageSize - 1);
    
    const hasNextPage = page < Math.ceil(count / pageSize);
    
    if (error) {
        console.error(error);
        return {
            data: [],
            count: 0,
            page: null,
            pageSize: null,
            error,
        };
    }

    return {
        data,
        page,
        pageSize,
        hasNextPage,
    };
}

export async function updateSecret(secretTp) {
    const supabase = await createServerSupabaseClient();
    const {data: {user}} = await supabase.auth.getUser();

    const { data, error} = await supabase.from('profile')
                                        .update({
                                            secret_tp: secretTp
                                        })
                                        .eq('id', user.id);
}