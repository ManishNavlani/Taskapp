
# Task App

A Task App to add tasks, read tasks and delete tasks.


## Documentation





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file



`PORT`=3001

`JWT_SECRET`=ThisIsMyFirstJwtToken
`MONGODB_URL`=mongodb+srv://manish:manish@cluster0.a7em3.mongodb.net/?retryWrites=true&w=majority


## API Reference

#### Backend Base url
http://localhost:3001/

#### Login User
```http
  POST users/login
```

#### Sign up User
```http
  POST users/signup
```
#### Get tasks

```http
  GET tasks?completed=${completed}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `completed`      | `Boolean` | **Required**. Boolean to fetch |

#### Create Task
```http
  POST tasks
```

#### Update Task
```http
  PATCH tasks/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String` | **Required**. Id to Update |

#### Delete Task
```http
  DELETE tasks/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String` | **Required**. Id to Delete |


## Run Locally

Clone the project

```bash
  git clone https://github.com/ManishNavlani/Taskapp.git
```

Split terminal into two (frontend and backend)


Go to the project directory (for both frontend and backend)
```bash
  cd Taskapp
```

for frontend side terminal
```bash
  cd Client
```
for backend side terminal
```bash
  cd Api
```


Install dependencies of bothend

```bash
  npm install
```

Start the server of bothend

```bash
  npm run dev
```

## Author

- [@ManishNavlai](https://github.com/ManishNavlani)
