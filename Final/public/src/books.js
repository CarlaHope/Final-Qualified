function findAuthorById(authors, id) {
  return authors.find(author => author.id === id) || null;
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const loanedOut = books.filter((book) => {
    const [mostRecent] = book.borrows;
    return !mostRecent.returned;
  });
  const returned = books.filter((book) => {
    const [mostRecent] = book.borrows;
    return mostRecent.returned;
  });
  return [loanedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;

  const borrowers = borrows.map(borrow => {
    const account = accounts.find(acc => acc.id === borrow.id);
    return {
      ...borrow,
      ...account,
    };
  });

  const limitedBorrowers = borrowers.slice(0, 10);

  return limitedBorrowers;
}

function getTotalBorrows(book) {
  return book.borrows.length;
}

const books = [...];
const sortedByPopularity = books.sort((a, b) => getTotalBorrows(b) - getTotalBorrows(a));

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
