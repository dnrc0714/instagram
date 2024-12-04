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

export async function getUserProfile() {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성
    const {data: {user} } = await supabase.auth.getUser();
    const safeUserId = isUUID(user?.id) ? user?.id : uuidv4(); // 유효하지 않으면 새로운 UUID 생성

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