export const dynamic = 'force-static';

import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About Us',
    description: 'This meeting schedule is built for the School of Engineering at San Francisco State University',
};

export default async function About(){

    return (
        <main>
            <h1>About</h1>
            <p>
                This meeting system is built for the School of Engineering at San Francisco State.
            </p>
        </main>
    )
}