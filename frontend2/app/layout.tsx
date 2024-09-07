import type {Metadata} from "next";
import {Inter} from "next/font/google";

import {UserProvider} from "@auth0/nextjs-auth0/client";
import {Providers} from "@/app/providers";
import Navbar from "@/app/components/navbar";
import React from "react";
import Footer from "@/app/components/Footer";
import GoogleAnalytics from "@/app/components/google/GoogleAnalytics";

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
            {/*<script async={false} src="https://dcbbwymp1bhlf.cloudfront.net/?wbbcd=1088257" data-cfasync="false"*/}
            {/*        />*/}
            <script async={false} type="text/javascript"
                    src="https://s.skimresources.com/js/269698X1755142.skimlinks.js">

            </script>

            <script async={false} data-name="BMC-Widget" data-cfasync="false"
                    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="saipraveen"
                    data-description="Support me on Buy me a coffee!" data-message="Donate and Support this project"
                    data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>

            {/*<GoogleAds/>*/}
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
