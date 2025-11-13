"use client";
import css from "./ErrorMessage.module.css";

function Error({ error }: { error: Error }) {
  return (
    <p className={css.text}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
}
export default Error;
