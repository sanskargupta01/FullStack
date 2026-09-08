import { useCallback } from "react";
import EventCard from "./EventCard";

function Calendar({ events, setEvents }) {

    const dates = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const handleDragOver = (e) => {

        e.preventDefault();

    };



    const handleDrop = (e, newDate) => {

        e.preventDefault();

        const eventId = Number(
            e.dataTransfer.getData("eventId")
        );

        setEvents((previousEvents) => {

            return previousEvents.map((event) => {

                if (event.id === eventId) {

                    return {
                        ...event,
                        date: newDate
                    };

                }

                return event;

            });

        });

    };
const handleUpdate = useCallback(
    (id, newTitle, newTime) => {

        setEvents((previousEvents) => {

            return previousEvents.map((event) => {

                if (event.id === id) {

                    return {
                        ...event,
                        title: newTitle,
                        time: newTime
                    };

                }

                return event;

            });

        });

    },
    [setEvents]
);

    return (

        <div className="calendar">

            {dates.map((date) => (

                <div
                    key={date}
                    className="day-column"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, date)}
                >

                    <h3>{date}</h3>

                    {events
                        .filter(
                            (event) =>
                                event.date === date
                        )
                        .map((event) => (

                        <EventCard
    key={event.id}
    event={event}
    onUpdate={handleUpdate}
/>

                        ))
                    }

                </div>

            ))}

        </div>

    );

}

export default Calendar;