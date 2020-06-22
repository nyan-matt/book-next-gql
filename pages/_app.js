import React from "react";
import NextApp from "next/app";
import Head from "next/head";
import "../styles/index.css";
// import { ThemeProvider } from "theme-ui";
//import theme from "../styles/theme";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion";

export default class App extends NextApp {
  constructor(props) {
    super(props);
    this.state = { theme: 'dark' };
  }
  
  handleThemeSwitch = (theme) => {
    theme === 'dark' ? 
    this.setState({theme: 'dark'}) 
    : 
    this.setState({theme: 'light'})
  } 

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <div className={`theme-${this.state.theme} bg-background-default wrapper`}>
        <Head>
          <title>Book Shelf App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header currentTheme={this.state.theme} handler={this.handleThemeSwitch} />
        <AnimatePresence exitBeforeEnter key={router.route}>
          <Component {...pageProps} />
        </AnimatePresence>
        <footer className="h-48 mt-36 border-t border-gray-500 ">

        </footer>
      </div>
    );
  }
}
