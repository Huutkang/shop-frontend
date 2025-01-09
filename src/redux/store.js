import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import loveReducer from "./loveSlice";
import categoryReducer from "./categorySlice";
import suggestReducer from "./suggestSlice";
import specialReducer from "./specialSlice";
import bestSellReducer from "./bestSellSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        love: loveReducer,
        categories: categoryReducer,
        suggest: suggestReducer,
        special: specialReducer,
        bestSell: bestSellReducer,
    },
});

export default store;
