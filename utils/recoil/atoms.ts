import { atom } from "recoil";

export const searchState = atom({
    key : "searchState",
    default : "",
});

export const selectedUserState = atom({
    key : "selectedUserState",
    default : null
})

export const presenceState = atom({
    key: "presenceState",
    default : null
})

export const loggedUserState = atom({
    key: "loggedUserState",
    default : null
})