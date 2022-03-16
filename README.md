# e-shop eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

![screenshot](https://github.com/zintesar/e-shop-mern/blob/master/uploads/Screen%20Shot%202020-09-29%20at%205.50.52%20PM.png)

- LIVE DEMO : [E-Shop](https://zint-eshop.herokuapp.com)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = 'mongodb://127.0.0.1:27017/e-shop'
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = 'AUTukrwqC51whHvpU3rXSm7_kUM016G7b-LSEHu6F0zI_pSj0KPJpEEOnmQfroUWs4bruhS7P4CslXTV'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```

```
paypal sandbox id

sb-0efhy13041947@personal.example.com
i%HhN4%M

```

This is the course project for [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) course
