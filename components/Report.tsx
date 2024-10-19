import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { Select } from '@/components/ui/select/Select';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import CustomDatePicker from '@/components/DatePicker';
import Link from 'next/link';

const testData = [
  {
    name: 'Glucose',
    time: 'Last year',
    value: '111 mg/dl',
    data: [65, 60, 80, 70, 75, 68, 72]
  },
  {
    name: 'Glycosylated HGB',
    time: 'Last week',
    value: '7.7%',
    data: [5, 6, 5.5, 7, 8, 7.5, 8.5]
  },
  {
    name: 'Ketone bodies',
    time: 'Last month',
    value: '12 mg/ml',
    data: [10, 12, 11, 13, 12, 14, 13]
  },
  {
    name: 'Glucose',
    time: 'Last year',
    value: '111 mg/dl',
    data: [65, 60, 80, 70, 75, 68, 72]
  },
  {
    name: 'Glycosylated HGB',
    time: 'Last week',
    value: '7.7%',
    data: [5, 6, 5.5, 7, 8, 7.5, 8.5]
  },
  {
    name: 'Ketone bodies',
    time: 'Last month',
    value: '12 mg/ml',
    data: [10, 12, 11, 13, 12, 14, 13]
  },
  {
    name: 'Glucose',
    time: 'Last year',
    value: '111 mg/dl',
    data: [65, 60, 80, 70, 75, 68, 72]
  },
  {
    name: 'Glycosylated HGB',
    time: 'Last week',
    value: '7.7%',
    data: [5, 6, 5.5, 7, 8, 7.5, 8.5]
  },
  {
    name: 'Ketone bodies',
    time: 'Last month',
    value: '12 mg/ml',
    data: [10, 12, 11, 13, 12, 14, 13]
  },
  {
    name: 'Glucose',
    time: 'Last year',
    value: '111 mg/dl',
    data: [65, 60, 80, 70, 75, 68, 72]
  },
  {
    name: 'Glycosylated HGB',
    time: 'Last week',
    value: '7.7%',
    data: [5, 6, 5.5, 7, 8, 7.5, 8.5]
  },
  {
    name: 'Ketone bodies',
    time: 'Last month',
    value: '12 mg/ml',
    data: [10, 12, 11, 13, 12, 14, 13]
  }
];

export default function Report() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Examenes</CardTitle>
        {/*<div className="flex items-center space-x-2">*/}
        {/*  <Input*/}
        {/*    type="search"*/}
        {/*    placeholder="Search"*/}
        {/*    className="w-[200px]"*/}
        {/*  />*/}
        {/*  <CalendarIcon className="w-4 h-4" />*/}
        {/*</div>*/}
        <CustomDatePicker />
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th>NAME</th>
              <th>TIME</th>
              <th>AVERAGES</th>
              <th>INDICATOR</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {testData.map((test, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{test.name}</td>
                <td>
                  <Select>
                    <option>{test.time}</option>
                  </Select>
                </td>
                <td>{test.value}</td>
                <td>
                  <ResponsiveContainer width={100} height={20}>
                    <LineChart
                      data={test.data.map((value, i) => ({
                        value,
                        index: i
                      }))}
                    >
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </td>
                <td>
                  <Link href={"/report"}>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
