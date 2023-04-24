import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/Home";
import { SearchPage } from "../pages/Search";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="search/:q" element={<SearchPage />} />
    </Route>
  )
);

export function Routes() {
  return <RouterProvider router={router} />;
}
