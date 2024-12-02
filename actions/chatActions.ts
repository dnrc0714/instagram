"use server"

import { createServerSupabaseClient } from "utils/supabase/server"

export async function sendMessage({
    message,
    chatUserId
}) {
    const supabase = await createServerSupabaseClient();

    const {data : { session }, error} = await supabase.auth.getSession();

    if(error && !session.user) {
        throw new Error("User is not authenticated");
    }

    const {data, error: sendMessageError} = await supabase.from('message').insert({
        message : message,
        receiver : chatUserId,
        sender : session.user.id
    });

    if(sendMessageError) {
        throw new Error(sendMessageError.message);
    }

    return data;
}

export async function getAllMessages({
    chatUserId
}) {
    const supabase = await createServerSupabaseClient();
    const {data : { session }, error} = await supabase.auth.getSession();

    if(error && !session.user) {
        throw new Error("User is not authenticated");
    }

    const {data, error: getMessagesError} = await supabase.from("message")
                                                        .select('*')
                                                        .or(`receiver.eq.${chatUserId}, receiver.eq.${session.user.id}`)
                                                        .or(`sender.eq.${chatUserId}, sender.eq.${session.user.id}`)
                                                        .order('created_at', {ascending: true});

    if (getMessagesError) {
        return [];
        }
    
    return data;
}