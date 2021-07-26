# To Do App

This is a fairly simple to-do list android app built with Ionic React. The app allows users to create create lists and organize them in categories. The app consumes the [to do API](https://github.com/michaelacook/to-do-api), a project I previously built as a learning project with node and Express.

## Running locally

To run the app on your location machine:

`git clone https://github.com/michaelacook/todo-ionic-app.git && npm install` then run `ionic serve`

To install the app to an android mobile device, open `/android` in Android Studio and emulate or push to a device.

## Technologies

- TypeScript
- React
- Redux
- Ionic

## Authentication

The API uses a simple HTTP Basic Authentication scheme to authenticate users with the server. While Basic Auth is not ideal due to the fact that the user's password is sent over the network each time a request is made to a protected endpoint, I considered it to be an ideal authentication strategy for this project given that user data is unlikely to be in any way sensitive.

## Redux

Redux was, strictly speaking, probably not necessary for such a small app. My main motivation for using it was to gain familiarity with it. However, Redux also proved useful as state needed to be frequently updated as a user interacts with the application. Each time a user makes a change to a list or adds a new list for example, the application needs to update categories to keep lists and their corresponding categories in sync. This is because when categories are fetched from the API, their corresponding lists are eagerly loaded so that they can be shown in dropdown accordion-style lists. Redux actions simplified this greatly, making the use of Redux worthwhile for this project.
