DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR NOT NULL
);

INSERT INTO users (username, password, email) VALUES ('admin', 'scrypt:32768:8:1$6xL58chXNfRQZm7B$3ae7d35760aa403b98d6d17a9182e8c0bcce8dc841ebba023eb1d1ff8084e758b77e9c101f366ba95cbd95feeb05587d047630c339143ecb519e7bff52f59da6', 'admin@example.com'); 

DROP TABLE IF EXISTS historique;

CREATE TABLE historique (
    id SERIAL PRIMARY KEY,
    plante_nom TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    prediction_score REAL,
    image BYTEA,
    url TEXT,
    timestamp TIMESTAMP
);

INSERT INTO historique (plante_nom, latitude, longitude, prediction_score, image, url, timestamp)
VALUES 
('Rose', 48.8566, 2.3522, 0.95, 
    pg_read_binary_file('/chemin/vers/ton/image1.jpg'), 
    'https://example.com/rose', 
    NOW()
),
('Tulipe', 52.3667, 4.8945, 0.90, 
    pg_read_binary_file('/chemin/vers/ton/image2.jpg'), 
    'https://example.com/tulipe', 
    NOW()
),
('Orchidée', 34.0522, -118.2437, 0.85, 
    pg_read_binary_file('/chemin/vers/ton/image3.jpg'), 
    'https://example.com/orchidee', 
    NOW()
);
