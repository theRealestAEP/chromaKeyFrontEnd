'use client'

import { useState, useEffect } from 'react';
interface Task {
    taskId: string;
    status: string;
    name: any;
    dateAdded: any

}

export function GridStatus() {

    const [tasks, setTasks] = useState<Task[]>([])

    // const downloadFile = async (taskId: string) => {
    //     const url = `https://backend.removegreenscreen.com:8080/download/${taskId}.webm`
    //     try {
    //         const response = await fetch(url);

    //         if (!response.ok) {
    //             throw new Error('File not found or an error occurred');
    //         }

    //         const blob = await response.blob();
    //         const downloadUrl = window.URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = downloadUrl;
    //         a.download = taskId; 
    //         document.body.appendChild(a);
    //         a.click();
    //         a.remove();
    //         window.URL.revokeObjectURL(downloadUrl);
    //     } catch (error) {
    //         console.error('Error downloading file:', error);
    //     }
    // }

    const getStatusData = async () => {
        const data = localStorage.getItem('tasks')
        if (data) {
            const tasks = JSON.parse(data)

            if (tasks.length > 0) {
                for (let i = 0; i < tasks.length; i++) {

                    if (!tasks[i].status || tasks[i].status == 'processing') {
                        typeof (tasks[i].taskId)
                        if (typeof (tasks[i].taskId) == 'undefined') {
                            tasks[i].status == 'error'
                        }
                        else {
                            const response = await fetch(`/api/status?taskId=${encodeURIComponent(tasks[i].taskId)}`, {
                                method: 'GET'
                            });
                            if (response.ok && response.status === 200) {
                                const dataStatus = await response.json(); // Parse the response body as JSON
                                if (dataStatus && dataStatus.taskInfo) {
                                    if(tasks[i].errorCount){
                                        tasks[i].errorCount = 0
                                    }
                                    tasks[i].status = dataStatus.taskInfo.status;

                                    if (tasks[i].status == 'completed') {
                                        tasks[i].download = dataStatus.taskInfo.downloadLink;
                                    }
                                }
                                if (dataStatus && dataStatus.error) {
                                    tasks[i].errorCount += 1
                                    if (tasks[i].errorCount >= 20) {
                                        tasks[i].status = 'error'
                                    }

                                }
                            }
                            if (response.status === 504) {
                                tasks[i].errorCount += 1
                                if (tasks[i].errorCount >= 20) {
                                    tasks[i].status = 'error'
                                }
                            }
                        }
                    }

                }
                localStorage.setItem('tasks', JSON.stringify(tasks))
                setTasks(tasks)
            }

        }
    }


    useEffect(() => {
        getStatusData()
        const intervalId = setInterval(async () => {
            await getStatusData()
        }, 2000)
        return () => clearInterval(intervalId);
    }, [])


    return (
        <div className="task-ctontainer" id="task-grid">
            {tasks.length === 0 ? (
                <div className="empty-state">No tasks found</div>
            ) : (
                tasks.sort((a: any, b: any) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
                    .map(task => (
                        <div key={task.taskId} className="task-item">
                            <span>{task.name || task.taskId}</span>
                            {task.status === 'completed' && <button onClick={() => window.open(`https://backend.removegreenscreen.com:8080/download/${task.taskId}.webm`, '_blank')} className="status">✓ View</button>}
                            {task.status === 'error' && <span className="status">✗ Error</span>}
                            {task.status === 'processing' && <span className="status">In progress</span>}
                        </div>
                    ))
            )}
        </div>
    )
}