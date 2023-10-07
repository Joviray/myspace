'use client'

import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'


export default function CalendarPage() {
    return(
        <div className='demo-app'>
            <div className='demo-app-main'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin]}
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
                    resources={[{ id: 'a', title: 'CS Lab', eventColor: 'green'}, 
                                { id: 'b', title: 'Rm 128E', eventColor: 'blue' }, 
                                { id: 'c', title: 'Rm 40F', eventColor: 'red' }]}
                    events={[{ id: '1', resourceId: 'a', start: '2023-10-06T16:00:00', end: '2023-10-06T19:30:00', title: 'ACM Meeting' }, 
                             { id: '2', resourceId: 'b', start: '2023-10-06T12:00:00', end: '2023-10-06T15:30:00', title: 'Engr study session' },
                             { id: '3', resourceId: 'c', start: '2023-10-06T10:00:00', end: '2023-10-06T11:30:00', title: 'CS Tutoring' },]}

                    />
                    </div>
            </div>
    )
}
