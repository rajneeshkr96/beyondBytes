// app/api/tracking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Function to extract the IPv4 address from the IPv6-mapped format
function extractIPv4(ip: string): string {
  if (ip.startsWith('::ffff:')) {
    return ip.split(':').pop() || '0.0.0.0';
  }
  return ip;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const emailId = searchParams.get('id');

  // Attempt to retrieve the client's real IP address
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = forwardedFor ? forwardedFor.split(',')[0].trim() : request.headers.get('x-real-ip');
  const ip = realIp || '0.0.0.0';
  const ipv4 = extractIPv4(ip);

  // Fetch country information using ipinfo.io
  let country = 'Unknown';
  try {
    const response = await axios.get(`https://ipinfo.io/${ipv4}/json?token=YOUR_IPINFO_TOKEN`);
    country = response.data.country || 'Unknown';
  } catch (error) {
    console.error('Error fetching IP info:', error);
  }

  // Log email open with emailId, timestamp, and country
  console.log(`Email with ID ${emailId} was opened at ${new Date().toISOString()} from country ${country}`);

  // Transparent 1x1 GIF
  const gifData = Buffer.from(
    'R0lGODlhAQABAIABAP7+/v///yH5BAEKAAEALAAAAAABAAEAAAICRAEAOw==',
    'base64'
  );

  return new NextResponse(gifData, {
    headers: {
      'Content-Type': 'image/gif',
      'Content-Length': '43',
    },
  });
}
