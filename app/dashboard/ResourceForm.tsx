'use client';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export function CreateResourceForm({ user }: any){
    const router = useRouter();
    const createResource = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = {
            title: formData.get('title'),
            name: formData.get('name'),
            description: formData.get('description'),
            image: formData.get('image'),
            tags: formData.get('tags'),
        };

        const res = await fetch('/api/resource', {
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                'Content-Type' : 'application/json'
            },
        });
        let response = await res.json();
        router.refresh();
        toast.success("Room Created!");
    };

    return (
        <div>
            <h2>Add a new Meeting Room</h2>
            <form onSubmit={createResource}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" defaultValue={'New Room'}/>
                <label htmlFor="Room Number">Name</label>
                <input type="text" name="name" defaultValue={'100'}/>
                <label htmlFor="description">description</label>
                <textarea
                    name="description"
                    cols={30}
                    rows={10}
                    defaultValue="">
                </textarea>

                <label htmlFor="image">Profile Image URL</label>
                <input type="text" name="image" defaultValue=""/>
                <label htmlFor="tags">Tags</label>
                <input type="text" name="tags" defaultValue=""/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
