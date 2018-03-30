export const transformKilometersToMeters = distance => Math.floor(distance * 1000);

export const secondsToHoursAndMinutes = (seconds) => {
  const hours = (seconds - (seconds % 3600)) / 3600;
  const minutes = (seconds - (hours * 3600)) / 60;

  return { hours, minutes };
};

/* eslint no-mixed-operators: 0 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const p = Math.PI / 180;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
};
