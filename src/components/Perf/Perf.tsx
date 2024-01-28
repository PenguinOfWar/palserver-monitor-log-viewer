'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { EventObject } from '@/utils/convertToObject';
import dynamic from 'next/dynamic';

const TimeSeries = dynamic(() => import('@/components/TimeSeries/TimeSeries'), {
  ssr: false
});

export default function Perf({ event }: { event: EventObject[] }) {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Usage</CardTitle>
        <CardDescription>Last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <TimeSeries event={event} />
      </CardContent>
    </Card>
  );
}
