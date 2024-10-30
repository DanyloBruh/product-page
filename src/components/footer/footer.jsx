import { Button, Flex, Link, Text } from "@radix-ui/themes";
import logo from "/assets/logo.svg";
import "./footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Flex
      className="footer"
      align={{ initial: "start", sm: "center" }}
      width="100%"
      justify="between"
      height={{ initial: "100%", sm: "96px" }}
      direction={{ initial: "column", sm: "row" }}
      gap={{ initial: "59px", sm: "0" }}
    >
      <img className="footer__logo" src={logo} alt="logo" />
      <div className="footer__links">
        <Link>Github</Link>
        <Link>Contacts</Link>
        <Link>Rights</Link>
      </div>
      <div className="footer__to-top">
        <Text as="label" htmlFor="toTop">
          Back to top
        </Text>
        <Button
          id="toTop"
          name="toTop"
          radius="large"
          color="gray"
          className="product__btn-favorite"
          onClick={scrollToTop}
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.52827 5.47124C0.26792 5.21089 0.26792 4.78878 0.52827 4.52843L4.52827 0.528433C4.78862 0.268083 5.21073 0.268083 5.47108 0.528433L9.47108 4.52843C9.73143 4.78878 9.73143 5.21089 9.47108 5.47124C9.21073 5.73159 8.78862 5.73159 8.52827 5.47124L4.99967 1.94265L1.47108 5.47124C1.21073 5.73159 0.788619 5.73159 0.52827 5.47124Z"
              fill="#F1F2F9"
            />
          </svg>
        </Button>
      </div>
    </Flex>
  );
};

export default Footer;
