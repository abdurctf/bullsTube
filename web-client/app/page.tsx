// import styles from './page.module.css'

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Is hot reload working&nbsp;
//           <code className={styles.code}>app/page.tsx</code>
//         </p>
//       </div>
//     </main>
//   )
// }
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bullstube</h1>
      <p className={styles.tagline}>USF students' favorite video sharing platform</p>
      <p className={styles.competitor}>A new competitor to Youtube, built for you!</p>
      
      <div className={styles.auth}>
        <form className={styles.authForm}>
          <input type="text" placeholder="Username" className={styles.authInput} />
          <input type="password" placeholder="Password" className={styles.authInput} />
          <button type="submit" className={styles.authButton}>Login</button>
          <button type="button" className={styles.authButton}>Sign Up</button>
        </form>
      </div>
      
      
      <div className={styles.watchButtonContainer}>
        <Link href="/watch" passHref>
          <button className={styles.watchButton}>Go to Watch Page</button>
        </Link>
      </div>
    </main>
  )
}
