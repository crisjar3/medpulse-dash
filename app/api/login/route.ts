

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest,) {
  try {
    const response = await axios.get('https://medpulse20241011220107.azurewebsites.net/patient', {
      withCredentials: true
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json({ error },{status:500});
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const response = await axios.post('https://medpulse20241011220107.azurewebsites.net/auth/signin', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      withCredentials: true
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error during sign-in:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}