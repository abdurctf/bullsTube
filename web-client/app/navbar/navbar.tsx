import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image width={150} height={90}
          src="/bullstube.svg" alt="BullsTube Logo"/>
      </Link>
    </nav>
  );
}
