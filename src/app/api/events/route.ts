import getS3Files from '@/utils/getS3Files';

// export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET() {
  const files = await getS3Files();

  return Response.json(files);
}
