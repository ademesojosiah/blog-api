# blog-api
This is an api for a Blog app

---

## Requirements
1. User should be able to sign up
2. User should be able to and sign in to the blog app with passport authentication strategy  token which expires after 1 hour
3. Users should have a first_name, last_name, email, password when signing up and - email and password to sign in
4. Logged in and not logged in users should be able to get a list of published blogs created
5. Logged in and not logged in users should be able to to get a published blog
6. A blog can be in two states; draft and published
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs. 
13. It should be filterable by state
14. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
15. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
    default it to 20 blogs per page. 
16. It is also searchable by author, title and tags.
17. It is also orderable by read_count, reading_time and timestamp
18. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1


---

## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm start`

---
## Base URL
- somehostsite.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  email     | string  |  required, unique | 
|  first_name | string  |  required|
|  last_name  |  string |  required |
|  password |   string |  required  |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required , unique|
|  description |  string |  |
|  author | mongoose.Types.ObjectId | ref:'User'|
|  state | string | enum: ['Draft','Published']|
|  tags |   string |   |
|  body |  string |  required |


## APIs
---

### Signup User

- Route: /auth/signup
- Method: POST
- Body: 
```
{
    "first_name": "eri",
    "last_name": "Ogunseye",
    "email": "eri@gmail.com",
    "password": "secret",
}
```

- Responses

Success
```
{
  "user": {
    "first_name": "eri",
    "last_name": "Ogunseye",
    "email": "eri@gmail.com",
    "password": "$2b$10$n4DlouV0ucabGCXHQ5gKeeyPO/ar8Gyzygqf.3Qi3.fK8pfQD8WdG",
    "_id": "636678b7283f52463dde032f",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2Njc4YjcyODNmNTI0NjNkZGUwMzJmIiwiZW1haWwiOiJlcmlAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJlcmkgT2d1bnNleWUiLCJpYXQiOjE2Njc2NTk5NTksImV4cCI6MTY2ODI2NDc1OX0.JWDLGOAkCtIAKmd1nR6Yr4RPZCoz5fwZ3Xy3JEy5yA4",
  "message": "account succesfully created"
}


```
---
### Login User

- Route: auth/login
- Method: POST
- Body: 
```
{
  "email": "eri@gmail.com",
  "password": "secrett",
}
```

- Responses

Success
```
{
  "user": {
    "user": {
      "_id": "636678b7283f52463dde032f",
      "first_name": "eri",
      "last_name": "Ogunseye",
      "email": "eri@gmail.com",
      "password": "$2b$10$n4DlouV0ucabGCXHQ5gKeeyPO/ar8Gyzygqf.3Qi3.fK8pfQD8WdG",
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2Njc4YjcyODNmNTI0NjNkZGUwMzJmIiwiZW1haWwiOiJlcmlAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJlcmkgT2d1bnNleWUiLCJpYXQiOjE2Njc2NjAzNTEsImV4cCI6MTY2ODI2NTE1MX0.YDKr40xcVslPKOM_ZHSS9d-JmBvCVAGjfkQ0af_O26c"
  },
  "message": "Login successful"
}
```

### not logged in users routes

---
### Get published  blog


- Route: /blog/all
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - order_by (default: createdAt)
    - order_by ('read_count' for asc, '-read_count' for desc)
    - author
    - title
    - tags
- Responses

Success
```
{
 status: true,
 blog:[]
}
```
---
### Get a published blog

- Route: /blog/all/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "status": true,
  "blog": {
    "_id": "636685f9e392c6cf8c087d6a",
    "title": "manchester city",
    "description": "king of pass ",
    "author": {
      "_id": "6364f7f02d071da00221cb76",
      "first_name": "logo",
      "last_name": "semilogo",
      "email": "logo@gmail.com",
      "__v": 0
    },
    "writtenBy": "logo semilogo",
    "state": "Published",
    "read_count": 1,
    "reading_time": "0.168 minutes",
    "tags": "football",
    "body": "hi, history of football is beig said here ",
    "createdAt": "2022-11-05T15:49:13.054Z",
    "updatedAt": "2022-11-05T15:49:43.984Z",
    "__v": 0
  }
}
```

### logged in users only 
---
### Create  a Blog (logged in users only )

- Route: /user/blog/create
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
"title":"testing new routes",
"description":"not much to say",
"state":"Published",
"tags":"sense",
"body":"omo, i have nothing to say to you do your worse"
}
```

