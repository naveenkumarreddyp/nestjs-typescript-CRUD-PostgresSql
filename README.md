
# NEST JS - PostgreSQL - Objection.js ORM 

Nest framework with TypeScript


# Project setup


```bash
  https://github.com/naveenkumarreddyp/nestjs-typescript-CRUD-PostgresSql.git
```

# Compile and run the project

```bash
  cd nestjs-typescript-CRUD-PostgresSql
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

watch mode

```bash
npm run start:dev
```

production mode

```bash
npm run start:prod
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_HOST`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`DB_PORT`

## DB Connection and Table Creation

CRUD Operations created on products. when app starts with start command table 'products' will automatically creates if not existed.

All API's in current project were handled on products table only.


## API Reference

#### Add Product

```http
  POST /api/v1/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `json` | {"name": "IPhone 13","category": "Electronics","description": "Latest Iphone 13 Mobile","price": 69999,"stock": 20} |

#### Get Products

```http
  GET /api/v1/products?skip=0&limit=10&sort=id:desc&search=category:Iphone
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `skip`      | `number` | number of products to skip |
| `limit`      | `number` | number of products to limit in a page |
| `sort`      | `fieldName:sortOrder` | field name along with sort type |
| `search`      | `fieldName:searchValue` | field name along with search value |


#### Get Product by id

```http
  GET /api/v1/products//${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of product to fetch |


#### Update Product By id

```http
  PATCH /api/v1/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of product to update |
| `body` | `json` | data to update - {"name": "IPhone 13","category": "Electronics"} |

#### Delete Product by id

```http
  DELETE /api/v1/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of product to delete - Soft delete - makes isActive as False |


#### Insert Products through CSV file upload

```http
  POST /api/v1/products/upload
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `header`      | `header` | Content-Type:multipart/form-data |
| `body`      | `form-data` | file:products.csv |




## Features

- Developed CRUD Operations API's using NestJs - Postgresql - Objection Js Orm
- When serever started table 'products' will be created if 'products' table not existed in the db
- 'id' is auto inceremented when new product is getting inserted
- Implemented filters of 'search', 'sort' and pagination of 'skip', 'limit'
- Implemented soft delete - just making isActive as false while deleting product using delete API
- Developed api to upload CSV data of products. 
- Provided CSV File and Postman API Collection for reference.

