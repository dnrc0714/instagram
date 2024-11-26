'use server'

import { createServerSupabaseClient } from "utils/supabase/server"

function handleError(error) {
    if(error) {
        console.log(error);
        throw error;
    }
}

export async function saveUserProfileImage(profileImageUrl: string, userId: string) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성

    // 'profile' 테이블에서 사용자 ID로 프로필 이미지를 업데이트 또는 삽입
    const { data, error } = await supabase
        .from('profile')  // 'profile' 테이블
        .upsert(
            { id: userId, profile_img_url: profileImageUrl },  // 'id'와 'profile_img_url' 데이터
        ).select();

    if (error) {
        console.error('Error saving profile image:', error);
    } else {
        console.log('Profile image saved:', data);
    }
}