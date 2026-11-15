import "cypress-mochawesome-reporter/register";
import "./commands";

// Ignore only known harmless errors thrown by the OrangeHRM demo front-end.
Cypress.on("uncaught:exception", (err) => {
  const knownAppNoise = [
    /ResizeObserver/i,
    /Script error/i,
    /Request failed with status code 304/i,
    /Cannot read properties of undefined \(reading 'response'\)/i,
  ];

  if (knownAppNoise.some((pattern) => pattern.test(err.message))) {
    return false;
  }
});