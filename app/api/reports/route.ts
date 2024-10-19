import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest,) {
  try {
    const response = await axios.get('https://medpulse20241011220107.azurewebsites.net/patient/reports', {
      withCredentials: true
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json({ error },{status:500});
  }
}