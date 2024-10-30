import { Box, Heading, RadioCards, Text } from "@radix-ui/themes";
import "./App.css";
import Layout from "./components/layout/layout";
import ProductPage from "./pages/product-page/productPage";

function App() {
  return (
    <Layout>
      <ProductPage />
    </Layout>
  );
}

export default App;
