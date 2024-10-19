'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '../hooks/use-toast';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
// import { signIn } from 'next-auth/react';
// import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.'
  })
});

export default function LoginForm() {

  return(
    <QueryClientProvider client={queryClient}>
      <Component/>
    </QueryClientProvider>
    )
}
export  function Component() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Integrar el hook `useLogin`
  const { mutate, isError, error } = useMutation<
    SignResponse,
    Error,
    LoginRequest
  >({
    mutationFn: fetchLogin,
    onSuccess: (response) => {
      if ('accessToken' in response) {
        // Manejar caso de éxito
        toast({
          title: 'Login Successful',
          description: 'You have been logged in successfully.'
        });
        // Redirigir a otra página tras login exitoso
        router.push('/');
      } else {
        // Manejar el caso de ErrorResponse
        toast({
          title: 'Login Failed',
          description: response.description
        });
      }
      setIsLoading(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'An error occurred during login.'
      });
      setIsLoading(false);
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // const result = await signIn('credentials', {
    //   redirect: false,
    //   email: values.email,
    //   password: values.password,
    // });
    mutate({ email: values.email, password: values.password });
  }

  return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Porfavor Inserta las credenciales de tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Inserta tu contraseña"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando en sesión...' : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  tokenType: string;
}

export interface ErrorResponse {
  code: string;
  description: string;
  type: number;
  numericType: number;
  metadata: any | null; // 'any' type or null, depending on what metadata could be.
}

type SignResponse = AuthResponse | ErrorResponse;

interface LoginRequest {
  email: string;
  password: string;
}

const queryClient = new QueryClient();

const fetchLogin = async (loginData: LoginRequest): Promise<SignResponse> => {
  try {
    const { data } = await axios.post(
      '/api/login', // Cambia a la ruta que corresponda en tu Next.js API
      loginData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*'
        },
        withCredentials: true // Permite el uso de cookies si son necesarias
      }
    );

    // Verificar si la respuesta es un error
    if (data.code) {
      return data as ErrorResponse;
    }

    // Retorna el AuthResponse en caso de éxito
    return data as AuthResponse;
  } catch (error: any) {
    console.error('Login fetch error:', error);

    // Devolver un ErrorResponse en caso de error de Axios o de red
    return {
      code: 'Network.Error',
      description:
        error.message || 'An error occurred while fetching the login response.',
      type: 1,
      numericType: 1,
      metadata: null
    } as ErrorResponse;
  }
};

export const useLogin = (loginData: LoginRequest) => {
  return useQuery<SignResponse, Error>({
    queryKey: ['signin'],
    queryFn: () => fetchLogin(loginData),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 1
  });
};
