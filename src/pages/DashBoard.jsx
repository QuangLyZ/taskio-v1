import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import LogoM from "../components/LogoM";
import LargeOrangeButton from "../components/LargeOrangeButton";
import LargeWhiteButton from "../components/LargeWhiteButton";
import Aside from "../components/Aside"
import SearchBar from "../components/SearchBar";
import IconComponent from "../components/IconComponent";
import filterTasks from "../components/filterTasks.jsx";
import CreateNewTask from "../components/CreateNewTask.jsx";
import TaskEdit from "../components/TaskEdit.jsx";



export default function DashBoard() {
    const [tasks, setTasks] = useState([]);
    const [userTags, setUserTags] = useState([]);
    const [editingTag, setEditingTag] = useState(null);
    const [activeCategory, setActiveCategory] = useState("today");
    const [searchTerm, setSearchTerm] = useState ("");
    const [activeTagId, setActiveTagId] = useState("");
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [showTaskEdit, setShowTaskEdit] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    
    
    const toggleTaskStatus = async (taskId) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?.id) return;

            const updatedTasks = tasks.map(task =>
            task.taskId === taskId
                ? {
                    ...task,
                    status: task.status === "done" ? "upcoming" : "done",
                }
                : task
            );

            setTasks(updatedTasks);

            await fetch(
            `https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                ...user,
                tasks: updatedTasks,
                }),
            }
            );
        }   catch (err) {
                console.error("Toggle status failed", err);
            }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")); 
        if (user?.id) {
            fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setTasks(data.tasks || []);
                    setUserTags(data.tags || []);
                })
                .catch(console.error);
        }
    }, []);
    
    // const visibleTasks = filterTasks(tasks, activeCategory).filter(task =>
    // task.taskName.toLowerCase().includes(searchTerm.toLowerCase())

    let visibleTasks = [];

    
    if (searchTerm.trim() !== "") {
    visibleTasks = tasks.filter(task =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    } else {
    
    visibleTasks = filterTasks(tasks, activeCategory);

    if (activeTagId) {
        visibleTasks = visibleTasks.filter(
        task => task.tagId === activeTagId
        );
    }
    }
    console.log("searchTerm:", searchTerm);
    return (
        <div className="dashboard flex-row">
            <Aside
                activeCategory={activeCategory}
                onChangeCategory={setActiveCategory}
                tasks={tasks}
                userTags={userTags}
                activeTagId={activeTagId}
                onSetActiveTagId={setActiveTagId}
                onEditTag={setEditingTag}
                searchTerm={searchTerm}
                onSearchChange={e => setSearchTerm(e.target.value)}
            />
            <section className="dashboard-display flex-row">
                <div
                    className="col-1"
                    style={{
                    width: showCreateTask ? "60%" : "90%", 
                    transition: "width 0.3s ease", // 
                    }}
                >
                    <p className="dashboard-category-title">
                    {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                    </p>
                    <div className="task-list">
                    <div className="new-task" 
                        onClick={() => {
                        setEditingTask(null);  
                        setShowCreateTask(true); 
                        }}
                    >
                        <div className="vector"></div>
                        <div className="single-task flex-row align-vertical-center">
                        <IconComponent name="plus" type="light" size={2.4}/>
                        <p className="task-name txt-secondary regular body">Add new task</p>
                        </div>
                    </div>
                    {visibleTasks.map(task => (
                    <div key={task.taskId} className="single-task">
                        <div className="vector"></div>

                        <div className="task-info flex-row space-between">
                        <div className="left flex-row align-vertical-center">
                            <IconComponent
                            name={task.status === "done" ? "checked" : "unchecked"}
                            type="light"
                            size={2.4}
                            onClick={e => {
                                e.stopPropagation();
                                toggleTaskStatus(task.taskId);
                            }}
                            />

                            <p
                            className="task-name txt-secondary regular body"
                            onClick={() => {
                                setShowCreateTask(false);
                                setEditingTask(task);
                            }}
                            style={{
                                textDecoration: task.status === "done" ? "line-through" : "none",
                                opacity: task.status === "done" ? 0.6 : 1,
                            }}
                            >
                            {task.taskName}
                            </p>
                        </div>

                        <IconComponent
                        name="angle"
                        type="light"
                        size={2.4}
                        onClick={() => setEditingTask(task)}
                        />
                        </div>
                        
                    </div>
                    ))}

                    </div>
                </div>
                {editingTask && (
                    <TaskEdit
                        task={editingTask}
                        userTags={userTags}
                        onClose={() => setEditingTask(null)}
                        onTaskUpdated={updatedTask => {
                        setTasks(prev =>
                            prev.map(t =>
                            t.taskId === updatedTask.taskId ? updatedTask : t
                            )
                        );
                        }}
                        onTaskDeleted={taskId => {
                        setTasks(prev => prev.filter(t => t.taskId !== taskId));
                        }}
                    />
                )}

                {showCreateTask && (
                    <CreateNewTask
                    userTags={userTags}
                    onClose={() => setShowCreateTask(false)}
                    onTaskCreated={newTask => {
                    setTasks(prev => [...prev, newTask]);
                    }}
                    />
                )}
                </section>


        </div>
    )
}