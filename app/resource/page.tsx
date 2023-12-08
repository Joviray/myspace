'use client'

import styles from './page.module.css';
import { ResourceCard } from '@/components/ResourceCard/ResourceCard';
import { Resource } from '@prisma/client';
import { useState, useEffect } from 'react';
import { getResources } from './actions';

export default () => {

    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getResources({skip:0, take: 10}).then((resources) => setResources(resources)).then(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.grid}>
            {resources.map((resource) => {
                return <ResourceCard key={resource.id} resource={resource} />;
            })}
        </div>
    );
}