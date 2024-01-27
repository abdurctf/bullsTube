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
      <h1 className={styles.title}>BullsTube</h1>
      <p className={styles.tagline}>USF students favorite video sharing platform</p>
      
      
      <div className={styles.watchButtonContainer}>
        <Link href="/watch" passHref>
          <button className={styles.watchButton}>Go to Watch Page</button>
        </Link>
      </div>
    </main>
  )
}
