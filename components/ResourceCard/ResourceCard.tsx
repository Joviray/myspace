"use client"

import Link from 'next/link';
import styles from './ResourceCard.module.css'
import { Resource, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface Props {
    resource: Resource;
    email?: boolean;
}
export const OwnerInfo = async ({ resource, email }: Props) => {
    const owner = await prisma.user.findFirst({
        where: {
            id: resource.userId,
        },
    });

    return (
        <p>
            <Link href={`/users/${owner?.id}`}>
                {owner?.name}
            </Link>
            <span> at </span>
            {email && (<a href={`mailto:${owner?.email}`}> {owner?.email}</a>)    }
        </p>

        );
}

export const ResourceCard = async ({ resource }: Props) => {

    return (
        <div className={styles.card}>
            <img
            src={resource.image ?? 'mememan.webp'}
            alt={`${resource.title}`}
            className = {styles.cardImage}
            />
            <div className={styles.cardContent}>
                <h3>
                    <Link href={`/resource/${resource.id}`}>{resource.title}</Link>
                </h3>
                <OwnerInfo resource={resource} />
            </div>
        </div>
        );
}