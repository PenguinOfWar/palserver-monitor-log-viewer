import { S3Client, ListObjectsV2Command, _Object } from '@aws-sdk/client-s3';

export default async function getS3Files(): Promise<_Object[]> {
  const client = new S3Client({
    region: String(process.env.AWS_REGION),
    credentials: {
      accessKeyId: String(process.env.AWS_KEY),
      secretAccessKey: String(process.env.AWS_SECRET)
    }
  });

  const command = new ListObjectsV2Command({
    Bucket: String(process.env.AWS_BUCKET),
    Prefix: 'log/',
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1
  });

  try {
    let isTruncated = true;

    let contents: _Object[] = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);

      if (Contents) {
        contents = [
          ...contents,
          ...(Contents.map(item =>
            Number(item.Size) > 0 ? { ...item } : false
          ).filter(Boolean) as _Object[])
        ];
      }

      isTruncated = !!IsTruncated;

      command.input.ContinuationToken = NextContinuationToken;
    }

    return contents.sort((a, b) =>
      String(a.Key) < String(b.Key) ? 1 : String(b.Key) < String(a.Key) ? -1 : 0
    );
  } catch (err) {
    return [];
  }
}
