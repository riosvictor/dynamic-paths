This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


///

Scenario 1 (fallback = false, revalidate = false):
PURE STATIC

- run `yarn server` in a terminal
- run `yarn build` in another terminal
- then three pages will be builded
- run `yarn start` in second terminal

- SEE:
  - the paths will be loaded without use server
  - the props of pages will be loaded without server
  - they use just builded data
- if you call a not build page, will return 404 page

%%%%%%%%%%%
Scenario 2 (fallback = true, revalidate = false):
STATIC - use server just to load a new page

- on `getStaticPaths` comment line `fallback: false`
- on `getStaticPaths` uncomment line `fallback: true`
- run `yarn server` in a terminal
- run `yarn build` in another terminal
- then three pages will be builded
- run `yarn start` in second terminal
- go to builded page
- go to not builded page
- insert a the tenant `{ "id": "next", "name": "Next.JS" }` in `bd.json`
- access this new page

- SEE:
  - the paths will be loaded without use server
  - the props of pages will be loaded without server
  - they use just builded data
- if you call a not build page, will try get this page
  - if not found return a empty props
    - in others calls to a before not founded, the server is not used
    - you can catch this case
  - if found the new page 
    - load this path, build the new path
    - and add in list paths
    - the server is not call after

%%%%%%%%%
Scenario 3 (fallback = false, revalidate = 10 // seconds):
STATIC - use server just to load a new page
ISR - incremental static regeneration

- on `getStaticPaths` uncomment line `fallback: false`
- on `getStaticPaths` comment line `fallback: true`
- on `getStaticProps` comment line `revalidate: false`
- on `getStaticProps` uncomment line `revalidate: 10`
- run `yarn server` in a terminal
- run `yarn build` in another terminal
- then three pages will be builded
- run `yarn start` in second terminal
- go to builded page
- go to not builded page
- change tenants name field in `bd.json`
- after any seconds, go to the pages that the info was changed

- SEE:
  - the paths will be loaded without use server
  - the props of pages will be loaded by rule revalidation
  - they use just builded page, but get props in server in window time
- if you call a not build page, will return 404 page

%%%%%%%%%%%
Scenario 4 (fallback = true, revalidate = 10):
STATIC - use server just to load a new page

- on `getStaticPaths` comment line `fallback: false`
- on `getStaticPaths` uncomment line `fallback: true`
- run `yarn server` in a terminal
- run `yarn build` in another terminal
- then three pages will be builded
- run `yarn start` in second terminal
- go to builded page
- go to not builded page
- change tenants name field in `bd.json`
- insert a the tenant `{ "id": "next", "name": "Next.JS" }` in `bd.json`
- access this new page

- SEE:
  - the paths will be loaded without use server
    - the props of pages will be loaded by rule revalidation
    - they use just builded page, but get props in server in window time
- if you call a not build page, will try get this page
  - if not found return a empty props
    - in others calls to a before not founded, the server is not used
    - you can catch this case
  - if found the new page 
    - load this path, build the new path
    - and add in list paths
    - the server is not call after

