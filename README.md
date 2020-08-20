### Simple Warehouse Management System

### Endpoint
* http://localhost:3000/api/v1/users
    1. / (GET)
    2. / (POST)
    3. /:id (GET)
    4. /:id (PATCH)
    5. /:id (DELETE)
* http://localhost:3000/api/v1/products
    1. / (GET)
    2. / (POST)
    3. /:id (GET)
    4. /:id (PATCH)
    5. /:id (DELETE)
* http://localhost:3000/api/v1/in
    1. / (GET)
    2. / (POST)
    3. /:id (GET)
    4. /:id (PATCH)
    5. /:id (DELETE)
* http://localhost:3000/api/v1/out
    1. / (GET)
    2. / (POST)
    3. /:id (GET)
    4. /:id (PATCH)
    5. /:id (DELETE)
* http://localhost:3000/api/v1/auth
    1. /login (POST)
    2. /signup (POST)
* http://localhost:3000/api/v1/report/:type/:product-id
    type = IN/OUT
