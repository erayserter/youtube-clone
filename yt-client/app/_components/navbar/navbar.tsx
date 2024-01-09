"use client";

import { SignIn } from "./sign-in";
import Link from "next/link";
import Image from "next/image";

import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "@/firebase/firebase";
import { User } from "firebase/auth";

export function Navbar() {
  // Initialize user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(
    () => {
      const unsubscribe = onAuthStateChangedHelper((user: User | null) => {
        setUser(user);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    },
    [] /* No dependencies, never rerun */
  );

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <span className={styles.logoContainer}>
          <Image
            width={90}
            height={20}
            className={styles.logo}
            src="/youtube-logo.svg"
            alt="YouTube Logo"
          />
        </span>
      </Link>
      <SignIn user={user} />
    </nav>
  );
}
