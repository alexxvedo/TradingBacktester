import Papa from "papaparse";
import moment from "moment";

export const processData = (csvText) => {
  const parsedData = Papa.parse(csvText, {
    header: true, // Considera la primera línea del CSV como encabezados de columna
    dynamicTyping: true, // Convierte strings de números a números reales
    skipEmptyLines: true, // Omite líneas vacías
  });

  if (!parsedData || !parsedData.data) {
    console.error("No data found after parsing CSV.");
    return [];
  }

  const data = parsedData.data
    .map((row, index) => {
      if (!row["Local time"]) {
        console.error(`Missing 'Local time' for row ${index}:`, row);
        return null; // Manejo de errores: devolver null si no hay fecha
      }
      const dateTime = row["Local time"].substring(
        0,
        row["Local time"].indexOf(" GMT")
      );
      const time = moment(dateTime, "DD.MM.YYYY HH:mm:ss.SSS").unix();

      return {
        time: time,
        open: row.Open,
        high: row.High,
        low: row.Low,
        close: row.Close,
      };
    })
    .filter((row) => row !== null); // Filtrar filas nulas si hubo errores

  data.sort((a, b) => a.time - b.time);

  return data; // Retorno de los datos procesados y ordenados
};
