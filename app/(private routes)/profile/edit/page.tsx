"use client";

import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe, UpdateMeRequest } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import { useState } from "react";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";

function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState("");
  const [username, setUsername] = useState(user?.username || "");

  const handleCancel = () => {
    const answer = confirm("Are you sure?");
    if (answer) {
      router.back();
    }
  };

  async function handleSubmit(formData: FormData) {
    try {
      const formValues = Object.fromEntries(formData) as UpdateMeRequest;
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setUsername(value);
    if (value.trim().length < 3) {
      setError("Name must be at least 3 characters long");
    }
  }

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <AvatarPicker />

          {/* <Image
            src={user?.avatar || "/avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          /> */}

          <form className={css.profileInfo} action={handleSubmit}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                className={css.input}
                onChange={handleChange}
                value={username}
              />
            </div>

            {error && <p className={css.error}>{error}</p>}

            <p>Email: {user?.email}</p>

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
