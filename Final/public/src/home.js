function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for (let book of books) {
    const borrowArr = book.borrows;
    const isBorrowed = borrowArr.some(borrow => !borrow.returned);
    if (isBorrowed) {
      count++;
    }
  }
  return count;
}

function getMostCommonGenres(books) {
  const genreCounts = {};

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    const genre = book.genre;

    if (genre in genreCounts) {
      genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  }

  const genreCountsArray = [];
  for (let genre in genreCounts) {
    genreCountsArray.push({ name: genre, count: genreCounts[genre] });
  }

  genreCountsArray.sort((a, b) => b.count - a.count);

  return genreCountsArray.slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookCount = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  bookCount.sort((bookA, bookB) => bookB.count - bookA.count);
  return bookCount.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorMap = authors.reduce((acc, author) => {
    acc[author.id] = author;
    return acc;
  }, {});

  const bookBorrowCount = books.reduce((acc, book) => {
    if (!acc[book.authorId]) {
      acc[book.authorId] = 0;
    }
    acc[book.authorId] += book.borrows.length;
    return acc;
  }, {});

  const sortedAuthors = Object.keys(bookBorrowCount).map((authorId) => ({
    name: `${authorMap[authorId].name.first} ${authorMap[authorId].name.last}`,
    count: bookBorrowCount[authorId],
  })).sort((authorA, authorB) => authorB.count - authorA.count);


  return sortedAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
