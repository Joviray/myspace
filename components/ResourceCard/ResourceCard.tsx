"use client"

import Link from 'next/link';
import styles from './ResourceCard.module.css'
import { Resource, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface Props {
    resource: Resource;
    email?: boolean;
}

export const ResourceCard = ({ resource }: Props) => {

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
            </div>
        </div>
        );
}