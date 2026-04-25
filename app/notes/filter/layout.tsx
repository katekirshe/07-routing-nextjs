import css from "./LayoutNotes.module.css";
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = (props: Props) => {
  const { children, sidebar } = props;

  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesLayout;
