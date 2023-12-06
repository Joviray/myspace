'use client'

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'



export type Event = {
    id: string,
    resourceId: string,
    start: string,
    end: string,
    title: string
}

export type Resource = {
    id: string,
    title: string,
    eventColor: string | undefined
}

export type ResourceCalanderProps = {
    resources: Resource[],
    events: any[]
}
export const ResourceCalander = ({resources, events}:{resources: any[], events: any[]}) => {

    return (
            <FullCalendar
                    plugins={[dayGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='resourceTimeGridDay'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    resources={resources}
                    events={events}

            />
    )
}