import Link from "next/link";
import css from "./SidebarNotes.module.css";
export type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

const tags: Tag[] = ["Meeting", "Personal", "Shopping", "Todo", "Work"];
function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes{" "}
        </Link>
      </li>
      {tags.map((tag) => {
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default SidebarNotes;
