'use client'
import { r } from '@fullcalendar/resource/internal-common';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

export default ({id}:{id:string}) => {
    const router = useRouter();
    return (
        <button onClick={async (resource)=>{
            const res = await fetch('/api/resource', {
                method: 'DELETE',
                body: JSON.stringify({"targetId": id}),
                headers:{
                    'Content-Type' : 'application/json'
                },
            });
            let response = await res.json();
            router.refresh();
            toast.success("Room Deleted!");
            
        }}>Delete</button>
    )
};