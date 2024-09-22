import React from "react";
import "./TicketCard.css";

const TicketCard = ({ ticket, users, grouping }) => {
  const { id, title, userId, status, tag, priority } = ticket;
  console.log(grouping);
  const user = users.find((user) => user.id === userId);

  return (
    <div className="ticket-card">
      <div className="ticketHeading">
        <span>{id}</span>
        {!(grouping === "user") && (
          <>
            <img src="user.jpg"></img>
            <span
              className={`availability-indicator ${
                user?.available ? "available" : "unavailable"
              }`}
            ></span>
          </>
        )}
      </div>
      <div className="ticketTitle">
        {!(grouping === "status") && (
          <img
            src={`/icons_FEtask/${
              status === "Todo"
                ? "To-do.svg"
                : status == "In progress"
                ? "in-progress.svg"
                : "Backlog.svg"
            }`}
          ></img>
        )}
        {title}
      </div>
      <div className="ticketInfo">
        {!(grouping === "priority") && (
          <img
            src={`icons_FEtask/${
              {
                0: "No-priority.svg",
                1: "Img - Low Priority.svg",
                2: "Img - Medium Priority.svg",
                3: "Img - High Priority.svg",
                4: "SVG - Urgent Priority grey.svg",
              }[priority] || "default-image.svg"
            }`}
            alt="priority-icon"
          />
        )}
        <span>
          {tag.map((t) => (
            <>
              <img src="/icons_FEtask/To-do.svg"></img>
              <span key={t} className="tag">
                {t}
              </span>
            </>
          ))}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
