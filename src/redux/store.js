

import { configureStore} from "@reduxjs/toolkit";
import trendSlice from "./trendSlice";

export default configureStore({ reducer: trendSlice })