import { NextRequest, NextResponse } from 'next/server'
const { Readable } = require('stream');

export async function POST(request: NextRequest) {
    // console.log('postReq')
    const data = await request.formData();
    

    try {
        console.log(data)
        const res = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: data
        });
        // console.log(res)

        if (res.status != 200) {
            return NextResponse.json({ error: res.statusText });
        }
        const  responseData = await res.json()
        // console.log(responseData)
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'An error occurred' });
    }
}