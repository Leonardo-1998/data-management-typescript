# Data Management Typescript

## Deskripsi

Project ini adalah aplikasi Admin Panel untuk mengelola data post, terdiri dari Backend (NestJS + Prisma) dan Frontend (React + Vite + Tailwind).

Public Page
![Public-HomePage](./assets/Public.png)

Login Page
![LoginPage](./assets/Login.png)

Edit Profile Page
![Edit Profile](./assets/EditProfile.png)

## Dependency

- Backend: NestJS, Prisma, PostgreSQL, Bycrypt, dan JsonWebToken.
- Frontend: Axios, React, Vite, Tailwind, Toastify, dan shadcn/ui.

## Design Database

Prisma Schema

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
author User @relation(fields: [authorId], references: [id], onDelete: Cascade, onUpdate: Cascade)

authorId Int
}
```

ERD

```ts
Table User {
  id int [pk, increment]
  email varchar [unique]
  password varchar
  name varchar
}

Table Post {
  id int [pk, increment]
  title varchar
  content varchar
  authorId int
}

Ref: Post.authorId > User.id
```

![ERD](./assets/ERD.png)

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

Postman Link : https://leonardo-667607.postman.co/workspace/Leonardo's-Workspace~94de4743-9fd3-4890-8dd2-9727a8bac051/collection/44033988-eef93586-83f4-4d4a-8573-ea660fc06d10?action=share&creator=44033988

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

**Response (200 - Profile retrieved successfully)**

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

---

### GET /api/user/all

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

**Response (200 - Profile deleted successfuly)**

```json
{
  "success": true,
  "message": "Profile deleted successfuly",
  "data": {
    "id": 1,
    "email": "leo123@gmail.com",
    "name": ""
  },
  "statusCode": 200
}
```

---

- ## Post

### GET /api/post/public

Mendapatkan daftar semua post (public).

**Request**

```json
_(Tidak ada Body)_
```

**Response (200 - Get all post successfuly)**

```json
{
  "success": true,
  "message": "Get all post by AuthorId successfuly",
  "data": [],
  "statusCode": 200
}
```

---

### GET /api/post/

Mendapatkan daftar post milik user (perlu token).

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
  "message": "Get all post successfuly",
  "data": [
    {
      "id": 6,
      "title": "23123",
      "content": "123456",
      "authorId": 2
    },
    {
      "id": 7,
      "title": "123132",
      "content": "45615",
      "authorId": 4
    },
    {
      "id": 9,
      "title": "ad",
      "content": "",
      "authorId": 4
    },
    {
      "id": 10,
      "title": "dakldmasklmdkl",
      "content": "mklasmdklamkldmaskldmklasmkldmaskl",
      "authorId": 4
    }
  ],
  "statusCode": 200
}
```

---

### GET /api/post/:id

Mendapatkan detail post berdasarkan ID.
Parameter Path:

- id (string): ID dari post yang ingin diambil.

Contoh:
GET /api/post/6

**Headers**

```json
Authorization: Bearer <token>
```

**Request**

```json
_(Tidak ada Body)_
```

**Response (200 - OK)**

```json
{
  "id": 6,
  "title": "23123",
  "content": "123456",
  "authorId": 2,
  "author": {
    "id": 2,
    "email": "123@mail.com",
    "password": "$2b$10$JkhVxmZGz81KyrwQSNO1Ruah3rGrPRhq2pcan6aEYZk0R5y575YDS",
    "name": ""
  }
}
```

---

### POST /api/post/create

Membuat post baru (perlu token).
Parameter Path:

**Headers**

```json
Authorization: Bearer <token>
```

**Request**

```json
{
  "title": "Random",
  "content": "This is a random post"
}
```

**Response (201 - Created)**

```json
{
  "id": 6,
  "title": "Random",
  "content": "This is a random post",
  "authorId": 7
}
```

---

### PUT /api/post/:id

Mengedit post berdasarkan ID (perlu token). Parameter Path:

- id (string): ID dari post yang ingin diupdate.

Contoh:
PUT /api/post/6

**Headers**

```json
Authorization: Bearer <token>
```

**Request**

```json
{
  "title": "leo123@gmail.com",
  "content": "123456"
}
```

**Response (200 - OK)**

```json
{
  "id": 6,
  "title": "leo123@gmail.com",
  "content": "123456",
  "authorId": 2
}
```

---

**Request**

```json
{
  "title": "",
  "content": "123456"
}

OR

{
  "title": "",
  "content": ""
}
```

**Response (400 - Bad Request)**

```json
{
  "message": ["Title is required"],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### DELETE /api/post/:id

Menghapus post berdasarkan ID (perlu token). Parameter Path:

- id (string): ID dari post yang ingin diupdate.

Contoh:
DELETE /api/post/6

**Headers**

```json
Authorization: Bearer <token>
```

**Request**

```json
_(Tidak ada Body)_
```

**Response (404 - Not Found)**

```json
{
  "id": 6,
  "title": "leo123@gmail.com",
  "content": "123456",
  "authorId": 2
}
```

---

Contoh:
DELETE /api/post/999999

**Headers**

```json
Authorization: Bearer <token>
```

**Request**

```json
_(Tidak ada Body)_
```

**Response (404 - Not Found)**

```json
{
  "message": "Post not found",
  "error": "Not Found",
  "statusCode": 404
}
```

## Dokumentasi Tambahan

- [shadcn/ui Vite](https://ui.shadcn.com/docs/installation/vite)
- [NestJS Prisma](https://docs.nestjs.com/recipes/prisma#set-up-prisma)
- [NestJS Exception Filters](https://docs.nestjs.com/exception-filters)
- [Toastify](https://fkhadra.github.io/react-toastify/introduction/#make-it-yours)
