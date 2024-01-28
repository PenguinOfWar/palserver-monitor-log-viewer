import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export default async function readS3File(Key: string): Promise<string> {
  const client = new S3Client({
    region: String(process.env.AWS_REGION),
    credentials: {
      accessKeyId: String(process.env.AWS_KEY),
      secretAccessKey: String(process.env.AWS_SECRET)
    }
  });

  const command = new GetObjectCommand({
    Bucket: String(process.env.AWS_BUCKET),
    Key
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response?.Body?.transformToString();

    return String(str);
  } catch (err) {
    return 'Error';
  }
}
