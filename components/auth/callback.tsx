import { saveUserProfile } from "actions/kakaoActions";

export default async function CallBack(session) {
    const userId = session?.user?.id;
    const providerToken = session.provider_token
    let response
    let profile
    let profileImageUrl = "";
    let name
    console.log(providerToken);
    if(providerToken) {
        const kakaoCallBack = async () => {
            response = await fetch(process.env.NEXT_KAKAO_PROFILE_REST_API, {
                headers: {
                    Authorization: `Bearer ${providerToken}`,
                },
            }).then(async function (res) {
                profile = await res.json();
                profileImageUrl = profile.properties?.thumbnail_image;
                name = profile.properties?.nickname;

                return saveUserProfile(profileImageUrl, userId, name);        
            });
            kakaoCallBack();
        }
    
        
    } else {
        name = session?.user?.user_metadata?.name
        return saveUserProfile(profileImageUrl, userId, name);
    }

    
    
    
}