import Link from "next/link";

export default function Custom404() {
  return (
    <div className="container mx-auto px-6 pt-32 min-height-screen">
      <h1 className="text-6xl sm:text-8xl leading-none font-bold text-default">
        Ooops...
      </h1>
      <span className="text-4xl mt-2 font-light text-foreground-default sm:text-7xl leading-tight">
        Doesn't look like that page exists
      </span>
      <div className="container mx-auto flex flex-wrap mt-12 justify-center">
        <img src="/undraw-404.png" alt="404 decorative image" />
        <p className="text-sm pt-3 text-center w-full sm:text-base text-gray-500 pr-3">
          Maybe you should just go{" "}
          <Link href="/">
            <a className="text-primary underline hover:no-underline transition duration-400">
              home
            </a>
          </Link>
          ?
        </p>
      </div>
    </div>
  );
}
