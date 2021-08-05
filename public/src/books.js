function findAuthorById(authors, id) {
  return found = authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return found = books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let available = [];
  let unavailable = [];
  const partition = [];
  books.forEach((book) => {
    const isBookReturned = book.borrows[0].returned;
  if (isBookReturned) {
    unavailable.push(book);
  } else {
    available.push(book);
  }
  });
  partition.push(available);
  partition.push(unavailable);
  return partition;
  }

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;  
  borrowArray.forEach(borrow=>{
    let account = accounts.find(acc => acc.id === borrow.id);
    let obj = account;
    obj['returned'] =  borrow.returned;
    result.push(obj);
  })
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
