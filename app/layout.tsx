import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "config/material-tailwind-theme-provider";
import ReactQueryClientProviders from "config/ReactQueryClientProvider";
import RecoilProvider from "config/RecoilProvider";
import MainLayout from "components/layouts/main-layout";
import Auth from "components/auth";
import { createServerSupabaseClient } from "utils/supabase/server";
import AuthProvider from "config/auth-provider";
import { Analytics } from "@vercel/analytics/react"



const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "our diary",
  description: "this app is diary",
  icons: {
    icon: "./images/cuteKk.png",
  },
};

export default async function RootLayout({ children }) {
  const supabase = await createServerSupabaseClient();
  
  const {data: {session},
  } = await supabase.auth.getSession();

  return (
    
    <RecoilProvider>
      <ReactQueryClientProviders>
        <ThemeProvider>
          {/* @ts-ignore */}
          <html lang="en">
          <meta charSet="UTF-8" />
            <head>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </head>
            <AuthProvider accessToken={session?.access_token}>
              <body className={inter.className}>
                {session?.user ? <MainLayout>{children}<Analytics/></MainLayout> : <Auth/>}
              </body>
            </AuthProvider>
          </html>
        </ThemeProvider>
      </ReactQueryClientProviders>
    </RecoilProvider>
    
  );
}
