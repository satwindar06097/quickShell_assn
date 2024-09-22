export const sortTickets = (groupedTickets, sortBy) => {
  const sortedTickets = {};

  Object.keys(groupedTickets).forEach((group) => {
    const tickets = groupedTickets[group];
    if (sortBy === "priority") {
      // Sort by priority (descending)
      sortedTickets[group] = tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "title") {
      // Sort by title (alphabetically)
      sortedTickets[group] = tickets.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
  });

  return sortedTickets;
};
