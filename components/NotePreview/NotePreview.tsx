"use client";
import css from "./NotePreview.module.css";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const NotePreviewModal = ({ children }: Props) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <div className={css.container}>
      <div className={css.content}>
        {children}
        <button className={css.backBtn} onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default NotePreviewModal;
