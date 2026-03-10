import { useFormik } from "formik";
import * as yup from "yup";
import IconComponent from "./IconComponent";
import SmallWhiteButton from "./SmallWhiteButton";
import SmallOrangeButton from "./SmallOrangeButton";
import TagInTaskForm from "./TagInTaskForm.jsx";


const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
});


export default function CreateNewTask({
  userTags = [],
  onClose,
  onTaskCreated,
}) {
  const formik = useFormik({
  initialValues: {
    title: "",
    tagId: "",
    day: "",
    month: "",
    year: "",
    note: "",
  },

  validationSchema,

  onSubmit: async (values, { setSubmitting, resetForm }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("LOCAL USER:", user);

    try {
      if (!user?.id) throw new Error("User not logged in");

      let dueTime = null;
      if (values.day && values.month && values.year) {
        const day = String(values.day).padStart(2, "0");
        const month = String(values.month).padStart(2, "0");
        const year = String(values.year);

        dueTime = `${year}-${month}-${day}T17:00:00`;
      }

      const newTask = {
        taskId: `tsk_${Date.now()}`,
        taskName: values.title,
        tagId: values.tagId || null,
        dueTime,
        status: "upcoming",
        subTask: [],
      };

      const res = await fetch(
        `https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${String(user.id)}`
      );
      const userData = await res.json();

      const updatedTasks = [...(userData.tasks || []), newTask];

      const patchRes = await fetch(
        `https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${String(user.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tasks: updatedTasks }),
        }
      );

      if (!patchRes.ok) {
        const msg = await patchRes.text();
        throw new Error(msg);
      }

      onTaskCreated?.(newTask);
      resetForm();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Create task failed");
    } finally {
      setSubmitting(false);
    }
  }
});

  const defaultTags = [
  { tagId: "t01", tagName: "Work", tagColor: "#FF7F17" },
  { tagId: "t02", tagName: "Personal", tagColor: "#17D4FF" },
];

// const allTags = [...defaultTags, ...userTags];
const allTags = [
  ...defaultTags,
  ...userTags.filter(
    ut => !defaultTags.some(dt => dt.tagId === ut.tagId)
  )
];

  return (
    <form className="new-task-form" onSubmit={formik.handleSubmit}>
      {/* Title */}
      <div className="task-title-group">
        <IconComponent name="angle" type="dark" size={3.6} className="rotate-180 cursor-pointer" onClick={onClose}/>

        <div className="task-title-edit">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="task-title-edit-input"
            style={{
               backgroundColor: "#FBFBFB",
               filter: "none", 
               width: "100%",
               fontFamily: "Helvetica",
               fontSize: "3.2rem",
               fontWeight: "700",
               color: "#777",
            }}
          />
          <div className="task-title-underline"></div>
           {formik.touched.title && formik.errors.title && (
          <p className="signing-error">{formik.errors.title}</p>
        )}
        </div>

       
      </div>

      {/*  Details  */}
      <div className="task-details-group">
        <p className="task-form-labels">Details</p>

         {/* Tag  */}
        <div className="tag-group flex-row">
          <div className="task-left-col flex-row align-vertical-center">
            <IconComponent name="tag" type="light" size={2.4} />
            <p className="txt-secondary body-sm">Tag</p>
          </div>

          <div className="task-right-col">
            <select
              name="tagId"
              value={formik.values.tagId}
              onChange={formik.handleChange}
            >
              <option value="">Choose tag</option>
              {allTags.map(tag => (
                <option key={tag.tagId} value={tag.tagId}>
                  {tag.tagName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/*  Due time  */}
        <div className="duetime flex-row">
          <div className="task-left-col flex-row align-vertical-center">
            <IconComponent name="xcalendar" type="light" size={2.4} />
            <p className="txt-secondary body-sm">Duetime</p>
          </div>

          <div className="task-right-col flex-row" style={{ gap: "0.4rem" }}>
            <input
              type="number"
              name="day"
              placeholder="DD"
              value={formik.values.day}
              onChange={formik.handleChange}
              style={{
                width: "8rem",
                height: "4rem"
              }}
            />
            <input
              type="number"
              name="month"
              placeholder="MM"
              value={formik.values.month}
              onChange={formik.handleChange}
              style={{
                width: "8rem",
                height: "4rem"
              }}
            />
            <input
              type="number"
              name="year"
              placeholder="YYYY"
              value={formik.values.year}
              onChange={formik.handleChange}
            style={{
                width: "10rem",
                height: "4rem"
              }}
            />
          </div>
        </div>
      </div>

      {/*  Note  */}
        <div className="note-edit">
          <p className="task-form-labels">Note</p>
          <textarea
            name="note"
            placeholder="Text"
            value={formik.values.note}
            onChange={formik.handleChange}
            rows={4}
            className="task-note-textarea"
            style={{
                width: "auto",
                height: "12rem",
                backgroundColor:"#FFF",
                padding: '0.8rem 1.6rem',
                borderRadius: '0.8rem',
                filter: 'drop-shadow(1px 1px 4px rgba(119, 119, 119, 0.25))',
                border:'none',
                color: "#777777",
                fontSize: "2rem",
                fontFamily: "Helvetica",
            }}
            />
        </div>

      {/*  Actions  */}
      <div className="task-form-btn flex-row space-between">
        <SmallWhiteButton
          label="Cancel"
          type="button"
          width="24rem"
          onClick={onClose}
        />
      <SmallOrangeButton
        label="Save"
        type="submit"
        width="24rem"
        enabled={formik.isSubmitting}
      />
      </div>
    </form>
  );
}