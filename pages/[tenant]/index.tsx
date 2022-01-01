import React from 'react';
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next';

export interface ITenant {
  id: string;
  name: string;
}

const Tenant: React.FC<ITenant> = ({ name, id }) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    console.log('isFallback')
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Tenant</h1>
      <h1>ID: {id}</h1>
      <h1>Name: {name}</h1>
    </>
  )
}


// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get tenants
  const res = await fetch('http://localhost:3010/tenants')
  const tenants: ITenant[] = await res.json()

  // Get the paths we want to pre-render based on tenants
  const paths = tenants.map((t) => {
    return {
      params: {
        tenant: t.id
      }
    }
  })


  return {
    paths,

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    /**
     * SCENARIOS
     * % paths not found will return not found page (404 page)
     * 1. you have a small number of paths to pre-render.
     * 2. the new pages are not added often. 
     * 3. If you need to render the new pages so run the build again.
     */

    fallback: false

    // Enable statically generating additional pages
    // For example: `/posts/3`
    /**
     * SCENARIOS
     * % The paths not found not result in a 404 page. 
     * In this case:
     * 1. Next.js returns a “fallback” version of a page:
     *    -> The page’s props will be empty.
     *    -> with router, you can detect if the fallback is executing, 
     *       router.isFallback will be true.
     * 
     * 2. In the background, Next.js will generate the requested path.
     * 3. When that’s done, the browser receives generated path. 
     * 4. Automatically render the page with the required props. 
     * 5. From the user’s perspective, 
     *    the page will be swapped from the fallback page to the full page.
     * 6. Next.js adds this path to the list of pre-rendered pages. 
     * 7. Subsequent requests to the same path will serve the generated page, 
     *    like other pages pre-rendered at build time.
     */
    //
    // fallback: true,
  }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps<ITenant> = async ({ params }) => {
  // params contains the tenant `tenant`.
  // If the route is like /tramontina, then params.tenant is tramontina
  const url = `http://localhost:3010/tenants/${params?.tenant}`

  const res = await fetch(url)
  const tenant = await res.json()

  // if not catch here, the page will be show without props
  // can redirect to 404 page or index page
  if (res.status === 404) {
    return {
      notFound: true
    }
  }

  // Pass post data to the page via props
  return { 
    props: tenant, 
    revalidate: false
    // revalidate: 10
    /**
     * false = there is no revalidation, 
     *         so the page will be cached as built until your next build 
     * <seconds> = seconds after which a page re-generation can occur
     * */ 
  }
}


export default Tenant;