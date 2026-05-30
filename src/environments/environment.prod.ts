export const environment = {
  production: true,
  mapboxToken: (typeof process !== 'undefined' && (process as any).env && (process as any).env.MAPBOX_TOKEN) ? (process as any).env.MAPBOX_TOKEN : 'YOUR_MAPBOX_TOKEN_HERE',
};
