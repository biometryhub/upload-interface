import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { uploadEpics } from "./feature/upload/epic";
import { uploadReducer } from "./feature/upload/slice";

const rootEpic = combineEpics(uploadEpics);
const rootReducer = combineReducers({
  upload: uploadReducer,
});

const epicMiddleware = createEpicMiddleware({});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["upload/acceptFile"],
      },
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
