export type EventObject = {
  time: string;
  status: string;
  cpu: string;
  mem: string;
  vsz: string;
  rss: string;
};

export default function convertToObject(array: string[][]): EventObject[] {
  return array.map(item => ({
    time: item[0],
    status: item[1],
    cpu: item[2],
    mem: item[3],
    vsz: item[4],
    rss: item[5]
  }));
}
