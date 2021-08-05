function getTotalBooksCount(books) {
  //create variable mapping out each book id into a new array
  let totalBooks = books.map((book)=>book.id)
  //returning the length of array to find # of books
  return totalBooks.length
}

function getTotalAccountsCount(accounts) {
  //creating variable to map account id to new array
  let totalAccounts = accounts.map((account)=>account.id)
  //finding length of accounts array
  return totalAccounts.length
}

function getBooksBorrowedCount(books) {
  //reducing the books array
  return books.reduce((acc, book) => {
    //if the book hasnt been returned, increase the accumulator
    if (!book.borrows[0].returned) {
      acc++
    }
    //returning the amount of unreturned books
    return acc
  }, 0)
}

function getMostCommonGenres(books) {
  //Creates array of all book genres
  const bookGenres = books.map((book) => book.genre);
  const book = [];
  bookGenres.map((genre) => {
    const genres = book.findIndex((bookIndex) => bookIndex.name === genre);
    if (genres >= 0) {
      book[genres].count += 1;
    } else {
      book.push({ name: genre, count: 1 });
    }
  });
  book.sort((bookA, bookB) => bookB.count - bookA.count);
  if (book.length > 5) {
    return book.slice(0, 5);
  }
  return book;
}

function getMostPopularBooks(books) {
  return Object.entries(
    //reducing all books into single object of title:borrow length
      books.reduce((acc, book) => {
        acc[book.title] = book.borrows.length
        return acc
      //mapping into array of name, count
      }, {})).map(([name, count]) => ({name,count}))
      //sorting by length first
      .sort((a, b) => b.count - a.count)
      //only showing the top 5
      .slice(0, 5)  
}

//helper function for getMostPopularAuthors
const _getBooksByAuthorIdHelper = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId);
};

function getMostPopularAuthors(books, authors) {
  //create a variable that maps out authors
  const result = authors.map((author) => {
    //create a variable that to be used as a value for the name key
    const fullName = `${author.name.first} ${author.name.last}`;
    //call helper function and pass in books and the author id
    const booksByAuthor = _getBooksByAuthorIdHelper(books, author.id);
    //reduce to a single object 
    const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
    //assign reduced obj values to name and count keys
    const newAuthorInfo = {
      name: fullName,
      count: totalBorrows,
    };
    //return the new object 
    return newAuthorInfo;
  });

  // sort the new array by count
  result.sort((authorA, authorB) => authorB.count - authorA.count);

  // limit array to 5
  result.splice(5);

  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
