import { Container, Flex } from "@radix-ui/themes";
import Header from "../header/header";
import Footer from "../footer/footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container size="4" align="center">
        <Flex direction="column" align="start">
          {children}
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
