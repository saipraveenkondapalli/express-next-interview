import type {Metadata} from "next";
import {Inter} from "next/font/google";

import {UserProvider} from "@auth0/nextjs-auth0/client";
import {Providers} from "@/app/providers";
import Navbar from "@/app/components/navbar";
import React from "react";
import Footer from "@/app/components/Footer";
import GoogleAnalytics from "@/app/components/google/GoogleAnalytics";
import GoogleAds from "@/app/components/google/Ads";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Interview Prep Pro",
    description:
        "Interview Prep Pro is a platform to help you prepare for technical interviews.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <GoogleAnalytics/>
            <GoogleAds/>
        </head>
        <UserProvider>
            <body>
            <Providers>
                <Navbar/>
                <main>{children}</main>
                <Footer/>
            </Providers>
            </body>
        </UserProvider>
        </html>
    );
}
