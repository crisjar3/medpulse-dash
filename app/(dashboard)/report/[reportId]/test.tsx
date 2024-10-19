'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Activity,
  HeartPulse,
  RotateCcw,
  Thermometer,
  Wind,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchPredictions, ReportData } from '@/components/hooks/prediction';
import { ReportType } from '@/components/Report';

interface VitalSignCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

function VitalSignCard({ title, value, icon, color }: VitalSignCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className={color}>{icon}</div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

type Disease =
  | 'Bacterial Pneumonia'
  | 'Viral Pneumonia'
  | 'Normal'
  | 'Tuberculosis'
  | 'Corona Virus';

const patientData = {
  name: 'John Doe',
  age: 45,
  gender: 'Male',
  predictedLabel: 'Bacterial Pneumonia',
  score: [
    { name: 'Bacterial Pneumonia', value: 0.8439447 },
    { name: 'Viral Pneumonia', value: 0.14509535 },
    { name: 'Normal', value: 0.010927691 },
    { name: 'Tuberculosis', value: 0.000029987035 },
    { name: 'Corona Virus', value: 0.0000022091187 }
  ],
  vitalSigns: {
    heartRate: 85,
    bloodPressure: '120/80',
    temperature: 38.2,
    oxygenSaturation: 95,
    respiratoryRate: 20
  },
  medicalHistory: [
    { date: '2023-01-15', event: 'Consulta por tos persistente' },
    { date: '2023-01-20', event: 'Inicio de tratamiento antibiótico' },
    { date: '2023-01-25', event: 'Radiografía de tórax' },
    { date: '2023-01-30', event: 'Seguimiento y evaluación de síntomas' }
  ]
};

function reportTypeToText(data: ReportData | undefined): string {
  if(data === undefined) {
    return '';
  }
  const { reportType } = data as ReportData;
  switch (reportType.toString()) {
    case '0':
      return 'Pulmonia';
    case '1':
      return 'Retinopatia';
    case '2':
      return 'Cancer de piel';
    case '3':
      return 'Cancer de MAMA';
    default:
      return 'Unknown Report Type';
  }
}

const diseaseDescriptions: Record<Disease, string> = {
  'Bacterial Pneumonia':
    'Infección pulmonar causada por bacterias. Síntomas incluyen fiebre alta, tos con esputo y dificultad para respirar. Tratamiento: antibióticos.',
  'Viral Pneumonia':
    'Infección pulmonar causada por virus. Síntomas similares a la gripe con tos seca. Tratamiento: descanso y medicamentos para aliviar síntomas.',
  Normal:
    'No se detectan signos de enfermedad pulmonar. Los pulmones aparecen saludables en la imagen.',
  Tuberculosis:
    'Infección bacteriana grave que afecta principalmente a los pulmones. Síntomas: tos prolongada, pérdida de peso, fiebre. Requiere tratamiento prolongado con antibióticos.',
  'Corona Virus':
    'Infección viral que puede causar desde síntomas leves hasta neumonía severa. Síntomas: fiebre, tos seca, fatiga. Tratamiento: principalmente sintomático y de apoyo.'
};

// const usePredictions = () => {
//   var { data, isLoading } = useQuery<ReportData, Error>({
//     queryKey: ['prediction'],
//     queryFn: () => fetchPredictions(params.reportId),
//     staleTime: 5 * 60 * 1000,
//     refetchOnWindowFocus: false,
//     refetchInterval: false,
//     retry: 1
//   });
//
//   return{
//     data,
//     isLoading,
//     filtered: data?.predictions.filter(pred=> pred.id)
//   }
// }

export default function ReportComponent({
  params
}: {
  params: { reportId: string };
}) {
  const { data, isLoading } = useQuery<ReportData, Error>({
    queryKey: ['prediction'],
    queryFn: () => fetchPredictions(params.reportId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 1
  });

  console.log(data);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [imageZoom, setImageZoom] = useState(1);

  const handleBarClick = (data: any) => {
    setSelectedDisease(data.description);
  };

  const handleZoomIn = () => setImageZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setImageZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setImageZoom(1);

  return (
    <main className="container mx-auto p-6 max-w-7xl bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
            Salud del Paciente
          </h1>
          <p className="text-sm text-gray-500">
            Paciente: {patientData.name} | Edad: {patientData.age} | Género:{' '}
            {patientData.gender}
          </p>
        </div>
        {/*<Button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md hover:shadow-lg transition-all">*/}
        {/*  Generar Informe*/}
        {/*</Button>*/}
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="xray">{reportTypeToText(data)}</TabsTrigger>
          {/*<TabsTrigger value="history">Historial Médico</TabsTrigger>*/}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <VitalSignCard
              title="Ritmo Cardíaco"
              value={`${patientData.vitalSigns.heartRate} lpm`}
              icon={<HeartPulse className="h-4 w-4" />}
              color="text-red-500"
            />
            <VitalSignCard
              title="Presión Arterial"
              value={patientData.vitalSigns.bloodPressure}
              icon={<Activity className="h-4 w-4" />}
              color="text-blue-500"
            />
            <VitalSignCard
              title="Temperatura"
              value={`${patientData.vitalSigns.temperature}°C`}
              icon={<Thermometer className="h-4 w-4" />}
              color="text-orange-500"
            />
            <VitalSignCard
              title="Saturación de Oxígeno"
              value={`${patientData.vitalSigns.oxygenSaturation}%`}
              icon={<Wind className="h-4 w-4" />}
              color="text-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Puntuaciones de Predicción de Enfermedades
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data?.predictions.map((pred) => {
                      return {
                        value: pred.result,
                        name: pred.labelName,
                        description: pred.explanation
                      };
                    })}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 1]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip
                      formatter={(value) =>
                        (Number(value) * 100).toFixed(2) + '%'
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      name="Probabilidad"
                      onClick={handleBarClick}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Descripción de la Condición
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                  {selectedDisease ? (
                    <>
                      <h3 className="font-semibold text-lg mb-2">
                        {selectedDisease}
                      </h3>
                      <p>{diseaseDescriptions[selectedDisease]}</p>
                    </>
                  ) : (
                    <p className="text-gray-500">
                      Seleccione una condición en el gráfico para ver su
                      descripción.
                    </p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="xray">
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
              <CardTitle className="text-lg font-semibold text-gray-700">
                {reportTypeToText(data)}
              </CardTitle>
              <CardDescription>Imagen Subida por el Paciente</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative w-full h-[500px] mb-4">
                <Image
                  src={data?.urlReport}
                  alt="Radiografía de tórax del paciente"
                  layout="fill"
                  objectFit="contain"
                  style={{ transform: `scale(${imageZoom})` }}
                />
              </div>
              <div className="flex justify-center space-x-2">
                <Button onClick={handleZoomIn} variant="outline" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button onClick={handleZoomOut} variant="outline" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button onClick={handleResetZoom} variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/*<TabsContent value="history">*/}
        {/*  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">*/}
        {/*    <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">*/}
        {/*      <CardTitle className="text-lg font-semibold text-gray-700">*/}
        {/*        Historial Médico*/}
        {/*      </CardTitle>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent className="p-6">*/}
        {/*      <ScrollArea className="h-[400px] w-full rounded-md border p-4">*/}
        {/*        {patientData.medicalHistory.map((event, index) => (*/}
        {/*          <div key={index} className="mb-4 last:mb-0">*/}
        {/*            <h3 className="font-semibold">{event.date}</h3>*/}
        {/*            <p>{event.event}</p>*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*      </ScrollArea>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}
        {/*</TabsContent>*/}
      </Tabs>

      {/*<motion.div*/}
      {/*  initial={{ opacity: 0, y: 20 }}*/}
      {/*  animate={{ opacity: 1, y: 0 }}*/}
      {/*  transition={{ duration: 0.5, delay: 0.8 }}*/}
      {/*  className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg shadow-inner"*/}
      {/*>*/}
      {/*  <h4 className="font-semibold mb-2 text-lg">Resumen del Dashboard</h4>*/}
      {/*  <p>*/}
      {/*    Este dashboard proporciona una visión detallada del estado de salud*/}
      {/*    del paciente, incluyendo signos vitales, puntuaciones de predicción de*/}
      {/*    enfermedades, radiografía de tórax e historial médico. La condición*/}
      {/*    predicha es {patientData.predictedLabel} con una probabilidad del{' '}*/}
      {/*    {(patientData.score[0].value * 100).toFixed(2)}%. Se recomienda una*/}
      {/*    evaluación exhaustiva y seguimiento continuo.*/}
      {/*  </p>*/}
      {/*</motion.div>*/}
    </main>
  );
}
