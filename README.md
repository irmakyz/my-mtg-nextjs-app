# My MTG Next.js App

This is a Magic The Gathering card application built with Next.js, React, Redux, and Tailwind CSS. The application allows users to search for cards, view card details, and mark cards as favorites.

## Installation

To install the necessary dependencies, run the following command:

```bash
npm run install
```

## Running the App

To start the development server, run the following command:

```bash
npm run dev
```

This will start the app on [http://localhost:3000].

---

## Technical Decisions

### Filtering
The filtering functionality is implemented using a combination of React state and Redux. The search term is stored in a local state, and the favorites are managed using Redux. The card list is filtered based on the search term and the favorites state.

### Pagination
Pagination is implemented by fetching a specific page of cards from the API and updating the state accordingly. The Pagination component handles the page changes and updates the URL parameters.

### Favorites
Favorites are managed using Redux. The `favoritesSlice` in the Redux store keeps track of the favorite cards. The `FavoriteButton` component dispatches actions to add or remove cards from the favorites.

### API Integration
The application fetches card data from the Magic The Gathering API. The `fetchCardList` and `fetchCardDetail` functions in the `api.js` file handle the API requests.

## Performance Improvement Decisions

### Lazy Loading

Lazy loading is implemented to load components only when they are needed, which reduces the initial bundle size and speeds up the initial load of the application. In this project, components like `CardItem` are lazy-loaded to improve the performance of the page. By only loading the necessary components when they are required (for example, when they come into the viewport), the application can handle large lists or grids without negatively impacting the initial loading time.

### Server-Side Rendering (SSR)

Server-side rendering (SSR) is used for the pages to pre-render content on the server. This improves the time-to-first-byte (TTFB) and ensures that the content is available to search engines, which is critical for SEO. By fetching card details and list on the server, the page is delivered as fully rendered HTML, reducing the need for JavaScript to render the page on the client side. This leads to faster load times and improved SEO for content that relies on external data.

### Hybrid Approach (SSR + Client-side Rendering)
In the homepage, since there is user interaction (search), the hybrid approach is used. The initial fetching for the list items in the server side. Since searching and paginating updates state dynamically it makes sense to handle this on the client-side for a smoother experience. So avoid unnecessary server requests and keep the UI responsive.

### Memoization 

Memoization is applied to components to avoid unnecessary re-renders. React’s `React.memo` helps optimize performance by ensuring that a component is only re-rendered when its props change. In a list of items (like cards), where the majority of the components may not need updates, memoization ensures that only the necessary components are re-rendered. This significantly improves performance, especially when rendering large lists or grids of items.

### Callbacks with `useCallback`

`useCallback` is used to memoize functions and prevent them from being recreated on every render. By ensuring that callback functions (like event handlers) are only created when their dependencies change, it reduces the performance cost of unnecessary re-creations. This is particularly useful when passing functions as props to child components or when using them in hooks that depend on specific values. By memoizing these callbacks, it is avoided potential performance issues caused by unnecessary renders and function re-creations.

---

## Duration
The development duration of this project is in total 1 day.

## Running Tests

To run the tests, use the following command:

```bash
npm run test
```