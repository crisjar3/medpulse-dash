import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { getProducts } from '@/lib/db';
import MedicalDashboard from './medical-dashboard';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {

  return <MedicalDashboard />
}
