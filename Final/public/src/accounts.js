function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}


function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last;
    const lastNameB = accountB.name.last;
    return lastNameA.localeCompare(lastNameB);
  });
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  for (let book of books) {
    for (let borrow of book.borrows) {
      if (borrow.id === account.id) {
        count++;
      }
    }
  }
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];

  books.forEach((book) => {
    const borrowHistory = book.borrows;
    const latestTransaction = borrowHistory[0];
    if (latestTransaction.id === account.id && !latestTransaction.returned) {
      const author = findAuthorById(authors, book.authorId);
      borrowedBooks.push({ ...book, author });
    }
  });

  return borrowedBooks;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
