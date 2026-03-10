export function getTaskCounts (tasks = []) {

    const startOfToday = new Date ();
    startOfToday.setHours(0,0,0,0);

    const endOfToday = new Date ();
    endOfToday.setHours(23,59,59,999);

    let counts = {
        done: 0,
        today: 0,
        overdue: 0,
        upcoming: 0,
    };

    tasks.forEach(task => {
        const due = new Date(task.dueTime);
        //Count done
        if (task.status === "done")
        {
            counts.done++;
            return;
        }
        //Count overdue
        if (due < startOfToday)
        {
            counts.overdue++;
        }
        //Count today
        else if (due >= startOfToday && due <= endOfToday)
        {
            counts.today++;
        }
        //Count upcoming
        else 
        {
            counts.upcoming++;
        }
    });
    return counts;
}