- Responses

Success
```
{
  "status": true,
  "blog": {
    "title": "testing new routes",
    "description": "not much to say",
    "author": "6364f7f02d071da00221cb76",
    "writtenBy": "logo semilogo",
    "state": "Published",
    "read_count": 0,
    "reading_time": "0.188 minutes",
    "tags": "sense",
    "body": "omo, i have nothing to say to you do your worse",
    "_id": "63659f18d3e7a0b702d0cad9",
    "createdAt": "2022-11-04T23:24:08.768Z",
    "updatedAt": "2022-11-04T23:24:08.768Z",
    "__v": 0
  }
}
```
---
### Get all published blog (logged in users only )


- Route: /user/blog/published
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - order_by (default: createdAt)
    - order_by ('read_count' for asc, '-read_count' for desc)
    - author
    - title
    - tags
- Responses

Success
```
{
 status: true,
 blog:[]
}
```
---

---
### Get a published blog  (logged in users only )

- Route: /user/blog/published/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "status": true,
  "blog": {
    "_id": "636685f9e392c6cf8c087d6a",
    "title": "manchester city",
    "description": "king of pass ",
    "author": {
      "_id": "6364f7f02d071da00221cb76",
      "first_name": "logo",
      "last_name": "semilogo",
      "email": "logo@gmail.com",
      "__v": 0
    },
    "writtenBy": "logo semilogo",
    "state": "Published",
    "read_count": 1,
    "reading_time": "0.168 minutes",
    "tags": "football",
    "body": "hi, history of football is beig said here ",
    "createdAt": "2022-11-05T15:49:13.054Z",
    "updatedAt": "2022-11-05T15:49:43.984Z",
    "__v": 0
  }
}
```
---
### Get all my blogs created by me (logged in users only )

- Route: /user/blog/all
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 5)
    - state (Draft, Published)
- Responses

Success
```
{
 status: true,
 blog:[]
}
```
---

### Get a blog from my blogs  (logged in users only )

- Route: /user/blog/all/:id
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "status": true,
  "blog": {
    "_id": "636685f9e392c6cf8c087d6a",
    "title": "manchester city",
    "description": "king of pass ",
    "author": {
      "_id": "6364f7f02d071da00221cb76",
      "first_name": "logo",
      "last_name": "semilogo",
      "email": "logo@gmail.com",
      "__v": 0
    },
    "writtenBy": "logo semilogo",
    "state": "Published",
    "read_count": 1,
    "reading_time": "0.168 minutes",
    "tags": "football",
    "body": "hi, history of football is beig said here ",
    "createdAt": "2022-11-05T15:49:13.054Z",
    "updatedAt": "2022-11-05T15:49:43.984Z",
    "__v": 0
  }
}
```
---

### update my blog  (logged in users only )

- Route: /user/blog/all/:id
- Method: patch
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "state": "Published"
}
```

- Responses

Success
```
{
  "status": true,
  "blog": {
    "_id": "636685f9e392c6cf8c087d6a",
    "title": "manchester city",
    "description": "king of pass ",
    "author": {
      "_id": "6364f7f02d071da00221cb76",
      "first_name": "logo",
      "last_name": "semilogo",
      "email": "logo@gmail.com",
      "__v": 0
    },
    "writtenBy": "logo semilogo",
    "state": "Published",
    "read_count": 1,
    "reading_time": "0.168 minutes",
    "tags": "football",
    "body": "hi, history of football is beig said here ",
    "createdAt": "2022-11-05T15:49:13.054Z",
    "updatedAt": "2022-11-05T15:49:43.984Z",
    "__v": 0
  }
}


```
---

### delete a  blog  (logged in users only )

- Route: /user/blog/all/:id
- Method: delete
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "status": true,
  "blog": {
    "acknowledged": true,
    "deletedCount": 1
  }
}


```
---

...

## Contributor
- Ademeso Josiah