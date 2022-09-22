import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './../styles/Home.module.css'
import Button from '@mui/material/Button'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hobbit Link</title>
        <meta name="description" content="Hobbit Link is a URL shortener service" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <Image src="/images/logo.svg" alt="HobbitLink" width={50} height={50}/>
        <Button variant="outlined" color="primary">
          Hobbify
        </Button>
      </main>
    </div>
  )
}

export default Home
