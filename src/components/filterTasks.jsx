// utils/taskUtils.jsx

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

export default function filterTasks(tasks = [], category) {
  const start = startOfToday();
  const end = endOfToday();

  return tasks.filter(task => {
    const due = new Date(task.dueTime);

    switch (category) {
      case "done":
        return task.status === "done";

      case "today":
        return (
          task.status !== "done" &&
          due >= start &&
          due <= end
        );

      case "overdue":
        return (
          task.status !== "done" &&
          due < start
        );

      case "upcoming":
        return (
          task.status !== "done" &&
          due > end
        );

      default:
        return true; 
    }
  });
}