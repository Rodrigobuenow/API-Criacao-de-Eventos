### 📚 Trabalho de Programação Web I / Equipe 5

## 📋 Api Ultilizando Node.js express via Postman

1. Cria um novo evento (nome, data referencia).
2. Lista os eventos criados.
3. Deleta um evento (pelo nome), se ainda não tiver acontecido.

## 🛠️ Instalar

Intalar SQLite para rodar o banco de dados

```bash
npm i
```

## 🏃 Para Rodar o app

```bash
node server.js
```

# 1. Criação de um novo evento (nome, data referencia)

```json
{
  "nome": "Meu Evento",
  "data_referencia": "2023-11-15",
  "id": "01"
}
```

# 2. Lista os eventos criados

GET<http://localhost:3000/eventos>

# 3. Deleta um evento (pelo nome), se ainda não tiver acontecido

DELETE<http://localhost:3000/eventos/:nome>

### 👨‍💻 Trabalho Executado por:

- Rodrigo
- Wendel
- Raquel
- Diogo
- Ysabella
