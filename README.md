# ⚡ MyDBSpace (Schema → Instant API)

Turn your **Drizzle ORM schema** into a live **Cloudflare D1 database + REST API** in seconds.

No backend. No boilerplate. Just define your schema and deploy.

---

## ✨ Features

- 🧩 Paste your **Drizzle ORM schema**
- 🗄️ Auto-provision **Cloudflare D1 database**
- ⚡ Generate **instant REST APIs**
- 🔄 Built-in **migrations system**
- 📊 Visual **data explorer**
- 📜 Real-time **query & request logs**
- 🚀 Deploy in seconds

---

## 🧠 How It Works

1. Write your schema using Drizzle ORM
2. Deploy it via MyDBSpace
3. We:
   - Create a D1 database
   - Apply migrations
   - Generate REST endpoints

4. You get a live API like:

```
GET     /users
GET     /users/:id
POST    /users
PUT     /users/:id
DELETE  /users/:id
```

---

## 🧪 Example Schema

```ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at").notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
});
```

---

## 🌐 Generated API

Base URL:

```
https://<project-id>.xyz.example.com
```

### Users

```
GET     /users
GET     /users/:id
POST    /users
PUT     /users/:id
DELETE  /users/:id
```

### Posts

```
GET     /posts
GET     /posts/:id
POST    /posts
PUT     /posts/:id
DELETE  /posts/:id
```

---

## 🖥️ Dashboard Pages

### 📐 Schema

- Write & validate Drizzle schema
- Live table preview
- Relationship visualization

### 📊 Data

- Browse tables
- Insert / edit / delete records
- Filtering & search

### 📜 Logs

- Real-time API + SQL logs
- Debug slow queries
- Inspect requests/responses

### 🔄 Migrations

- Auto-generated migrations
- Apply / rollback changes
- View SQL diffs

### 🔗 Endpoints

- Auto-generated REST routes
- Try-it-out API explorer

---

## 🏗️ Tech Stack

- **Frontend**: React + Tailwind + shadcn/ui
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **API Layer**: Auto-generated REST

---

## 🚀 Getting Started (Dev)

```bash
git clone https://github.com/yourusername/MyDBSpace
cd MyDBSpace
npm install
npm run dev
```

---

## ⚙️ Environment Variables

```env
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
D1_DATABASE_NAME=
BASE_DOMAIN=xyz.example.com
```

---

## 📦 Deployment

Deploy using Cloudflare Workers:

```bash
npm run deploy
```

---

## 🔮 Roadmap

- [ ] GraphQL API support
- [ ] Auth & RBAC
- [ ] Rate limiting
- [ ] Multi-region replication
- [ ] Webhooks
- [ ] OpenAPI / Swagger export

---

## 🤝 Contributing

PRs are welcome. For major changes, open an issue first.

---

## 📄 License

MIT
