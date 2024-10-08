export const groupTickets = (tickets, groupBy, users) => {
  const groupedTickets = {};

  switch (groupBy) {
    case "status":
      ["Backlog", "Todo", "In progress", "Done", "Cancelled"].map((status) => {
        groupedTickets[status] = tickets.filter(
          (ticket) => ticket.status === status
        );
      });
      break;

    case "priority":
      [4, 3, 2, 1, 0].map((priority) => {
        groupedTickets[priority] = tickets.filter(
          (ticket) => ticket.priority === priority
        );
      });
      break;

    case "user":
      users.map((user) => {
        groupedTickets[user.name] = tickets.filter(
          (ticket) => ticket.userId === user.id
        );
      });
      break;

    default:
      break;
  }

  return groupedTickets;
};
