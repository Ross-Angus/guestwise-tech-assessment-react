// Accepts time in the format `12:34`.
// Normalises times such as `1:5` into `01:05`.
export default function NormaliseTime(time: string): string {
  if (time.length < 5) {
    let [hours, minutes] = time.split(':');
    if (hours.length < 2) hours = `0${hours}`;
    if (minutes.length < 2) minutes = `0${minutes}`;
    time = `${hours}:${minutes}`;
  }
  return time;
};
