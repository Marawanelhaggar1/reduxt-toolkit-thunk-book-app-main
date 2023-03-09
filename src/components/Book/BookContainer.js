import React, { Fragment, useEffect } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook, readBook } from "../../store/bookSlice";

import "./book.css";

const PostContainer = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { isLoading, books, bookInfo } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  console.log(bookInfo);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            dispatch={dispatch}
            deleteBook={deleteBook}
            readBook={readBook}
          />
        </div>
        <div className="col side-line">
          <BookInfo bookInfo={bookInfo} books={books} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
