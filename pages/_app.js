import React from "react";
import NextApp from "next/app";
import Head from "next/head";
import "../styles/index.css";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";

export default class App extends NextApp {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Book Shelf App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <AnimatePresence exitBeforeEnter key={router.route}>
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    );
  }
}
