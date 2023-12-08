'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

export const EventDeleteButton = async ({id}:{id:string}) => {
    const router = useRouter();
    return (
        <button onClick={async (event)=>{
            const res = await fetch('/api/event', {
                method: 'DELETE',
                body: JSON.stringify({"targetId": id}),
                headers:{
                    'Content-Type' : 'application/json'
                },
            });
            let response = await res.json();
            router.refresh();
            toast.success("Event Deleted!");
            
        }}>Delete</button>
    )
};