// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiGateWay: 'http://localhost:8501/api/v1',
  domainApiGateWay: 'http://localhost:8501',
  domainApiSite: 'http://localhost:8502',
  domainMapBox: 'https://api.mapbox.com/geocoding/v5',


  mapboxKey: 'pk.eyJ1IjoiZmFsY29tIiwiYSI6ImNrMnFnbXBkYzBlejkzY3F2dXhoemFseWEifQ.q1mMOuX5WObYc4NodwCZ7A',

  lang: 'es',
  mainCountry: 'MX', // pais principal
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
