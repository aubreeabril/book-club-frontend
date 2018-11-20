# Book Club

Book Club is an application for managing book clubs.

## Features

Users can:

- Login or register using Auth0
- Search for and save books
- Make and join book clubs
- Select book club date
- Nominate and vote on books

[Full demo](https://youtu.be/bkCJCK8nF2Y) | [Try it live](https://aubrees-book-club.herokuapp.com/)

## Built With

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux)
- [Ant Design](https://github.com/ant-design/ant-design)
- [New York Times Bestsellers API](https://developer.nytimes.com/)
- [Google Books API](https://developers.google.com/books/)

## Setup

If you haven't already, setup the [backend](https://github.com/aubreeabril/book-club-backend) for this application.

Fork and clone this repository.

You'll need an [Auth0 Client ID](https://auth0.com), a [Google Books API Key](https://developers.google.com/books/) and a [New York Times Bestsellers List API Key](https://developer.nytimes.com).

You'll need to replace the Auth0 Client ID in 'src/Auth/Auth.js' and the API keys in 'src/redux/actions/index.js' with your own.

Then:
`yarn start`
