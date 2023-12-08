"use client";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { getEvents, createEvent } from "../../app/event/actions";
import styles from "./Form.module.css";

export function CreateEventForm({ user, resources }: any) {
  const router = useRouter();

  const createForm = (event: any) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const image = formData.get("image") as string;
    const resourceId = formData.get("resourceId") as string;
    const tags = formData.get("tags") as string;
    const start = formData.get("start") as string;
    const end = formData.get("end") as string;
    const allDay = formData.get("allDay") as unknown as boolean;

    createEvent({
      name,
      description,
      url,
      image,
      resourceId,
      tags,
      start,
      end,
      allDay,
    })
      .then(() => {
        toast.success("Event created");
        router.push("/event");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <h2>Add a new Meeting</h2>
      <form onSubmit={createForm}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />

        <label htmlFor="resourceId">Room</label>
        <select id="resourceId" name="resourceId">
          {resources.map((resource: any) => (
            <option key={resource.id} value={resource.id}>
              {resource.title}
            </option>
          ))}
        </select>

        <label htmlFor="start">Start</label>
        <input type="datetime-local" id="start" name="start" />

        <label htmlFor="end">End</label>
        <input type="datetime-local" id="end" name="end" />

        <label htmlFor="allDay">All Day</label>
        <input type="checkbox" id="allDay" name="allDay" />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
