'use client';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

import { useState, useEffect } from 'react';


export function CreateEventForm({ user, resources }: any){
    const router = useRouter();

    const createForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const body = JSON.stringify({
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            url: formData.get('url') as string,
            image: formData.get('image') as string,
            resourceId: formData.get('resourceId') as string,
            tags: formData.get('tags')?.toString() || '', // Use optional chaining and toString() to handle null values
            start: formData.get('start') as unknown as Date,
            end: formData.get('end') as unknown as Date,
            allDay: formData.get('allDay') as unknown as boolean,
        });

        const res = await fetch('/api/event', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res) {
            router.refresh();
            toast.success("Room Created!");
        } else {
            toast.error("Room Creation Failed!");
        }
    };


    return (
        <div>
            <h2>Add a new Meeting</h2>
            <form onSubmit={createForm}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" />

                <label htmlFor="url">URL</label>
                <input type="text" id="url" name="url" />

                <label htmlFor="image">Image</label>
                <input type="text" id="image" name="image" />

                <label htmlFor="resourceId">Resource ID</label>


                <select id="resourceId" name="resourceId">
                    {resources.map((resource: any) => (
                        <option key={resource.id} value={resource.id}>{resource.title}</option>
                    ))}

                </select>

                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" />

                <label htmlFor="start">Start</label>
                <input type="datetime-local" id="start" name="start" />

                <label htmlFor="end">End</label>
                <input type="datetime-local" id="end" name="end" />

                <label htmlFor="allDay">All Day</label>
                <input type="checkbox" id="allDay" name="allDay" />

                <button type="submit">Create</button>
            </form>
        </div>
    )
}
