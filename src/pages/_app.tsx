import React, {useState} from 'react'

import '../styles/global.scss'
import Header from "../components/Header";

import styles from '../styles/app.module.scss'
import Player from '../components/Player';
import { PlayerContextProvider } from '../contexts/PlayerContext';

import { ThemeProvider } from 'styled-components';
import dark from '../styles/themes/dark';
import GlobalTheme from '../styles/global'
import light from '../styles/themes/light';


function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState(light);
  
  const toogleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalTheme/>
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header toogleTheme={toogleTheme} />
            <Component {...pageProps}/>
          </main>
          <Player/>
        </div>
      </PlayerContextProvider>
    </ThemeProvider>
    
  )
}

export default MyApp
