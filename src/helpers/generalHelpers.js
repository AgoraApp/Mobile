export const transformKilometersToMeters = distance => Math.floor(distance * 1000);

export const roundAngleToFives = (angle) => {
  const fiveMinuteAngle = (2 * Math.PI) / 144;

  return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle;
};
