# belajar-vibe-coding

Backend API menggunakan Bun, ElysiaJS, Drizzle ORM, dan MySQL.

## Stack

- **Runtime**: [Bun](https://bun.sh)
- **Framework**: [ElysiaJS](https://elysiajs.com)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Database**: MySQL

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Konfigurasi environment

```bash
cp .env.example .env
```

Edit `.env` sesuai konfigurasi database MySQL kamu.

### 3. Jalankan migration

```bash
bun run db:generate
bun run db:migrate
# atau langsung push ke database (development)
bun run db:push
```

### 4. Jalankan server

```bash
# Development dengan watch mode
bun run dev

# Production
bun run start
```

## Endpoints

| Method | Path       | Deskripsi       |
|--------|------------|-----------------|
| GET    | /health    | Health check    |
| GET    | /users     | List semua user |
| GET    | /users/:id | Get user by ID  |
| POST   | /users     | Buat user baru  |
| PUT    | /users/:id | Update user     |
| DELETE | /users/:id | Hapus user      |

## Struktur Folder

```
src/
├── db/
│   ├── index.ts       # Koneksi database
│   ├── schema.ts      # Schema Drizzle
│   └── migrations/    # File migration (generated)
├── routes/
│   └── users.ts       # Route CRUD users
└── index.ts           # Entry point
drizzle.config.ts      # Konfigurasi Drizzle Kit
```
