# address-book-api


#### A REST API of an address book using Node.js, Express and MnogoDB

Capabilities:
-   GET - SignUp, SignIn, Get a list of contacts with  pagination, Get a single contact, full text search
-   POST - Insert a new contact, Insert bulk contact
-   PUT - Update a contact
-   DELETE - Delete a contact

###### Installation:

Clone the git repository / download and extract the .zip file. Navigate into the root of your application on commandline and type `npm install` . It will install all the dependencies listed in package.json.

###### How to run the code:

Navigate into the root of the application and type `node server.js` to start the server. The server can be accessed at `http://localhost:3001`.


## User account Siginup

**URL** : `/api/users/signup`

**Method** : `POST`

**Auth required** : NO

###### Request Body:

```
{
    "name": "Shohanur",
    "email": "shohanurr490@gmail.com",
    "password": "123456789"
}
```

###### Response:

```
{
    "success": true,
    "message": "User found",
    "data": {
        "email": "shohanurr490@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQxNjRjN2JlNzBkN2E0NWE1NjYyNSIsImVtYWlsIjoic2hvaGFudXJyNDkwQGdtYWlsLmNvbSIsImlhdCI6MTY2NjUwMjM0NCwiZXhwIjoxNjY2NTEzMTQ0fQ.RNDlD9gGGot2Vlfr9f_hGoMAADtB9t5du7XVNX5KwQs"
}

```

##  User account SiginIn

**URL** : `/api/users/signin`

**Method** : `POST`

**Auth required** : YES

###### Request Body:

```
{
    "email": "shohanurr490@gmail.com",
    "password": "123456789"
}
```

###### Response:

```
{
    "success": true,
    "message": "User found",
    "data": {
        "email": "shohanurr490@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQxNjRjN2JlNzBkN2E0NWE1NjYyNSIsImVtYWlsIjoic2hvaGFudXJyNDkwQGdtYWlsLmNvbSIsImlhdCI6MTY2NjUwOTM0MCwiZXhwIjoxNjY2NTIwMTQwfQ.wMS5zS9zsVBc3Ga0Z2vQ7NErGCwnpC-ObO3-5FD7pmM"
}
```


## Add a new contact

**URL** : `/api/contacts/`

**Method** : `POST`

**Auth required** : YES

###### Request Body:

```
{
    "name": "Sam",
    "phone": "+01737084478",
    "email": "sam@gmail.com",
    "city": "Dhaka"
}
```

###### Response:

```
{
    "success": true,
    "message": "Contact created successfully",
    "data": {
	"id": "635568bd5a273d1e3f36bc58",
	"name": "Sam",
	"phone": "+01737084478",
	"email": "sam@gmail.com",
	"city": "Dhaka"
   }
}

```



## Add bulk contacts

**URL** : `/api/contacts/bluk`

**Method** : `POST`

**Auth required** : YES

###### Request Body:

```
[
	{
		"name": "Kona",
		"phone": "+9876703002685",
		"email": "kona@gmail.com",
		"city": "Bogra"
	},
	
	{
		"name": "Shanto",
		"phone": "+11129801776324",
		"email": "shanto@gmail.com",
		"city": "Bogra"
	}
]
```

###### Response:

```
{
    "success": true,
    "message": "Contact created successfully",
    "data": [
        {
            "authorId": "6354164c7be70d7a45a56625",
            "name": "Kona",
            "phone": "+9876703002685",
            "email": "kona@gmail.com",
            "city": "Bogra",
            "_id": "63556aa25a273d1e3f36bc5a",
            "__v": 0
        },
        {
            "authorId": "6354164c7be70d7a45a56625",
            "name": "Shanto",
            "phone": "+11129801776324",
            "email": "shanto@gmail.com",
            "city": "Bogra",
            "_id": "63556aa25a273d1e3f36bc5b",
            "__v": 0
        }
    ]
}

```


## Fetch details of single contact

**URL** : `/api/contacts/:contactId

**Method** : `GET`

**Auth required** : YES

###### Response:

```
{
    "success": true,
    "message": "Contact found",
    "data": {
        "id": "6354252fe812f92d0801932e",
        "name": "shawon",
        "phone": "+8801703001689",
        "email": "shawon@gmail.com",
        "city": "Gaibandha"
    }
}
```

## Fetch phase matching results

**URL** : `/api/contacts/search?key=value

**Method** : `GET`

**Auth required** : YES

###### Response:

```
[
    {
        "_id": "635568bd5a273d1e3f36bc58",
        "authorId": "6354164c7be70d7a45a56625",
        "name": "Sam",
        "phone": "+01737084478",
        "email": "sam@gmail.com",
        "city": "Dhaka",
        "__v": 0
    }
]
```

## Fetch the list of contacts with pagination

**URL** : `/api/contacts?page=1&limit=2

**Method** : `GET`

**Auth required** : YES

###### Response:

```
{
    "success": true,
    "message": "Contact found",
    "data": [
        {
            "_id": "63542d371d9296b7c145eeee",
            "authorId": "6354164c7be70d7a45a56625",
            "name": "hasan",
            "phone": "+8801703001681",
            "email": "akdd@gmail.com",
            "city": "Gaibandha",
            "__v": 0
        },
        {
            "_id": "6354ea4d8964ee80c9976541",
            "authorId": "6354164c7be70d7a45a56625",
            "name": "Kamal",
            "phone": "+8801703001683",
            "email": "kamal@gmail.com",
            "city": "Bogra",
            "__v": 0
        }
    ]
}
```

## Update the given contact

**URL** : `/api/contacts/:contactId`

**Method** : `PUT`

**Auth required** : YES

###### Request Body:

```
{
	"name": "Sam",
	"phone": "+01737084478",
	"email": "sam@gmail.com",
	"city": "Dhaka"
}
```

###### Response:

```
{
	"success": true,
	"message": "Contact updated successfully",
	"data": {
		"id": "635568bd5a273d1e3f36bc58",
		"name": "Sam",
		"phone": "+01737084478",
		"email": "sam@gmail.com",
		"city": "Dhaka"
}

```

## Delete the given contact

**URL** : `/api/contacts/:contactId

**Method** : `DEL`

**Auth required** : YES

###### Response:

```
{
    "success": true,
    "message": "Contact deleted",
    "data": {
        "id": "6354252fe812f92d0801932e",
        "name": "shawon",
        "phone": "+8801703001689",
        "email": "shawon@gmail.com",
        "city": "Gaibandha"
    }
}
```
