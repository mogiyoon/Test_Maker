import { configureStore } from "@reduxjs/toolkit";
import { realmSlice } from "./RealmSlice";
import { contentChangedSlice, contentSlice, usingOCRSlice } from "./ContentsSlice";
import { treeChangedSlice } from "./TestTreeSlice";

export const store = configureStore({
  reducer: {
    realm: realmSlice.reducer,
    content: contentSlice.reducer,
    contentChanged: contentChangedSlice.reducer,
    usingOCR: usingOCRSlice.reducer,
    treeChanged: treeChangedSlice.reducer,
  },
})