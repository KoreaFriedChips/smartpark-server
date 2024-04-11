import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import { useFormState } from "react-dom";
import styles from "./modal.module.css";
import { formSubmit } from "./FormSubmit";
import { Sparkles, Mail, CircleUserRound, X, MoonStar } from "lucide-react";

const initialState = {
  message: "",
  name: "",
  email: "",
  error: "",
};

export default function Modal() {
  const [state, formAction] = useFormState(formSubmit, initialState);
  const name = useCookies()?.get("name");
  const email = useCookies()?.get("email");

  const title = state?.message === "success" || name ? "We've added you to our waiting list!" : "Join the wait list for SmartPark!";
  return (
    <div className={styles.background} id="modal">
      <dialog className={styles.modal}>
        <form className={styles.form} action={formAction} onSubmit={() => {}}>
          <Link href="/" className={styles.buttonClose} role="button">
            <X size={16} strokeWidth={3} className={styles.close} />
          </Link>
          <Link href="/" className={styles.logo}>
            <Image src={"/SMARTPARK-WAITLIST-ICON.png"} alt="SmartPark Logo" width={100} height={100} priority />
          </Link>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>We'll let you know when SmartPark is available near you.</p>
          {state?.message === "success" || name ? (
            <>
              <div className={styles.inputContainer}>
                <CircleUserRound className={styles.inputIcon} size={16} />
                <input type="text" value="" readOnly={true} placeholder={state?.name || name} name="name" required disabled/>
              </div>
              <div className={styles.inputContainer}>
                <Mail className={styles.inputIcon} size={16} />
                <input type="email" value="" readOnly={true} placeholder={state?.email || email} name="email" required disabled/>
              </div>
            </>
          ) : (
            <>
              <div className={styles.inputContainer}>
                <CircleUserRound className={styles.inputIcon} size={16} />
                <input type="text" placeholder="Full name..." name="name" autoCorrect="false" autoCapitalize="true" autoComplete="given-name" required />
              </div>
              <div className={styles.inputContainer}>
                <Mail className={styles.inputIcon} size={16} />
                <input type="email" placeholder="Email address..." name="email" autoComplete="email" required />
              </div>
              {/* <div className={styles.inputContainer}>
                <MoonStar className={styles.inputIcon} size={16} />
                <input type="text" placeholder="I'll use SmartPark for... (optional)" name="use" />
              </div> */}
              <input type="hidden" name="catch" />
              {state?.message === "error" && <p className={styles.error}>{state?.error}</p>}
              <button className={styles.buttonMain} type="submit">
                <Sparkles size={18} />
                Join waitlist
              </button>
            </>
          )}
        </form>
      </dialog>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import styles from "./modal.module.css";

// export default function Modal() {
//   useEffect(() => {
//     if (window.prefinery) {
//       window.prefinery = window.prefinery || function() {(window.prefinery.q = window.prefinery.q || []).push(arguments)};
//     }
//   }, []);

//   return (
//     <div className={styles.background}>
//       <dialog className={styles.modal}>
//       <div className={"prefinery-form-embed"}></div>
//         <h2 className={styles.title}>We've added you to our waiting list!</h2>
//         <p className={styles.description}>We'll let you know when SmartPark is available near you.</p>
//         <p>
//           <Link href="/" className={styles.button} role="button">
//             Close
//           </Link>
//         </p>
//       </dialog>
//     </div>
//   );
// }
