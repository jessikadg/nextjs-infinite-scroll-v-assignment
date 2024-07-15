# Infinite Scroll in Next.js [no external libraries]
<img width="1448" alt="Screenshot 2024-07-15 at 08 56 46" src="https://github.com/user-attachments/assets/9bca61e6-39a4-4631-933e-978312edc16f">

## Requirements
For this assignment, I have received the following instructions:

Based on the provided screenshots, make a simple infinite-scroll capable web application that allows for the user to browse items and favourite them.

- You are to use Pexels API (recommended) or a similar API for data retrieval. If you choose another API, make sure it supports paginated results, unique images with some metadata and a way for us to access it. Please include (in the repository) an API key so that we can test the app.
- Design should be recreated as closely as possible, including item hover state.
- Responsive design (with at least three breakpoints — Desktop, Tablet, Phone).
- Infinite scroll - it's a concept where additional data is loaded when user scrolls down the screen.
- A possibility to favourite an item (favourites should not be lost on page reload).
- Tests. We write a lot of tests and we'd love to see them. Don't get discouraged if you have no experience in writing tests, though. That's not a prerequisite to submit the homework assignment.
- Static typing. We prefer TypeScript. However, that's only one non-crucial criteria and we'd rather see good JavaScript code than bad TypeScript code.
- Sufficient documentation (instructions how to run the code and everything else that you'd see value in documenting in real world)
- It is preferred to use React, but you can write vanilla JS code as well (no other libraries/frameworks, though).
- You are only allowed to use react, react-dom and your choice of any development-environment specific libraries (testing tools, babel, etc). All other 3rd-party libraries are forbidden (react-router, Redux, lodash, jQuery, axios, bootstrap, etc).
- For styling you can choose a solution that you think works best, such as regular CSS/SCSS, CSS modules, Styled Components, etc. However, you are not allowed to use styling and UI frameworks such as bootstrap, material-ui, tailwind and similar. We want the code to be your own.
Lazy-loading images.
- A responsive image solution (Save traffic by loading higher quality images only when it’s needed).


## Decision-making and Development process:

### Design
- I opted for Next.js + Typescript for that was the framework for the role. Also, from a technical perspective, Next.js offers features that allow for great image optimization, which was a big focus of this assignment. With their <Image /> component, I wouldn't need much more to create a highly-performant application.
- Since the assignment mentioned explicitly to try to reproduce the Design from a screenshot, I focused on creating cards with fixed width and heights, that would re-position themselves on the screen with flex wrap.
- In my portfolio page I already dislpay a lot of attention to detail and screen-size responsiveness, so I focused my time mostly on creating really top notch clean code and less on creating a suberb reposnsive experience. But if I was to do so, I would adjust the images to be full-width on mobile in one column, adjust the max-width on larger screens, and make the cards a percentage of the width instead of a fixed width, so that the images always 'pop' nicely no matter the screen size. 
- I also didn't spend too much time creating good-looking Loading states. To make them look neat usually external libraries are used, and I assumed that probably wasn't the focus of the assignment.
  
### API call
- The data is being called from a server-side function `getImagesList`. That would be the most performant approach. I also added some caching policy with revalidation every hour, which is the frequency Pexels adds new Images to their "Curated" endpoint.

### Features
- Inside `HomeLayout.tsx`, we have the layout for the page itself, and I added two custom hooks for the main functionalities requested for the assignment: `useFavouriteImage.ts` and `useInfiniteScroll.ts`.
- The choice on hooks was to create a nice clean component on HomeLayout and keep the code clean. As a principle, we want to avoid one component excecuting more than one task. With the hooks, we can separate the functionalities, reuse them anywhere in the application, and it makes the code look super clean and readable.
- On `useInfiniteScroll`, the component fetches the initial set of data, and observes the `elementRef` which is a paragraph at the end of the page. Whenever it's visible on the screen again, it will recall the API, to fetch the next set of data from the next page of the API. Once the API call is made, the images are displayed very quickly due to all the opmitisations in place. It receives the `elementRef` and returns the `displayedImages`, `loading` state and `loadingError`. That was the best approach I could think of considering the requirements of the test, and the functionality is quite solid.
- For the image favouriting, there were a few options I considered: either I could go with `redux-persist`, or with local storage. Considering the library limitations, and the amount of necessary boiler plate for redux, I decided to go with local storage.
- So on `useFavouriteImage` I created a state, which would be an array of numbers, corresponding to the image ID. On first render, it checks if there are any image IDs on local storage and updated the state. Whenever a "Favourite" button is clicked, a function is called, and updated the state. And with an `useEffect` we update the local storage every time the state changes. The hook can then be called directly inside `ImageCard.tsx`

### Performance 
- Before the Loading states, we had a really good Performance analysis from LightHouse, 91 on Performance, and 100 on all others. After the Loading state was added, that caused a layout shift initially, which hindered our scores. But I thought it would be important to show in the code how I would handle Loading and Error states with this set up. Since the code is the focus of the assignment I decided to keep it. In a real-world scenario, we wouldn't have this layout shifts: loading states would be handled with "skeletons" for the UI (which is proven to be the best User Experience according to recent research), or at least a nicer loading bar or spinner. So the layout shift would not occur.
- I also made the ImageCards to be loaded only on the client side by adding a dynamic import on `HomeLayout.tsx` for them. This way, the server only needs to handle the data fetching, and the images are only loaded on the client side.
- I noticed that Pexels had a srcSet of its own, with different sizes for images, but I went with the server side Image optimisation approach. For that, I had to trim out the pre-defined widths and heights from the URL, so that Next.js could recalculate and resize accordingly on the server side with its native Image component. That also boosted Performance pretty nicely compared to before. Alternatively we could also try to use the src set coming from Pexels and set up something manually and test performance, but then we would be completely reliable on Pexel itself offering us good sizing for its images, which wouldnt' be ideal.

### Tests
- Creating the setup for tests took a long time, so unfortunately I couldn't add much. But I did add tests for the API call, to make sure the response was where, and if not, that errors were displayed on the Logs.
- For other tests dealing with rendering elements, I ran into some setup issues and couldnt get it up and running on time. But I would want to test for the main functionalities like: are the images displayed when provided from the API, is the infinite scroll working properly, is the image favouriting working as expected. I would also try to find a way to automate tests for peak traffic loads, and other edge cases.
- 




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
