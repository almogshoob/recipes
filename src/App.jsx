import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { recipes } from "./assets/data";
import { Layout, MainPage, NoPage, RecipePage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/recipes/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ":recipeId",
        element: <RecipePage />,
        errorElement: <NoPage />,
        loader: ({ params }) => {
          if (!recipes[params.recipeId]) throw new Error("Recipe Not Found");
          else return params.recipeId;
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
