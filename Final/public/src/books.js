function findAuthorById(authors, id) {
  return authors.find(author => author.id === id) || null;
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  const loanedOut = [];
  const returned = [];
  books.forEach((book) => {
    const [mostRecent] = book.borrows;
    if (!mostRecent.returned) {
      loanedOut.push(book);
    } else {
      returned.push(book);
    }
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


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};