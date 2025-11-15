"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import css from "./AvatarPicker.module.css";

type AvatarPickerProps = {
  profilePhotoUrl?: string;
};

const AvatarPicker = ({ profilePhotoUrl }: AvatarPickerProps) => {
  const [error, setError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (profilePhotoUrl) {
      setTimeout(() => {
        setPreviewUrl(profilePhotoUrl);
      });
    }
  }, [profilePhotoUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (file) {
      // Перевіряємо тип файлу
      if (!file.type.startsWith("image/")) {
        setError("Only images");
        return;
      }

      // Перевіряємо розмір файлу (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl("");
  };
  return (
    <div className={css.picker}>
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          width={300}
          height={200}
          className={css.avatar}
          style={{ objectFit: "cover" }}
        />
      )}
      <label
        className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}
      >
        📷 Choose photo
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={css.input}
        />
      </label>

      {previewUrl && (
        <button className={css.remove} onClick={handleRemove}>
          ❌
        </button>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
