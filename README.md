# Data Management Typescript

## Deskripsi

Project ini adalah aplikasi Admin Panel untuk mengelola data post, terdiri dari Backend (NestJS + Prisma) dan Frontend (React + Vite + Tailwind).

## Dependency

- Backend: NestJS, Prisma, PostgreSQL, Bycrypt, dan JsonWebToken.
- Frontend: Axios, React, Vite, Tailwind, dan shadcn/ui.

## Design Database

```ts
model User {
id Int @default(autoincrement()) @id
email String @unique
password String
name String?
posts Post[]
}

model Post {
id Int @default(autoincrement()) @id
title String
content String?
author User @relation(fields: [authorId], references: [id])
authorId Int
}
```

## Fitur Utama

- CRUD Post (Create, Read, Update, Delete)
- Pencarian post berdasarkan judul
- Tampilan responsif dan modern

## Instalasi

### Backend

1. Masuk ke folder Backend:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup database (PostgreSQL) dan Prisma:
   ```bash
   npx prisma migrate dev
   ```
4. Jalankan server:
   ```bash
   npm run start:dev
   ```

### Frontend

1. Masuk ke folder Frontend:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

## Daftar API (Backend - NestJs)

- ## User

### POST /api/user/register

Register user baru.

**Request**

```json
{
  "email": "leo123@gmail.com",
  "password": "123456"
}
```

**Response Sucess (200 - Register successful)**

```json
{
  "success": true,
  "message": "Register successful",
  "data": {
    "id": 6,
    "email": "leo123@gmail.com",
    "password": "$2b$10$J1KqDNwc8/vAYSd2n/hmL.KgcwE0o9LS.oEHxikvKf/1acgPWk7WO",
    "name": null
  },
  "statusCode": 200
}
```

**Response Sucess (409 - Email already exists)**

```json
{
  "message": "Email already exists",
  "error": "Conflict",
  "statusCode": 409
}
```

**Request**

```json
{
  "email": "",
  "password": ""
}
```

**Response (400 - Bad Request)**

```json
{
  "message": [
    "Invalid email format",
    "Email is required",
    "Password minimal 6 characters",
    "Password is required"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### POST /api/user/login

Login user, mendapatkan token.

**Request**

```json
{
  "email": "leo123@gmail.com",
  "password": "123456"
}
```

**Response (200 - Login Successful)**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibGVvMTIzQGdtYWlsLmNvbSIsImlhdCI6MTc3MDY0ODg1NH0.j3UHx8z2NegWOXMZpkpQvn3mgtMhdLs5iYjIXsIiyA0"
  },
  "statusCode": 200
}
```

**Request**

```json
{
  "email": "",
  "password": ""
}
```

**Response (400 - Bad Request)**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibGVvMTIzQGdtYWlsLmNvbSIsImlhdCI6MTc3MDY0ODg1NH0.j3UHx8z2NegWOXMZpkpQvn3mgtMhdLs5iYjIXsIiyA0"
  },
  "statusCode": 200
}
```

**Request**

```json
{
  "email": "99999@mail.com",
  "password": "123456"
}

OR

{
	"email": "leo123@mail.com",
    "password": "123123123123"
}
```

**Response (400 - False Email or Password)**

```json
{
  "message": [
    "Invalid email format",
    "Email is required",
    "Password minimal 6 characters",
    "Password is required"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### GET /api/user/profile

Mendapatkan profil user (perlu token).

**Headers**

```json
Authorization: Bearer <token>
```

**Request**

```json
_(Tidak ada Body)_
```

**Response**

```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "email": "leo123@gmail.com",
    "name": "Leonardo1"
  },
  "statusCode": 200
}
```

- ### GET /api/user/all

  Mendapatkan daftar semua user.

  **Request**

  ```json
  _(Tidak ada Body)_
  ```

  **Response(200 - Profile retrieved successfully)**

  ```json
  {
    "success": true,
    "message": "Profile retrieved successfully",
    "data": [
      {
        "userWithOutPassword": {
          "id": 2,
          "email": "123@mail.com",
          "name": ""
        }
      },
      {
        "userWithOutPassword": {
          "id": 6,
          "email": "leo123@gmail.com",
          "name": null
        }
      }
    ],
    "statusCode": 200
  }
  ```

---

### PUT /api/user/update

Update profil user (perlu token).

**Headers**

```json
Authorization: Bearer <token>
```

**Request**

```json
{
  "name": "Leonardo1"
}
```

**Response(200 - Profile updated successfully)**

```json
{
  "success": true,
  "message": "Profile updated successfuly",
  "data": {
    "id": 1,
    "email": "leo123@gmail.com",
    "name": "Leonardo1"
  },
  "statusCode": 200
}
```

**Request**

```json
{
  "name": ""
}
```

**Response(200 - Profile updated successfully)**

```json
{
  "success": true,
  "message": "Profile updated successfuly",
  "data": {
    "id": 1,
    "email": "leo123@gmail.com",
    "name": "Leonardo1"
  },
  "statusCode": 200
}
```

---

### DELETE /api/user/delete

Hapus user (perlu token).
**Headers**

```json
Authorization: Bearer <token>
```

**Request**

```json
_(Tidak ada Body)_
```

**Response**

## Post

- **GET /api/post/public**
  Mendapatkan daftar semua post (public).

  Request()

  **Response**

  ```ts

  ```

```

- **GET /api/post/**
  Mendapatkan daftar post milik user (perlu token).
- **GET /api/post/:id**
  Mendapatkan detail post berdasarkan ID.
- **POST /api/post/create**
  Membuat post baru (perlu token).
- **PUT /api/post/:id**
  Mengedit post berdasarkan ID (perlu token).
- **DELETE /api/post/:id**
  Menghapus post berdasarkan ID (perlu token).

> Untuk endpoint yang membutuhkan token, gunakan header:
> `Authorization: Bearer <token>`

Tambahkan bagian ini ke README agar pengguna tahu API yang tersedia.

## Dokumentasi Tambahan

- [shadcn/ui Vite](https://ui.shadcn.com/docs/installation/vite)
- [NestJS Prisma](https://docs.nestjs.com/recipes/prisma#set-up-prisma)
- [NestJS Exception Filters](https://docs.nestjs.com/exception-filters)
```
