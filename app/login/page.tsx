import LoginForm from '@/components/login-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';


const queryClient = new QueryClient();
export default function LoginPage() {
  return (
      <div className="min-h-screen flex justify-center items-start md:items-center p-8">
        <LoginForm />
      </div>
  );
}
