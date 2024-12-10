# COMP229 Sample App - MERN 
## Online Market Shop
Features

- User Signup, Signin, Profile, List Users
- Manage Shops for Seller
- Manage Products in the Shop

**Configuration**

MongoDb connection string is defined in `config/config.js`

`mongoUri` property


**Building project**

Build server code
```
yarn
```

Build client code

```
cd client
yarn
```

**How to start the project locally**

```
cd client
npm run dev
```

in the console you will see URLs for frontend (e.g. Local:   http://localhost:5173/)

and also the 'Server started on port 3000', which means the url of the server: http://localhost:3000

To build the client and make it run on server url:

```
cd client
yarn build
cd ..
node server.js
```

Then you can open your webapp frontend on the server url: http://localhost:3000
