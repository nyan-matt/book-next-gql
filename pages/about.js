import { useAuth } from "react-use-auth";


export default function About(props) {
  const {isAuthenticated, user } = useAuth();
  return (
    <div className="container mx-auto w-full">
      <div className="container mx-auto px-6 flex relative">
      <div
        className="sm:w-2/3 lg:w-3/5 flex flex-col relative lg:pt-32 sm:pt-0 lg:pb-40 sm:pb-2"
      >
        <span className="w-20 h-2 mb-12"></span>
        <h1 className="text-6xl sm:text-8xl flex flex-col leading-none font-bold text-default">
          About{" "}
          <span className="text-4xl mt-2 font-light text-foreground-default sm:text-7xl leading-tight">
          Brief overview of technology
          </span>
        </h1>
        <p className="text-sm pt-3 sm:text-base text-gray-500 pr-3">
          TLDR - Next.js, GraphQL, FaunaDB, Tailwind, Auth0 
        </p>
      </div>
      <div
        className="mt-8 hidden sm:block sm:w-1/3 lg:w-2/5 relative bg-local bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: "url(/undraw-about.png)" }}
      ></div>
    </div>
    <div className="container mx-auto text-default px-6 w-full content">
      <h2 className="text-3xl font-bold">Why</h2>
      <p>
        I came across a Sam Selikoff's video on <a href="https://www.youtube.com/watch?v=Z0FUBQPXHMA">Buildng my first Next.js app</a>, and really liked the idea of having a kind of boilerplate CRUD app (in his example, a recipe app) that you might rebuild with different front end stacks. 
      </p>
      <p>
        I think around that time, I had watched a couple sessions from React Europe, one of which covered the <a href="https://www.youtube.com/watch?v=UD98x-2mido">Next.js 9.4 release</a>. In the past, I have used Gatsby, but had yet to look at Next, and so here we are.
      </p>

      <h2 className="text-3xl font-bold mt-3">Next.js</h2>
      <p>
        Prerendered, static sites have gained momentum in the past 2-3 years, filling a niche and providing improved performance and developer experience for use cases involving, well... static content. Documentation, brochureware, etc, are great candidates for Gatsby or Next, but I think they are increasingly catching on in cases where we might have used a traditional SPA pattern for more interactive experiences without the bloat.
      </p>
      <p>
        Features like <a href="https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta">Incremental Static Regeneration</a> and <a href="https://nextjs.org/docs/routing/dynamic-routes">Dynamic Routes</a> include the best features of statically rendered sites with the flexibility to generate dynamic content at runtime. 
      </p>

      <h3 className="text-xl font-normal mt-2">Deployment / CD </h3>
      <p>
        As this was my first time using Next.js, it was also my first time using the <a href="https://vercel.com/">Vercel</a> deployment platform. I love using Netlify, so my expectations were high.
      </p> 
      <p>
        It was fairly easy to setup, and now whenever I push to master, my app is built in less than a minute. I also liked that branch deploys were active with zero configuration. Nice! My only question is why my site deploys to (what seems like) a million domains. 
      </p>
      
      <h2 className="text-3xl font-bold mt-3">FaunaDB / GraphQL</h2>
      <p>
        I didn't start with Fauna as my backend - I actually started with Hasura. I ran into some problems designing and configuring my database (mostly because I'm not really experienced doing so) and I wasn't quite sure how to setup foreign key relationships in Postgres so that I could access them via GraphQL relations. I've heard good things about Hasura, so I chalk this up my lack of determination 😅
      </p>
      <p>
        I hate to say it, but I think I tried <a href="https://fauna.com/">FaunaDB</a> because they had been running a lot of promoted tweets during this time. In any case, Fauna setup "clicked" for me, maybe because you can start with a graphql schema, and once I realized you could create indexes with custom search fields, I felt comfortable setting up what I needed for this app.  
      </p>

      <h2 className="text-3xl font-bold mt-3">Tailwind</h2>
      <p>
        This was my first time using <a href="https://tailwind.com">tailwind</a> css, and I like the utility-first concept. Boostrap and Bulma are nice, but I would often supplement those base styles with sass spacing utilities. It can get a little repetitive, but you can always <a href="https://tailwindcss.com/docs/extracting-components/">extract your own components</a>, or add your own styles.
      </p>
      <p>
        I began this project using theme-ui, a css-in-js jsx framework with its own components package. Initially I wasn't a huge fan of css-in-js as I found it hard to read. After a few days I got used to it, and enjoyed the flexibility. I could not get what I wanted out of the theme-ui components, so eventually I scrapped the whole thing, and converted to tailwind.
      </p>

      <h2 className="text-3xl font-bold mt-3">Authentication</h2>
      <p>
        <a href="https://auth0.com">Auth0</a> via <a href="https://github.com/Swizec/useAuth">react-use-auth</a>.
      </p>

      <h2 className="text-3xl font-bold mt-3">Design</h2>
      <p>
        Illustrations from <a href="https://undraw.co">Undraw</a>.
      </p>

      <h2 className="text-3xl font-bold mt-3">TODOs</h2>
        <ul className="list-disc list-inside">
          <li>General cleanup, add prettier, etc.</li>
          <li>Edit a book entry</li>
          <li>Delete a book entry</li>
          <li>Make theme choice persistent across hard page reloads; read from prefers-color-scheme setting</li> 
          <li>View bookshelf of another user (e.g., /bookshelf/:user</li>
          <li>Reading Lists</li>
          <li>"Like" a book</li>
          <li>Tests</li>
          <li>Add new tag</li>
          <li>Search by title, author</li>
        </ul>
    </div>
    </div>
  );
}
