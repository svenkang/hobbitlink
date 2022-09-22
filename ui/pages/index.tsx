import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './../styles/Home.module.css'
import { ChevronRight } from '@mui/icons-material';
import { AppBar, Container, IconButton, InputAdornment, TextField, Toolbar } from '@mui/material'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hobbit Link</title>
        <meta name="description" content="Hobbit Link is a URL shortener service" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar>
              <Image width="30" height="30" src="/images/favicon.svg" alt="Hobbit Link"/>
            </Toolbar>
          </Container>
        </AppBar>
        <div className={styles.mainLogo}>
          <Image width="200" height="200" src="/images/logo.svg" alt="Hobbit Link"/>
        </div>
        <div className={styles.mainButtonGroup}>
          <TextField 
            size="small"
            variant="outlined" 
            label="Url" 
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton edge="end" color="primary">
                    <ChevronRight />
                  </IconButton>
                </InputAdornment>
            }}
          />
        </div>
      </main>
    </div>
  )
}

export default Home
