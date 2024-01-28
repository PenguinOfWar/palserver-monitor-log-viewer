'use server';

import convertToObject from '@/utils/convertToObject';
import readS3File from '@/utils/readS3File';
import { parse } from 'csv-parse/sync';

export async function readLog(Key: string) {
  const file = await readS3File(Key);

  const arr: string[][] = parse(file);

  return convertToObject(arr);
}
