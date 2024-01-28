import Log from '@/components/Log/Log';
import { TypographyH1 } from '@/components/ui/h1';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import convertToObject from '@/utils/convertToObject';
import readS3File from '@/utils/readS3File';
import { parse } from 'csv-parse/sync';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import dynamic from 'next/dynamic';

const TimeSeries = dynamic(() => import('@/components/TimeSeries/TimeSeries'), {
  ssr: false
});

async function fetchEvent(key: string) {
  const file = await readS3File(key);

  if (file === 'Error') {
    return false;
  }

  const arr: string[][] = parse(file);

  return convertToObject(arr);
}

export default async function EventPage({
  params
}: {
  params: { key: string };
}) {
  const { key } = params;
  const event = await fetchEvent(key);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <div className="pb-5 flex items-center">
        <TypographyH1 className="grow">Event: {key}</TypographyH1>
        <Button asChild className="flex">
          <Link href="/">Back</Link>
        </Button>
      </div>
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Event log</CardTitle>
          <CardDescription>Usage ahead of PalServer crash</CardDescription>
        </CardHeader>
        <CardContent>
          <Log event={event} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Time Series</CardTitle>
          <CardDescription>Visualised usage.</CardDescription>
        </CardHeader>
        <CardContent>
          <TimeSeries event={event} />
        </CardContent>
      </Card>
    </div>
  );
}
