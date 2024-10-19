'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReportComponent from './test';

const queryClient = new QueryClient();

export default function Report({ params }: { params: { reportId: string } }) {

  return(
    <QueryClientProvider client={queryClient}>
      <ReportComponent params={params} />
    </QueryClientProvider>
  )

}
