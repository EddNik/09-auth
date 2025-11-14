"use client";

import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import { RegisterRequest } from "@/types/user";
import { useState } from "react";

function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState("");
  const [username, setUsername] = useState(user?.username || "");

  const handleCancel = () => {
    const answer = confirm("Are you sure?");
    if (answer) {
      router.push("/profile");
    }
  };

  async function handleSubmit(formData: FormData) {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const response = await updateMe(formValues);
      if (response) {
        setUser(response);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setUsername(value);
    if (value.trim().length < 1) {
      setError("Name must be at least 1 characters long");
    }
  }

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={user?.avatar || "/avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo} action={handleSubmit}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                className={css.input}
                onChange={handleChange}
                defaultValue={username}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={css.input}
                defaultValue={user?.email}
              />
            </div>

            {error && <p className={css.error}>{error}</p>}

            <p>Email: user_email@example.com</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={css.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditProfilePage;
