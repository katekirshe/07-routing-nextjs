import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, CreateNote } from "@/lib/api";

const Schema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Title is required"),

  content: Yup.string().max(500, "Maximum 500 characters"),

  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

interface NoteFormProps {
  onClose: () => void;
}

function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const titleFieldId = useId();
  const contentFieldId = useId();
  const tagFieldId = useId();

  const { mutate: createMutate, isSuccess } = useMutation({
    mutationFn: async (newNote: CreateNote) => {
      return await createNote(newNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Notes"],
      });
      onClose();
    },
  });

  const handleSubmitForm = (values: CreateNote) => {
    createMutate(values);
  };

  const initialValues: CreateNote = {
    title: "",
    content: "",
    tag: "Todo",
  };

  return (
    <Formik<CreateNote>
      initialValues={initialValues}
      onSubmit={(values: CreateNote) => {
        handleSubmitForm(values);
      }}
      validationSchema={Schema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${titleFieldId}-title`}>Title</label>
          <Field
            id={`${titleFieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${contentFieldId}-content`}>Content</label>
          <Field
            id={`${contentFieldId}-content`}
            as="textarea"
            type="text"
            name="content"
            className={css.textarea}
            rows={8}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${tagFieldId}-tag`}>Tag</label>
          <Field
            as="select"
            name="tag"
            id={`${tagFieldId}-tag`}
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;
