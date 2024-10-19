// 'use client';
//
// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   ArrowLeft,
//   ArrowRight,
//   Calendar as CalendarIcon,
//   ChevronRight
// } from 'lucide-react';
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis
// } from 'recharts';
// import { Select } from '@/components/ui/select/Select';
// import { Calendar } from '../../@/components/ui/calendar';
// import Patients from '@/components/patients';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//
// const departmentData = [
//   { name: 'Neurology', value: 14 },
//   { name: 'Psychiatry', value: 15 },
//   { name: 'Pediatrics', value: 14 },
//   { name: 'Therapy', value: 12 },
//   { name: 'Surgery', value: 45 }
// ];
//
// const patientData = [
//   { day: 'Mon', Cardiology: 0.4, Therapy: 0.5, Endocrinology: 0.3 },
//   { day: 'Tue', Cardiology: 0.7, Therapy: 0.4, Endocrinology: 0.5 },
//   { day: 'Wed', Cardiology: 0.3, Therapy: 0.5, Endocrinology: 0.6 },
//   { day: 'Thu', Cardiology: 0.5, Therapy: 0.4, Endocrinology: 0.5 },
//   { day: 'Fri', Cardiology: 0.6, Therapy: 0.3, Endocrinology: 0.6 },
//   { day: 'Sat', Cardiology: 0.4, Therapy: 0.3, Endocrinology: 0.6 },
//   { day: 'Sun', Cardiology: 0.8, Therapy: 0.4, Endocrinology: 0.5 }
// ];
//
// const patientHistory = [
//   {
//     id: 1,
//     name: 'Suzana R.',
//     treatment: 'Heart failure',
//     date: '10/21/22',
//     status: 'Active'
//   },
//   {
//     id: 2,
//     name: 'Barbara C.',
//     treatment: 'Conjunctivitis',
//     date: '10/21/22',
//     status: 'Completed'
//   },
//   {
//     id: 3,
//     name: 'John H.',
//     treatment: 'Diabetes',
//     date: '10/21/22',
//     status: 'Active'
//   },
//   {
//     id: 4,
//     name: 'Ann H.',
//     treatment: 'Leg fracture',
//     date: '10/21/22',
//     status: 'New'
//   }
// ];
//
// const testData = [
//   {
//     name: 'Glucose',
//     time: 'Last year',
//     value: '111 mg/dl',
//     data: [65, 60, 80, 70, 75, 68, 72]
//   },
//   {
//     name: 'Glycosylated HGB',
//     time: 'Last week',
//     value: '7.7%',
//     data: [5, 6, 5.5, 7, 8, 7.5, 8.5]
//   },
//   {
//     name: 'Ketone bodies',
//     time: 'Last month',
//     value: '12 mg/ml',
//     data: [10, 12, 11, 13, 12, 14, 13]
//   }
// ];
//
// const queryClient = new QueryClient();
// export default function Component() {
//   const [date, setDate] = useState<Date | undefined>(new Date());
//
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="flex h-screen bg-gray-100">
//         <div className="w-1/3 p-4 bg-blue-50">
//           <Tabs defaultValue="dashboard">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
//               <TabsTrigger value="schedule">Horario</TabsTrigger>
//             </TabsList>
//             <TabsContent value="dashboard" className="space-y-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Pacientes atendidos por Departamento</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex justify-between">
//                     {departmentData.map((dept) => (
//                       <div
//                         key={dept.name}
//                         className={`text-center p-2 ${dept.name === 'Surgery' ? 'bg-green-200' : 'bg-gray-200'}`}
//                       >
//                         <div>{dept.name}</div>
//                         <div className="font-bold">{dept.value}%</div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Estadisticas de Pacientes</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={200}>
//                     <LineChart width={500} height={300} data={patientData}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
//                       <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//                       <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="schedule">
//               <Card>
//                 <CardContent>
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="flex space-x-4">
//                       <div className="font-bold">MAY</div>
//                       <div>JUNE</div>
//                       <div>JULY</div>
//                       <div>AUGUST</div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <ArrowLeft className="w-6 h-6" />
//                       <ArrowRight className="w-6 h-6" />
//                     </div>
//                   </div>
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     className="rounded-md border"
//                   />
//                   <div className="mt-4 space-y-2">
//                     <div className="bg-white p-2 rounded">
//                       <div className="text-sm text-gray-500">Tu</div>
//                       <div className="font-bold text-2xl">5</div>
//                       <div className="font-semibold">Dentist</div>
//                       <div className="text-sm">09:00-11:00</div>
//                       <div className="text-sm text-blue-500">Richard B.</div>
//                     </div>
//                     <div className="bg-white p-2 rounded">
//                       <div className="text-sm text-gray-500">Fr</div>
//                       <div className="font-bold text-2xl">10</div>
//                       <div className="font-semibold">Cardiologist</div>
//                       <div className="text-sm">13:00-14:00</div>
//                       <div className="text-sm text-blue-500">
//                         Dr. Jeniffer A
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//         <div className="flex-1 p-4 space-y-4">
//           <Patients />
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Examenes</CardTitle>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="search"
//                   placeholder="Search"
//                   className="w-[200px]"
//                 />
//                 <CalendarIcon className="w-4 h-4" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left text-gray-500">
//                     <th>NAME</th>
//                     <th>TIME</th>
//                     <th>AVERAGES</th>
//                     <th>INDICATOR</th>
//                     <th></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {testData.map((test, index) => (
//                     <tr key={index} className="border-t">
//                       <td className="py-2">{test.name}</td>
//                       <td>
//                         <Select>
//                           <option>{test.time}</option>
//                         </Select>
//                       </td>
//                       <td>{test.value}</td>
//                       <td>
//                         <ResponsiveContainer width={100} height={20}>
//                           <LineChart
//                             data={test.data.map((value, i) => ({
//                               value,
//                               index: i
//                             }))}
//                           >
//                             <Line
//                               type="monotone"
//                               dataKey="value"
//                               stroke="#8884d8"
//                               strokeWidth={2}
//                               dot={false}
//                             />
//                           </LineChart>
//                         </ResponsiveContainer>
//                       </td>
//                       <td>
//                         <ChevronRight className="w-4 h-4" />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </QueryClientProvider>
//   );
// }

'use client';

import { useState } from 'react';
import Patients from '@/components/patients';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TimeLine from '@/components/TimeLine';
import Report from '@/components/Report';


const queryClient = new QueryClient();
export default function Component() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/3 p-4 bg-blue-50">
          <TimeLine />
        </div>
        <div className="flex-1 p-4 space-y-4">
          <Patients />
          <Report />
        </div>
      </div>
    </QueryClientProvider>
  );
}
