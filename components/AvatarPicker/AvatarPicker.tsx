"use client";

import { useState } from "react";
import Image from "next/image";

const AvatarPicker = () => {
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

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
  return (
    <div>
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Preview"
          width={300}
          height={200}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      ) : (
        <label>
          📷 Choose photo
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
