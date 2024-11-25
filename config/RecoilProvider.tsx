"use client";

import { RecoilRoot } from "recoil";

export default function ReactQueryClientProvider({
    children,
}: React.PropsWithChildren) {
    return (
    <RecoilRoot>{children}</RecoilRoot>
    );
}
