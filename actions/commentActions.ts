'use server'

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
    if(error) {
        console.log(error);
        throw error;
    }
}

export async function getComments(postId) {
    const supabase = await createServerSupabaseClient();

    const {data, error} = await supabase.from("comments")
                                            .select(`
                                                id,
                                                comment,
                                                created_at,
                                                creator_id,
                                                modified_at,
                                                post_id,
                                                posts:post_id (creator_id),
                                                profile:creator_id (id, name, profile_img_url)
                                            `)
                                            .eq("post_id", postId)
                                            .is('parent_id', null)
                                            .order("created_at", { ascending: true });

    handleError(error);
    
    return data;
}

export async function saveComment({comment, postId}) {
    const supabase = await createServerSupabaseClient();

    const {data: {user} } = await supabase.auth.getUser();

    const {data, error} = await supabase.from("comments")
                                        .insert([{
                                            post_id : postId,
                                            comment : comment,
                                            creator_id: user?.id,
                                            created_at: new Date().toISOString(),
                                            modified_at: new Date().toISOString()
                                        }]);

    handleError(error);

    return data;
}

export async function deleteComment(id) {
    const supabase = await createServerSupabaseClient();
    const {data: {user} } = await supabase.auth.getUser();

    const {data, error} = await supabase.from("comments").delete().eq('id', id).or(`creator_id.eq.${user?.id},posts.creator_id.eq.${user?.id}`);


    handleError(error);

    return true;
}

export async function updateComment({comment, id}) {
    const supabase = await createServerSupabaseClient();

    const {data: {user} } = await supabase.auth.getUser();

    const {data, error} = await supabase.from("comments")
                                        .update({
                                            comment: comment,
                                            modified_at: new Date().toISOString()
                                        })
                                        .eq('id', id)
                                        .eq('creator_id', user?.id);
    
    handleError(error);

    return true;
}

export async function saveReply({comment, postId, parentId}) {
    const supabase = await createServerSupabaseClient();

    const {data: {user} } = await supabase.auth.getUser();

    const {data, error} = await supabase.from("comments")
                                        .insert([{
                                            post_id : postId,
                                            comment : comment,
                                            parent_id: parentId,
                                            creator_id: user?.id,
                                            created_at: new Date().toISOString(),
                                            modified_at: new Date().toISOString()
                                        }]);

    handleError(error);

    return data;
}

export async function getReplies({postId, parentId}) {
    const supabase = await createServerSupabaseClient();

    const {data, error} = await supabase.from("comments")
                                            .select(`
                                                id,
                                                comment,
                                                created_at,
                                                modified_at,
                                                parent_id,
                                                creator_id,
                                                post_id,
                                                posts:post_id (creator_id),
                                                profile:creator_id (id, name, profile_img_url)
                                            `)
                                            .eq("post_id", postId)
                                            .eq("parent_id", parentId)
                                            .order("created_at", { ascending: true });

    handleError(error);
    
    return data;
}