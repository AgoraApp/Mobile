export const transformKilometersToMeters = distance => Math.floor(distance * 1000);

export const secondsToHoursAndMinutes = (seconds) => {
  const hours = (seconds - (seconds % 3600)) / 3600;
  const minutes = (seconds - (hours * 3600)) / 60;

  return { hours, minutes };
};
