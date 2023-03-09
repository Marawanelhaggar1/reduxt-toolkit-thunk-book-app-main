import React from "react";

const BooksList = ({
  isLoading,
  books,
  isLoggedIn,
  deleteBook,
  dispatch,
  readBook,
}) => {
  const booksList =
    books.length > 0
      ? books.map((book) => (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={book.id}
          >
            <div>{book.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  dispatch(readBook(book))
                    .unwrap()
                    .then((originalPromiseRewsults) => {
                      console.log(originalPromiseRewsults);
                    })
                    .catch((error) => {
                      console.error(error);
                    })
                }
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() =>
                  dispatch(deleteBook(book))
                    .unwrap()
                    .then((originalPromiseRewsults) => {
                      console.log(originalPromiseRewsults);
                    })
                    .catch((error) => {
                      console.error(error);
                    })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "there is no books available";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "isLoading" : <ul className="list-group">{booksList}</ul>}
    </div>
  );
};

export default BooksList;
