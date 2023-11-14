## Backend Code for Job Portal 
Workshala where student can land their dream jobs and internships. Workshala provides various services related to internships, training, and skill development. It primarily focuses on helping students and young professionals find internships and opportunities to gain practical experience in their chosen fields. Internshala offers a wide range of internship listings across various industries, including engineering, business, computer science, design, and more.EndFragment.
## Tech Stack

**Server:** Node, Express , MongoDB

**Deployment:** render.com


## API Reference

### SIGNUP


#### Example Request

```nodejs
var axios = require('axios');
var data = '{\r\n    "email" : "example@example.com",\r\n    "password" : "12345",\r\n    "name" : "example",\r\n    "number" : "9323232323"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'http://workshala.onrender.com/signUp',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


```
| Url | Method    | Description                |
| :-------- | :------- | :------------------------- |
| POST | /signUp | User provides email, password, number and name |

### Login
#### Example Request
```javascript
var axios = require('axios');
var data = '{\r\n    "email" : "example@example.com",\r\n    "password" : "12345"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'http://workshala.onrender.com/login',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

| Url | Method  | Description                       |
| :-------- | :------- | :-------------------------------- |
| POST      | /login | User logs in with Email and Password |





