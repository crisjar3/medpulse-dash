import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { Patient } from '@/components/patients';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {


  // const response = await fetch('https://vch3fx9j-7130.use2.devtunnels.ms/patient');
  // const result=await response.json();

  var ap="";
  return (


    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>

  );
}
