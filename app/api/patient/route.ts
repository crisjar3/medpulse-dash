

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
    return NextResponse.json({ error: error.message },{status:500});
  }
}
