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
import Log from '@/components/Log/Log';

async function fetchLogs() {
  return await getS3Files();
}

export default async function Home() {
  const files = await fetchLogs();

  return (
    <main className="container mx-auto py-5">
      <TypographyH1 className="pb-3">
        ElDudeBros PalServer Crash Logs
      </TypographyH1>
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
                      <Log s3Key={String(file.Key)} />
                    </TableCell>
                    <TableCell className="font-medium">{file.Key}</TableCell>
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
    </main>
  );
}
