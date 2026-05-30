// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Token is read from the MAPBOX_TOKEN environment variable if present.
  // This enables CI secrets integration without hard‑coding the key.
  mapboxToken: (typeof process !== 'undefined' && (process as any).env && (process as any).env.MAPBOX_TOKEN) ? (process as any).env.MAPBOX_TOKEN : 'YOUR_MAPBOX_TOKEN_HERE',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
