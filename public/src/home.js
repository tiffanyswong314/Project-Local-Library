function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksBorrowed = books.filter((book) => book.borrows
  .filter((record) => record.returned === false)
  .length > 0);
  return booksBorrowed.length;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const fiveCommonGenres = [];
  bookGenres.map((genre) => {
    const location = fiveCommonGenres.findIndex((element) => element.name === genre);
    if (location >= 0) {
      fiveCommonGenres[location].count = fiveCommonGenres[location].count + 1;
    } else {
      fiveCommonGenres.push({ name: genre, count: 1 });
      }
    });
    fiveCommonGenres.sort((a, b) => b.count - a.count);
    if (fiveCommonGenres.length > 5) {
      return fiveCommonGenres.slice(0, 5);
    }
  return fiveCommonGenres;
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  const borrows = books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);  
  return topFive(popularBooks);
}

function topFive(array) {
  let popularBooks = array
  .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
  .slice(0, 5);
  return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  authors.forEach((author) => {
    let theAuthor = {name: `${author.name.first} ${author.name.last}`, count: 0};
    books.forEach((book) => {
    if (book.authorId === author.id) {
      theAuthor.count += book.borrows.length;
    }
   });
   popularAuthors.push(theAuthor);
  });
  return popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count)
  .slice(0, 5);
 }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
