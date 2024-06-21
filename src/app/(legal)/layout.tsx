import type { Metadata } from "next";
import "@/app/globals.css";
import styles from "@/app/(legal)/legal.module.css";
import Header from "@/components/Header";

export const runtime = "edge";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.section}>
        {children}
      </div>
    </main>
  );
}
