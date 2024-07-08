import mysql.connector
import csv
import glob
import os
from datetime import datetime
from tqdm import tqdm

# Conexión a la base de datos
db = mysql.connector.connect(
    host = "gateway01.eu-central-1.prod.aws.tidbcloud.com",
    port = 4000,
    user = "4DxC9xcoGZbT9DA.root",
    password = "dAzMnMS1WhbxgnI4",
    database = "test",
    ssl_ca = "./isrgrootx1.pem",
    ssl_verify_cert = True,
    ssl_verify_identity = True
)

cursor = db.cursor()

# Directorio de archivos CSV
csv_directory = '.'

# Obtener lista de archivos CSV en el directorio
csv_files = glob.glob(os.path.join(csv_directory, '*.csv'))

# Función para verificar si el timestamp ya existe en la base de datos
def timestamp_exists(timestamp):
    try:
        query = "SELECT 1 FROM Datos WHERE timestamp = %s LIMIT 1"
        cursor.execute(query, (timestamp,))
        return cursor.fetchone() is not None
    except mysql.connector.Error as err:
        print(f"Error checking timestamp: {err}")
        return False

# Procesar cada archivo CSV
for csv_file_path in csv_files:
    with open(csv_file_path, newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Saltar la cabecera
        
        # Contar el número de filas para la barra de progreso
        total_rows = sum(1 for row in csv.reader(open(csv_file_path))) - 1  # menos la cabecera

        batch_data = []
        for row in tqdm(reader, total=total_rows, desc=os.path.basename(csv_file_path)):
            try:
                # Parsear el timestamp y convertir a objeto datetime
                timestamp_str = row[0].replace(" GMT+0200", "")
                timestamp = datetime.strptime(timestamp_str, '%d.%m.%Y %H:%M:%S.%f')

                if timestamp_exists(timestamp):
                    continue

                open_value = float(row[1])
                high_value = float(row[2])
                low_value = float(row[3])
                close_value = float(row[4])
                volume = float(row[5])

                batch_data.append((timestamp, open_value, high_value, low_value, close_value, volume))

                # Inserciones en lote cada 1000 filas para optimización
                if len(batch_data) == 1000:
                    query = """
                    INSERT INTO Datos (timestamp, open, high, low, close, volume)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """
                    cursor.executemany(query, batch_data)
                    db.commit()
                    batch_data = []

            except mysql.connector.Error as err:
                print(f"Error: {err}")
                db.rollback()
            except Exception as e:
                print(f"Error: {e}")

        # Insertar cualquier dato restante en batch_data
        if batch_data:
            try:
                query = """
                INSERT INTO Datos (timestamp, open, high, low, close, volume)
                VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.executemany(query, batch_data)
                db.commit()
            except mysql.connector.Error as err:
                print(f"Error: {err}")
                db.rollback()
            except Exception as e:
                print(f"Error: {e}")
                db.rollback()

cursor.close()
db.close()
