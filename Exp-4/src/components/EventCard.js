import React, { useRef } from "react";
function EventCard({ event, onUpdate }) {

    const renderCount = useRef(0);

renderCount.current += 1;

console.log(
    `${event.title} rendered ${renderCount.current} times`
);

    const handleDragStart = (e) => {

        e.dataTransfer.setData(
            "eventId",
            event.id
        );

    };

    const handleEdit = () => {

        const newTitle = prompt(
            "Edit Post Title",
            event.title
        );

        if (newTitle === null || newTitle.trim() === "") {
            return;
        }

        const newTime = prompt(
            "Edit Post Time",
            event.time
        );

        if (newTime === null || newTime.trim() === "") {
            return;
        }

        onUpdate(
            event.id,
            newTitle,
            newTime
        );

    };

    return (

        <div
            className="event-card"
            draggable={true}
            onDragStart={handleDragStart}
        >

            <small>{event.time}</small>

            <h4>{event.title}</h4>

            <small className="render-count">
    Renders: {renderCount.current}
</small>

            <button
                className="edit-button"
                onClick={handleEdit}
            >
                ✏️ Edit
            </button>

        </div>

    );

}

export default React.memo(EventCard);