export const sortTickets = (groupedTickets, sortBy) => {
  const sortedTickets = {};

  Object.keys(groupedTickets).forEach((group) => {
    const tickets = groupedTickets[group];
    if (sortBy === "priority") {
      sortedTickets[group] = tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "title") {
      sortedTickets[group] = tickets.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
  });

  return sortedTickets;
};
