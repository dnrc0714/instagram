// 'use server'

// import { List } from "postcss/lib/list";
// import { createServerSupabaseClient } from "utils/supabase/server";

// export default async function saveAttachment(attachments: Attachments){
//     const supabase = await createServerSupabaseClient(); 

//     const results = await Promise.all(attachments.map(attachment =>
//         supabase.from('attachments')
//                 .insert([
//                     {
//                         post_id: attachment.postId,
//                         file_url: attachment.url,
//                         file_name: attachment.fileName
//                     },
//                 ]
//             )
//         )
//     );
//     return results;
// }