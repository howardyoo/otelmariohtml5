// other import statements...
import { HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';


const configDefaults = {
 ignoreNetworkEvents: true,
 // propagateTraceHeaderCorsUrls: [
 // /.+/g, // Regex to match your backend URLs. Update to the domains you wish to include.
 // ]
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomEmail() {
  const firstNames = [
    'John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Michael', 'Laura', 'David', 'Sarah'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Hernandez'
  ];

  const randomFirstName = firstNames[getRandomInt(0, firstNames.length - 1)];
  const randomLastName = lastNames[getRandomInt(0, lastNames.length - 1)];

  return `${randomFirstName}.${randomLastName}@email.com`;
}

const sdk = new HoneycombWebSDK({
 // endpoint: "https://api.eu1.honeycomb.io/v1/traces", // Send to EU instance of Honeycomb. Defaults to sending to US instance.
 debug: true, // Set to false for production environment.
 apiKey: '<your-api-key>', // Replace with your Honeycomb Ingest API Key.
 serviceName: 'mariohtml5', // Replace with your application name. Honeycomb uses this string to find your dataset when we receive your data. When no matching dataset exists, we create a new one with this name if your API Key has the appropriate permissions.
 instrumentations: [getWebAutoInstrumentations({
   // Loads custom configuration for xml-http-request instrumentation.
   '@opentelemetry/instrumentation-xml-http-request': configDefaults,
   '@opentelemetry/instrumentation-fetch': configDefaults,
   '@opentelemetry/instrumentation-document-load': configDefaults,
   '@opentelemetry/instrumentation-user-interaction': { ignoreNetworkEvents: true, eventNames: ['submit', 'click', 'keypress', 'keydown', 'keyup'] },
 })],
 resourceAttributes: {
  "user.id": generateRandomEmail()
 }
});
sdk.start();