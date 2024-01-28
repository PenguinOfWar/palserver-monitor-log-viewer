import { parse } from 'csv-parse/sync';
import convertToObject from '@/utils/convertToObject';
import readS3File from '@/utils/readS3File';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET() {
  const file = await readS3File('palserver.csv', 'perf/');

  const arr: string[][] = parse(file);

  const converted = convertToObject(arr);

  return Response.json(converted);
}
