import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";

import {
  Category,
  ProductsToSee,
  Main,
  Products,
  SignIn,
  Workers,
} from "../pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />}>
          <Route index element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductsToSee />} />
          <Route path="/workers" element={<Workers />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default Index;
