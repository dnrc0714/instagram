import { saveUserProfileImage } from "actions/kakaoActions";

export default async function CallBack(session) {
    const userId = session?.user?.id;
    const providerToken = session?.provider_token

    const response = await fetch(process.env.NEXT_KAKAO_PROFILE_REST_API, {
        headers: {
            Authorization: `Bearer ${providerToken}`,
        },
    });

    const profile = await response.json();
    const profileImageUrl = profile.properties?.thumbnail_image;
    
    return saveUserProfileImage(profileImageUrl, userId);
}