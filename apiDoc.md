## Register
(POST)http://localhost:5000/api/auth/register

{
    "name":"john",
    "email":"john@gmail.com",
    "password":"456789",
    "phone":9776543320,
    "role":"user"
}

## user
(GET)http://localhost:5000/api/auth/users

## login
(POST)http://localhost:5000/api/auth/login
(body)=>{"email":"Sam@gmail.com" , "password":"Sam1234"}
(response)=>
{
    "auth": true,
    "token": "eyJhbG"
}

## userInfo
(GET) http://localhost:5000/api/auth/userInfo
(Header)=>{"x-access-token":"eyJhbG"}


