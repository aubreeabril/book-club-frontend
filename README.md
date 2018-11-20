# Book Club

Book Club is an application for managing book clubs.

## Features

Users can sign up or login, search for and save books or browse bestsellers and join and create book clubs. Once in a book club, users can choose the date of the next meeting and nominate and vote on the next book to read.

## Setup

If you haven't already, setup the [backend](https://github.com/aubreeabril/book-club-backend) for this application.

Fork and clone this repository.

You'll need an [Auth0 Client ID](https://auth0.com), a [Google Books API Key](https://developers.google.com/books/) and a [New York Times Bestsellers List API Key](https://developer.nytimes.com).

You'll need to replace the Auth0 Client ID in 'src/Auth/Auth.js' and the API keys in 'src/redux/actions/index.js' with your own.

Then:
`yarn start`
