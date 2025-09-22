import json
import sqlite3

# Arquivo JSON de entrada (com os campos extras)
input_json_file = "data.json"

# Nome do banco de dados de saída
output_db_file = "db.sqlite"

# Nome da tabela
table_name = "words"

# === 1. Carregar os dados ===
with open(input_json_file, "r", encoding="utf-8") as f:
    raw_data = json.load(f)

# === 2. Limpar os dados ===
cleaned_data = [
    {
        "word": item["word"],
        "meaning": item["meaning"]
    }
    for item in raw_data["data"]
]

# === 3. Criar o banco de dados SQLite ===
conn = sqlite3.connect(output_db_file)
cursor = conn.cursor()

# Criar tabela
cursor.execute(f"""
CREATE TABLE IF NOT EXISTS {table_name} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    meaning TEXT NOT NULL,
    selfcreated BOOLEAN DEFAULT 0
);
""")

cursor.execute(f"""
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word_id INTEGER NOT NULL,
    FOREIGN KEY (word_id) REFERENCES words (id)
);
""")

cursor.execute(f"""
CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word_id INTEGER NOT NULL,
    searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES words (id)
);
""")

# Limpar tabela se já existir (opcional)
cursor.execute(f"DELETE FROM {table_name};")

# === 4. Inserir dados limpos ===
for item in cleaned_data:
    cursor.execute(
        f"INSERT INTO {table_name} (word, meaning) VALUES (?, ?)",
        (item["word"], item["meaning"])
    )

# Salvar e fechar
conn.commit()
conn.close()

print(f"✅ Banco de dados criado com sucesso: {output_db_file}")
