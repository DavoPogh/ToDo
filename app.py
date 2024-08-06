from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN NOT NULL CHECK (completed IN (0, 1))
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET', 'POST', 'DELETE'])
def tasks():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    if request.method == 'POST':
        new_task = request.json.get('text')
        cursor.execute('INSERT INTO tasks (text, completed) VALUES (?, ?)', (new_task, 0))
        conn.commit()
        return jsonify({'status': 'success'}), 201

    elif request.method == 'GET':
        cursor.execute('SELECT * FROM tasks')
        tasks = cursor.fetchall()
        return jsonify(tasks)

    elif request.method == 'DELETE':
        cursor.execute('DELETE FROM tasks')
        conn.commit()
        return jsonify({'status': 'success'}), 200

    conn.close()

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
