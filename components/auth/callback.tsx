import { saveUserProfile } from "actions/userActions";

export default async function CallBack(session) {
    const userId = session?.user?.id;
    const providerToken = session.provider_token
    let profileImageUrl = "";
    let name
    
    if(providerToken) {
            const response = await fetch(process.env.NEXT_KAKAO_PROFILE_REST_API, {
                headers: {
                    Authorization: `Bearer ${providerToken}`,
                },
            });

            const profile = await response.json();
            profileImageUrl = profile.properties?.thumbnail_image;
            name = profile.properties?.nickname;
            return saveUserProfile(profileImageUrl, userId, name);        
    } else {
        name = session?.user?.user_metadata?.name
        return saveUserProfile(profileImageUrl, userId, name);
    }

    
    
    
}