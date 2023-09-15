import React from react
import FullCalendar from '@fullcalendar/react'
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Calendar',
    description: 'you can find the rooms that are available here'
};



export default async function Calendar(){

    return (
        <main>
            <h1>Calendar</h1>
            <p>
                See where you can study 
            </p>
        </main>                                                                                                             
    )
};