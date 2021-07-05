# [Makan](https://makan-food-ordering-app.herokuapp.com/)

## Technologies
  * Deployment: Heroku
###### Frontend
  * ReactJS
  * React-Redux
  * Redux-Thunk
  * Cloudinary
  * Design: [React Boostrap](https://react-bootstrap.github.io/)
  * Axios
###### Backend
  * NodeJS (ES6)
  * ExpressJS
  * express-async-handler
  * Password encryption: [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  * JWT validation: jsonwebtoken
  * Object-modeller: mongoose
  * Database: MongoDB (NoSQL)
###### Tools
  * React-devtools-extension
  * Postman [Collecton](https://www.getpostman.com/collections/a309405233acf0c29972)

## Why MERN Stack?
I had been occasionally watching videos about Redux as I was intruiged as to why it's still the go-to library for developers despite the emergence of React Context. So I decided to hop on with a stack that I'm most comfortable with while I get my hands dirty with learning Redux. With the intention of also improving my previous projects, I wanted to explore more on MongoDB to figure best practices, how I could improve the architecture of my database models, and how I could make use of its uncommon features to make my backend code more _DRY_.


## Database Modelling
<img width="918" alt="Screenshot 2021-07-05 at 11 02 49 PM" src="https://user-images.githubusercontent.com/25051776/124490916-3d434480-dde5-11eb-9813-4d03101e8e48.png">

## [Wireframing & Planning]
[miro](https://miro.com/app/board/o9J_l9eoHZc=/)

## Installation on localhost
### Packages
##### On root directory
```
npm i client-install
```
### Create a .env file in the root directory
##### Indicate your JWT secret key and MongoDB cluster connection string
```
JWT_SECRET=
MONGODB_URI=
```
##### Run the client and server concurrently
```
npm run dev
```
