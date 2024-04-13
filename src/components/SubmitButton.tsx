"use client";

import { useFormStatus } from "react-dom";
import { Sparkles } from "lucide-react";
import styles from "./modal.module.css";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <button className={styles.buttonMain} type="submit" disabled={pending}>
        <Sparkles size={18} />
        Join now
      </button>
      {pending && <p className={styles.error}>Adding you to the waitlist...</p>}
    </>
  );
}
