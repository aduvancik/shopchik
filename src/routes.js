//variable
import { ADD_PRODUCT_ROUTE, CHAT_ROUTE, HOME_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE } from "./utils/consts";
//components
import { Chat } from "./components/Chat/Chat.jsx";
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
    }
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat
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
    // {
    //     path: LOGIN_ROUTE,
    //     Component: Login 
    // },
]