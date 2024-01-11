'use client'

import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function UploadForm() {
  const [file, setFile] = useState<File>()


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    const fileName = file.name; // Accessing the name of the file
    // console.log("Uploaded file name:", fileName);

    try {
      const formData = new FormData();

      formData.append('video', file); // Ensure the field name matches with the backend
      const res = await fetch('https://backend.removegreenscreen.com:8080/upload', {
        method: 'POST',
        body: formData
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text())

      //use local storage
      else {
        const resData = await res.json()
        const tasksString = localStorage.getItem('tasks');
        const tasks = tasksString ? JSON.parse(tasksString) : [];

        // Append the new task
        const newTask = { taskId: resData.taskId, dateAdded: new Date().toISOString(), name: fileName };
        tasks.push(newTask);

        // Save the updated tasks back to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
      console.error(e);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
      </form>
      <ToastContainer />
    </div>

  )
}