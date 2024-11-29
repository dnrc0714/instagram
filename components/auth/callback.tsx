import { saveUserProfile } from "actions/kakaoActions";

export default async function CallBack(session) {
    const userId = session?.user?.id;
    const providerToken = session?.provider_token
    let response
    let profile
    let profileImageUrl = "";
    let name
    console.log("!!!!!!!!!!!!!!");
    console.log("123" + providerToken);
    console.log("11111111111111");
    if(providerToken != null && providerToken !== undefined && providerToken != '') {
        const kakaoCallBack = async () => {
            response = await fetch(process.env.NEXT_KAKAO_PROFILE_REST_API, {
                headers: {
                    Authorization: `Bearer ${providerToken}`,
                },
            });
            kakaoCallBack();
        }
    
        profile = await response.json();
        profileImageUrl = profile.properties?.thumbnail_image;
        name = profile.properties?.nickname;
    } else {
        name = session?.user?.user_metadata?.name
    }

    
    
    
    return saveUserProfile(profileImageUrl, userId, name);
}