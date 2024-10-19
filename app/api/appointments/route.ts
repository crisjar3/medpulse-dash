import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest,) {
  try {
    const response = await axios.get('https://medpulse20241011220107.azurewebsites.net/hospitals/262cad4f-8bf7-4410-a52d-d93b1639ff61/appointments', {
      withCredentials: true
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error },{status:500});
  }
}