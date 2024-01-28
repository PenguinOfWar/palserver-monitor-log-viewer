import { TypographyH1 } from '@/components/ui/h1';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import getS3Files from '@/utils/getS3Files';
import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { removeLogFromPath } from '@/utils/removeLogFromPath';
import readS3File from '@/utils/readS3File';
import { parse } from 'csv-parse/sync';
import convertToObject from '@/utils/convertToObject';
import Perf from '@/components/Perf/Perf';

async function fetchLogs() {
  return await getS3Files();
}

async function fetchPerf() {
  const file = await readS3File('palserver.csv', 'perf/');

  if (file === 'Error') {
    return false;
  }

  const arr: string[][] = parse(file);

  return convertToObject(arr);
}

export default async function Home() {
  const files = await fetchLogs();
  const perf = await fetchPerf();

  return (
    <Fragment>
      <TypographyH1 className="pb-5">PalServer Crash Logs</TypographyH1>
      {perf && <Perf event={perf} />}
      <Card>
        <CardHeader>
          <CardTitle>Logs</CardTitle>
          <CardDescription>Click on a row to view log data</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Action</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="w-[100px]">Size</TableHead>
                <TableHead className="text-right w-[200px]">
                  Last Modified
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files &&
                files.length > 0 &&
                files.map(file => (
                  <TableRow key={file.Key}>
                    <TableCell>
                      <Button asChild>
                        <Link href={`/${removeLogFromPath(String(file.Key))}`}>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      {removeLogFromPath(String(file.Key))}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {prettyBytes(Number(file.Size))}
                    </TableCell>
                    <TableCell className="text-right w-[200px]">
                      {dayjs(file.LastModified).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Fragment>
  );
}
