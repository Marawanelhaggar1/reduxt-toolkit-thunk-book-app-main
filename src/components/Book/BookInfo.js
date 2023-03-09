import React, { Fragment } from "react";

const BookInfo = ({ bookInfo, books }) => {
  const book =
    bookInfo === null ? (
      <div className="alert alert-secondary" role="alert">
        There is no book selected yet. Please select!
      </div>
    ) : (
      <div>
        <p className="fw-bold">Title:{bookInfo.title}</p>
        <p className="fw-light">Description:{bookInfo.description} </p>
        <p className="fst-italic">Price:{bookInfo.price} </p>
        <p className="fst-italic">author:{bookInfo.userName} </p>
      </div>
    );

  return (
    <Fragment>
      <h2>Book Details</h2>
      {book}
    </Fragment>
  );
};

export default BookInfo;
