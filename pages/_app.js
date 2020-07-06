import React, { useState } from "react";
import App from "next/app";
import Head from "next/head";
import "../styles/index.css";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { AuthProvider } from "react-use-auth";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [theme, setTheme] = useState('dark');
  
  const handleThemeSwitch = (theme) => {
    theme === 'dark' ? 
    setTheme('dark') 
    : 
    setTheme('light')
  } 

  return (
    <AuthProvider
      navigate={router.push}
      auth0_domain="nyan-matt.us.auth0.com"
      auth0_client_id="nnu7QRkKbG99GGcWqwTHnTICaBhs0NDc"
    >
      <div className={`theme-${theme} bg-background-default wrapper`}>
        <Head>
          <title>Book Shelf App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header currentTheme={theme} handler={handleThemeSwitch} />
        <AnimatePresence exitBeforeEnter key={router.route}>
          <Component {...pageProps} />
        </AnimatePresence>
        <footer className="h-48 mt-36 border-t border-gray-500">
        </footer>
      </div>
    </AuthProvider>
  )
}

export default class _App extends App {
  render () {
    return <MyApp {...this.props} />
  }
}