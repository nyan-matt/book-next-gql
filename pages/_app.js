import * as React from "react";
import NextApp from "next/app";
import Head from "next/head";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import Header from "../components/Header";

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Book Shelf App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
