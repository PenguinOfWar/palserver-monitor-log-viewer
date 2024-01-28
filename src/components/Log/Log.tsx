'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { readLog } from '@/app/actions';
import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';

export default function Log({ s3Key }: { s3Key: string }) {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<string[][]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const content = await readLog(s3Key);
      setEvent(content);
      setLoaded(true);
    }

    if (open) {
      fetchData();
    }
  }, [open, s3Key]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(!open)}>View</Button>
      </DialogTrigger>
      <DialogContent className="container max-w-fit">
        <DialogHeader>
          <DialogTitle>Event: {s3Key}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <ScrollArea className="h-[60vh] rounded-md border p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>CPU %</TableHead>
                      <TableHead>Mem %</TableHead>
                      <TableHead>Mem (VSZ)</TableHead>
                      <TableHead>Mem (RSS)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loaded &&
                      event &&
                      event.length > 0 &&
                      event.map(line => (
                        <TableRow key={line[0]}>
                          <TableCell>
                            {dayjs(line[0]).format('YYYY-MM-DD HH:mm:ss')}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                line[1] === 'running'
                                  ? 'default'
                                  : 'destructive'
                              }
                              className="capitalize">
                              {line[1]}
                            </Badge>
                          </TableCell>
                          <TableCell>{line[2]}%</TableCell>
                          <TableCell>{line[3]}%</TableCell>
                          <TableCell>
                            {prettyBytes(Number(line[4]) * 1024)}
                          </TableCell>
                          <TableCell>
                            {prettyBytes(Number(line[5]) * 1024)}
                          </TableCell>
                        </TableRow>
                      ))}
                    {!loaded && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Progress value={50} />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
