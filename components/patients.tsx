'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import CustomDatePicker from '@/components/DatePicker';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default function Patients() {
  const { data, isLoading, ...more } = usePatients();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Historial de Pacientes</CardTitle>
        {/*<div className="flex items-center space-x-2">*/}
        {/*  <Input type="search" placeholder="Search" className="w-[200px]" />*/}
        {/*  <CalendarIcon className="w-4 h-4" />*/}
        {/*</div>*/}
        <CustomDatePicker />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4 font-semibold">
          <div>110</div>
          <div>50</div>
          <div>42</div>
          <div>18</div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-500">
          <div>Cantidad de Pacientes</div>
          <div>Activos el Ultimo Mes</div>
          <div>Cantidad de Citas</div>
          <div>Nuevos</div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th>IDENTIFICATION</th>
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th>EMAIL CONFIRMED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map((patient) => (
                <tr key={patient.id} className="border-t">
                  <td className="py-2">{patient.identification}</td>
                  <td>{patient.fullName}</td>
                  <td>{patient.email}</td>
                  <td>
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        patient.emailConfirmed ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                    ></span>
                    {patient.emailConfirmed ? 'Yes' : 'No'}
                  </td>
                  <td>
                    <ChevronRight className="w-4 h-4" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export interface Patient {
  identification: string;
  fullName: string;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const { data } = await axios.get('/api/patient', {
      withCredentials: true
    });

    console.log(data);
    return data as Patient[];
  } catch (error) {
    console.error(error);
    return [
      {
        identification: 'string',
        fullName: 'string',
        id: 'string',
        userName: 'string',
        normalizedUserName: 'string',
        email: 'string',
        normalizedEmail: 'string',
        emailConfirmed: false,
        passwordHash: 'string',
        securityStamp: 'string',
        concurrencyStamp: 'string',
        phoneNumber: null,
        phoneNumberConfirmed: false,
        twoFactorEnabled: false,
        lockoutEnd: 'string;',
        lockoutEnabled: false,
        accessFailedCount: 1209
      }
    ];
  }
};

export const usePatients = () => {
  return useQuery<Patient[], Error>({
    queryKey: ['patients'],
    queryFn: fetchPatients,

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 1
  });
};
