import psycopg2
import sys
import re
import os

try:
    # Connexion à la base de données PostgreSQL
    conn = psycopg2.connect(
        dbname=os.getenv("POSTGRES_DB", "SAE6"),
        user=os.getenv("POSTGRES_USER", "user"),
        password=os.getenv("POSTGRES_PASSWORD", "password"),
        host=os.getenv("POSTGRES_HOST", "db"),  
        port=5432
    )
    cur = conn.cursor()

    with open('/db/script/create.sql') as f:
        fichier = f.read()
        lines = fichier.split(";")
        for index, line in enumerate(lines):
            line = line.replace("\n", "")
            line = re.sub("\s+", " ", line)
            if line.strip():
                cur.execute(line)

    
    with open('/db/script/init.sql') as f:
        fichier = f.read()
        lines = fichier.split(";")
        for index, line in enumerate(lines):
            line = line.replace("\n", "")
            line = re.sub("\s+", " ", line)
            if line.strip():
                cur.execute(line)

    conn.commit()
    conn.close()

except psycopg2.Error as e:
    print(f"Erreur lors de la connexion à la base de données: {e}")
    sys.exit(1)
