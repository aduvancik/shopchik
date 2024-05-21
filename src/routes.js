//variable
import { ADD_PRODUCT_ROUTE, CHAT_ROUTE, HOME_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE } from "./utils/consts";
//components
import ChatPages, { Chat } from "./pages/ChatPages.jsx";
import ProfilePages from "./pages/ProfilePages.jsx";
import AddProductPages from "./pages/AddProductPages";
import ProductPages from "./pages/ProductPages.jsx";
import HomePages from "./pages/HomePages.jsx";

export const publicRoutes = [
    {
        path: PRODUCT_ROUTE,
        Component: ProductPages 
    },
    {
        path: HOME_ROUTE,
        Component: HomePages
    },
    {
        path: PRODUCT_ROUTE,
        Component: ProductPages
    }
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: ChatPages
    },
    {
        path: ADD_PRODUCT_ROUTE,
        Component: AddProductPages
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePages
    },
    {
        path: HOME_ROUTE,
        Component: HomePages
    },
    {
        path: PRODUCT_ROUTE,
        Component: ProductPages
    }
    // {
    //     path: LOGIN_ROUTE,
    //     Component: Login 
    // },
]