import { useState, useEffect, lazy, Suspense } from "react";
const Calendar = lazy(() => import("./components/Calendar"));

function App() {

  const [showClock, setShowClock] = useState(false);

const [clock, setClock] = useState(
    new Date().toLocaleTimeString()
);

useEffect(() => {

    if (!showClock) {
        return;
    }

    const interval = setInterval(() => {

        setClock(
            new Date().toLocaleTimeString()
        );

    }, 1000);

    return () => clearInterval(interval);

}, [showClock]);

    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Design Review",
            date: "Monday",
            time: "10:00"
        },
        {
            id: 2,
            title: "Team Meeting",
            date: "Tuesday",
            time: "11:00"
        },
        {
            id: 3,
            title: "Write Proposal",
            date: "Wednesday",
            time: "13:00"
        },
        {
            id: 4,
            title: "Client Demo",
            date: "Thursday",
            time: "15:00"
        },
        {
            id: 5,
            title: "Portfolio Review",
            date: "Thursday",
            time: "18:00"
        },
        {
            id: 6,
            title: "Grocery Run",
            date: "Saturday",
            time: "10:00"
        },
        {
            id: 7,
            title: "Sprint Planning",
            date: "Sunday",
            time: "11:00"
        }
    ]);

    const [title, setTitle] = useState("");

    const [date, setDate] = useState("Monday");

    const [time, setTime] = useState("10:00");


    const addEvent = () => {

        if (title.trim() === "") {

            alert("Please enter a post title");

            return;

        }

        const newEvent = {

            id: Date.now(),

            title: title,

            date: date,

            time: time

        };

        setEvents((previousEvents) => [

            ...previousEvents,

            newEvent

        ]);

        setTitle("");

    };


    return (

        <div className="app">

            <header className="header">

                <h1>📅 Social Post Scheduler</h1>

                <p>
                    Schedule, manage and reschedule your posts
                </p>

            </header>

            <div className="performance-panel">

    <div>

        <h2>⚡ Performance Lab</h2>

        <p>
            Baseline render monitoring
        </p>

    </div>

    <div className="performance-controls">

        <button
            onClick={() =>
                setShowClock(!showClock)
            }
        >
            {showClock
                ? "Disable Live Clock"
                : "Enable Live Clock"}
        </button>

        <div className="clock">

            {showClock
                ? `Live Clock: ${clock}`
                : "Live Clock: OFF"}

        </div>

    </div>

</div>


            <div className="scheduler-card">

                <h2>Schedule New Post</h2>

                <div className="form-row">

                    <input
                        type="text"
                        placeholder="Post title..."
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <select
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                    >

                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>

                    </select>

                    <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                            setTime(e.target.value)
                        }
                    />

                    <button
                        onClick={addEvent}
                    >
                        + Schedule Post
                    </button>

                </div>

            </div>


            <div className="calendar-card">

                <div className="calendar-header">

                    <div>

                        <h2>Weekly Schedule</h2>

                        <p>
                            Drag posts between days to reschedule
                        </p>

                    </div>

                    <div className="event-count">

                        {events.length} Posts

                    </div>

                </div>


          <Suspense fallback={<div className="loading">Loading Calendar...</div>}>
    <Calendar
        events={events}
        setEvents={setEvents}
    />
</Suspense>

            </div>

        </div>

    );

}

export default App;