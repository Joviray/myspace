'use server'

import UserCard from '@/components/UserCard/UserCard';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';
import {ResourceCard} from '@/components/ResourceCard/ResourceCard';

export default async function Users(){
    
    const resources = await prisma.resource.findMany();
    return(
        <div className = {styles.grid}>
            {resources.map((resource) => {
                return <ResourceCard key={resource.id} resource={resource} />;
            })}
         </div>      
            );
}