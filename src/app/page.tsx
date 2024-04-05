import Image from "next/image";
import styles from "./page.module.css";
import Left from "@/components/Left";
import Right from "@/components/Right";


export default function Home() {
  return (
   <div className={styles.main}>
      <div className={styles.left}>
       <Left/>
      </div>
      <div className={styles.right}>
       <Right/>
      </div>
   </div>
  );
}
