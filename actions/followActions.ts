'use server'

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
    if(error) {
        console.log(error);
        throw error;
    }
}

export async function saveFollow(followerId) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase.from('follows')
                                .insert([{
                                    follower_id:followerId,
                                    following_id: user.id
                                }]);
    handleError(error);

    return data;
}

export async function deleteFollow(followerId) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase.from('follows')
                                        .delete()
                                        .eq('follower_id', followerId)
                                        .eq('following_id', user.id);
    handleError(error);

    return data;
}

export async function getFollwerList({userId, page, pageSize}) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성

    const {data, count, error} = await supabase.from('follows')
                                        .select(`
                                            profile:following_id (id, name, profile_img_url)
                                        `)
                                        .eq('follower_id', userId)
                                        .eq('follow_st', true)
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

export async function getFollwingList({userId, page, pageSize}) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성

    const {data, count, error} = await supabase.from('follows')
                                            .select(`
                                                profile:follower_id (id, name, profile_img_url)
                                            `)
                                            .eq('following_id', userId)
                                            .eq('follow_st', true)
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

export async function followingChk(followerId) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase.from('follows')
                                        .select('*')
                                        .eq('follower_id', followerId)
                                        .eq('following_id', user.id);

    handleError(error);

    return !!(data && data.length > 0);
}

export async function followChk(followingId) {
    const supabase = await createServerSupabaseClient(); // 서버에서 Supabase 클라이언트 생성
    const {data: {user}} = await supabase.auth.getUser();

    const {data, error} = await supabase.from('follows')
                                        .select('*')
                                        .eq('following_id', followingId) 
                                        .eq('follower_id', user.id);

    handleError(error);

    return !!(data && data.length > 0);
}