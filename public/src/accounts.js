function findAccountById(accounts, idnum) {
  return found = accounts.find((account)=>account.id===idnum)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) => 
  nameA.name.last > nameB.name.last ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  const person = account.id
  let total = 0
  for (book of books) {
    for (user of book.borrows) {
      if (user.id === person) {
        total++
      }
    }
  }
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  //create array
  let booksTaken = [];
  //forEach book push into array
  books.forEach((book) => {
    if (book.borrows.find((item) => item.id === account.id && !item.returned)) {
      booksTaken.push(book);
    }
  });
  //console.log(booksTaken);
  booksTaken.forEach((book) => {
    let anAuthor = authors.find((person) => person.id === book.authorId);
    book["author"] = anAuthor;
  });
  return booksTaken;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
