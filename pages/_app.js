import React, { useState } from "react";
import App from "next/app";
import Head from "next/head";
import "../styles/index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { AuthProvider } from "react-use-auth";

const CLIENT_ID = process.env.CLIENT_ID;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");

  const handleThemeSwitch = (theme) => {
    theme === "dark" ? setTheme("dark") : setTheme("light");
  };

  return (
    <AuthProvider
      navigate={router.push}
      auth0_domain="nyan-matt.us.auth0.com"
      auth0_client_id={CLIENT_ID}
    >
      <div className={`theme-${theme} bg-background-default`}>
        <div className="flex-grow min-h-screen pb-12">
          <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-6085930-4"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-6085930-4', {
                page_path: window.location.pathname,
              });
              `,
            }}
            />
            <title>Book Shelf App</title>
            <link rel="icon" href="/favicon.ico" />
            
          </Head>
          <Header currentTheme={theme} handler={handleThemeSwitch} />
          <AnimatePresence exitBeforeEnter key={router.route}>
            <Component {...pageProps} />
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default class _App extends App {
  render() {
    return <MyApp {...this.props} />;
  }
}
