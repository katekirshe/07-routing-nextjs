import { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsProps {
  note: Note;
}

function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}

export default NoteDetails;
