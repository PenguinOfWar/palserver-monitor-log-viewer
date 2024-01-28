import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import { EventObject } from '@/utils/convertToObject';

export default function Log({ event }: { event: EventObject[] }) {
  return (
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
        {event &&
          event.length > 0 &&
          event.map(item => (
            <TableRow key={item.time}>
              <TableCell>
                {dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === 'running' ? 'default' : 'destructive'
                  }
                  className="capitalize">
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{item.cpu}%</TableCell>
              <TableCell>{item.mem}%</TableCell>
              <TableCell>{prettyBytes(Number(item.vsz) * 1024)}</TableCell>
              <TableCell>{prettyBytes(Number(item.rss) * 1024)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
