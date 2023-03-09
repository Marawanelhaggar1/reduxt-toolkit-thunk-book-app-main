import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginsert } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3005/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${book.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBook2 = createAsyncThunk(
  "book/insertBook2",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    try {
      bookData.userName = getState().auth.userName;
      const res = await fetch("http://localhost:3005/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      dispatch(loginsert({ name: "insertbook", statues: "success" }));
      return data;
    } catch (error) {
      dispatch(loginsert({ name: "insertbook", statues: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);

export const readBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${book.id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null, bookInfo: null },
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
      console.log(action);
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;

      console.log(action);
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action);
    },

    [insertBook2.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook2.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook2.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((book) => {
        return book.id !== action.payload.id;
      });
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [readBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [readBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookInfo = action.payload;
    },
    [readBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
