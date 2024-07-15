// utils/localforageConfig.js
import localforage from "localforage";

localforage.config({
  driver: [localforage.INDEXEDDB],
  name: "backtester",
  version: 1.0,
  storeName: "sessionData", // Nombre del almacén
  description: "Almacén de datos del grafico de la sesión",
});

export default localforage;
