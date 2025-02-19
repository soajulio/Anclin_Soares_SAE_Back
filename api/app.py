from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
import sys
from werkzeug.security import generate_password_hash, check_password_hash
from flask import make_response

app = Flask(__name__)

cors = CORS(app)

def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("POSTGRES_DB", "SAE6"),
            user=os.getenv("POSTGRES_USER", "user"),
            password=os.getenv("POSTGRES_PASSWORD", "password"),
            host=os.getenv("POSTGRES_HOST", "db"),
            port=5432
        )
        return conn
    except psycopg2.Error as e:
        print(f"Erreur lors de la connexion à la base de données: {e}")
        sys.exit(1)

@app.route('/')
def hello():
    return "Backend Flask opérationnel !"

@app.route('/check_credentials', methods=['POST'])
def check_credentials():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Les champs 'username' et 'password' sont requis."}), 400

    username = data['username']
    password = data['password']

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute('SELECT password FROM users WHERE username = %s;', (username,))
    user = cur.fetchone()

    cur.close()
    conn.close()

    if user and check_password_hash(user[0], password):
        # Créer la réponse avec CORS
        response = make_response(jsonify({'message': 'Connexion réussie'}), 200)
        return response
    else:
        response = make_response(jsonify({'error': 'Nom d\'utilisateur ou mot de passe incorrect'}), 401)
        return response

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()

    if not data or 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Les champs 'username', 'email' et 'password' sont requis."}), 400

    username = data['username']
    email = data['email']
    password = generate_password_hash(data['password'])

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute('INSERT INTO users (username, email, password) VALUES (%s, %s, %s);',
                    (username, email, password))
        conn.commit()

        cur.close()
        conn.close()

        # Réponse après ajout de l'utilisateur avec CORS
        response = make_response(jsonify({"message": "Utilisateur ajouté avec succès"}), 201)
        return response

    except psycopg2.Error as e:
        conn.rollback()
        cur.close()
        conn.close()
        response = make_response(jsonify({"error": f"Erreur lors de l'ajout de l'utilisateur: {e}"}), 500)
        return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
