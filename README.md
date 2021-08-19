# GoodWood store app
Full stack e-commerce app created with **React**, **Redux** and **Material UI** framework.\
Frontend uses newest React concepts such as: functional components, React Hooks and Redux Hooks. \
Backend in **Node.js** and **MongoDB** with **Mongoose**.\
Application has a PWA standard.\
Unordered shopping cart is restored from db using an express session object.
Unit tests on frontend are written with **Jest** and **Enzyme**.
There are some backend unit tests written in **Mocha** and **Chai**.

## Deployed on Heroku
https://evening-dusk-70267.herokuapp.com/

## Run project locally
1. `yarn install`
2. run local mongo db with `mongod`
3. `yarn start-server` => you'll get built app at http://localhost:8000
4. `yarn start` => you'll get app in development mode at http://localhost:3000

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-server`

Starts server with nodemon on default port 8000 or defined in process env.

### `yarn test`

Launches the tests for front-end in the interactive watch mode.

### `yarn test-backend` or `yarn test-backend:watch`

Lauche backend tests.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

