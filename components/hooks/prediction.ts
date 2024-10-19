import axios from 'axios';
import { AuthResponse, ErrorResponse } from '@/components/login-form';


export interface PatientReport {
  patientReportId: string;
  labelName: string;
  explanation: string;
  result: number;
  patientReport: string | null;
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

// Define the ReportType enum
export enum ReportType {
  LUNGSDETECTION = 0,
  RETINOPATHY = 1,
  SKINCANCER = 2,
  BREASTCANCER = 3
}

// Define the interface for the report data
export interface ReportData {
  userId: string;
  hospitalId: string;
  user: any | null;
  hospital: any | null;
  urlReport: string;
  reportType: ReportType;
  predictions: PatientReport[];
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy: any | null;
  createdBy: any | null;
  updatedBy: any | null;
}

export const fetchPredictions = async (reportId: string): Promise<ReportData> => {
  try {
    const { data } = await axios.post(
      '/api/predictions', // Cambia a la ruta que corresponda en tu Next.js API
      {
        reportId: reportId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*'
        },
        withCredentials: true // Permite el uso de cookies si son necesarias
      }
    );


    return data as ReportData;
  } catch (error: any) {
    console.error('Login fetch error:', error);

    throw  error;
  }
};
