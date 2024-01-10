import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    if (request.method !== 'GET') {
        return NextResponse.json({ error: 'Not Allowed' }, { status: 405 });
    }
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');

    if(!taskId){
        return NextResponse.json({ error: 'Invalid' }, { status: 422 });
    }
    // console.log(taskId)
    try {
        const res = await fetch(`http://localhost:8080/status/${taskId}`, {
            method: 'GET'
        });

        // console.log(res)
        if (res.status != 200) {
            return NextResponse.json({ error: res.statusText });
        }
        const responseData = await res.json()
        // console.log(responseData)
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'An error occurred' });
    }
}