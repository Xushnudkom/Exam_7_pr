import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CategoryIcon from '@mui/icons-material/Category';
import EngineeringIcon from '@mui/icons-material/Engineering';
const routes = [
  {
    path: "/",
    content: "Category",
    icon: <CategoryIcon />,
  },
  {
    path: "/products",
    content: "Products",
    icon: <ShoppingBasketIcon/>,
  },
  {
    path: "/workers",
    content: "Workers",
    icon: <EngineeringIcon />,
  },
];

export default routes;
