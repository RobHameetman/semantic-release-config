/**
 * @param time - Usually a numeric string (e.g. '1', '7', '12') or a number (e.g. 1, 7, 12)
 */
export const clockify = (time: unknown) => String(time).padStart(2, '0')
