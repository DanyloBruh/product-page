import {
  Button,
  Flex,
  Grid,
  Heading,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

import "./productPage.css";
import { useEffect, useState } from "react";
import OptionSelector from "../../components/option-selector/optionSelector";
import Description from "../../components/description/description";
import Fancybox from "../../components/fancybox/fancybox";

const ProductPage = () => {
  const [productImageSeleced, setProductImageSeleced] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState();

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  const favoriteHandler = () => {
    setIsFavorite((prev) => !prev);
  };

  const imageClickHandler = (index) => {
    setProductImageSeleced(index);
  };

  const colorSelectHandler = (e) => {
    setProduct((prev) => ({ ...prev, color: e }));
  };

  const memorySelectHandler = (e) => {
    setProduct((prev) => ({ ...prev, memory: e.toUpperCase() }));
  };

  const storageSelectHandler = (e) => {
    setProduct((prev) => ({ ...prev, storage: e.toUpperCase() }));
  };

  useEffect(() => {
    fetch("product.json")
      .then((res) => res.json())
      .then((res) => setProduct(res))
      .catch((err) => console.error(err));
  }, []);

  const handleTouchStart = (e) => {
    console.log(e);
    const touchDown = e.touches[0].clientX;

    setTouchStartX(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchStartX;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;

    setTouchEndX(currentTouch);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const difference = touchStartX - touchEndX;

      if (difference > 50) {
        setProductImageSeleced(
          (prev) => (prev + 1) % (product.images[product.color].length || 1)
        );
      }

      if (difference < -50) {
        setProductImageSeleced(
          (prev) =>
            (prev - 1 + (product.images[product.color].length || 1)) %
            (product.images[product.color].length || 1)
        );
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <>
      <Breadcrumbs />
      <Button variant="ghost" className="btn__breadcrumbs">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
          ``
        </svg>
        Back
      </Button>
      {product && (
        <div className="product">
          <Heading as="h2" mt="16px" mb="16px" align="left">
            {product.name + " " + titleCase(product.color.replace("_", " "))}
          </Heading>
          <Flex
            direction={{ initial: "column", sm: "row" }}
            align="center"
            gap={{ initial: "32px", md: "64px" }}
          >
            <div className="product__image">
              <div className="product__images-list">
                {product.images[product.color].map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    className={`${
                      index === productImageSeleced ? "active" : ""
                    } product__list-image`}
                    onClick={imageClickHandler.bind(this, index)}
                  />
                ))}
              </div>
              <div className="product__selected">
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: true,
                    },
                    Images: {
                      zoom: false,
                    },
                    Toolbar: false,
                    closeButton: "inside",
                    Image: {
                      zoom: false,
                    },
                    Fullscreen: {
                      autoStart: false,
                    },
                  }}
                >
                  {product.images[product.color].map((image, index) => (
                    <a data-fancybox="gallery" href={image} key={image}>
                      <img
                        key={image}
                        src={image}
                        className={`${
                          index === productImageSeleced
                            ? "product__selected-image"
                            : "product__noselected-image"
                        }`}
                        onClick={imageClickHandler.bind(this, index)}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                      />
                    </a>
                  ))}
                </Fancybox>
              </div>
            </div>
            <Flex
              direction="column"
              align="start"
              flexGrow="1"
              minWidth={{ initial: "100%", md: "320px", sm: "230px" }}
            >
              <OptionSelector
                value={product.color}
                onChange={colorSelectHandler}
                title="Colors"
                type="color"
                data={product.colorsAvailable}
              />
              <Separator my="3" size="4" mb="24px" mt="24px" />
              <OptionSelector
                title="Memory"
                data={product.memoryAvailable}
                value={product.memory}
                onChange={memorySelectHandler}
              />
              <Separator my="3" size="4" mb="24px" mt="24px" />
              <OptionSelector
                title="Storage"
                data={product.storageAvailable}
                value={product.storage}
                onChange={storageSelectHandler}
              />
              <Separator my="3" size="4" mb="24px" mt="24px" />
              <Flex gap="8px" align="center" mt="40px">
                {product.priceDiscount ? (
                  <>
                    <Text as="span" size="7" weight="bold">
                      $
                      {product &&
                        Object.keys(product?.itemsPrice)?.reduce(
                          (accumulator, currentValue) => {
                            const price =
                              product.itemsPrice[currentValue]?.[
                                product[currentValue]
                              ];
                            if (price !== undefined) {
                              accumulator += price;
                            }
                            return accumulator;
                          },
                          0
                        ) + product.priceDiscount}
                    </Text>
                    <Text
                      as="span"
                      size="5"
                      color="gray"
                      className="product__last-price"
                    >
                      $
                      {product &&
                        Object.keys(product?.itemsPrice)?.reduce(
                          (accumulator, currentValue) => {
                            const price =
                              product.itemsPrice[currentValue]?.[
                                product[currentValue]
                              ];
                            if (price !== undefined) {
                              accumulator += price;
                            }
                            return accumulator;
                          },
                          0
                        ) + product.priceRegular}
                    </Text>
                  </>
                ) : (
                  <Text as="span" size="7" weight="bold">
                    $
                    {product &&
                      Object.keys(product?.itemsPrice)?.reduce(
                        (accumulator, currentValue) => {
                          const price =
                            product.itemsPrice[currentValue]?.[
                              product[currentValue]
                            ];
                          if (price !== undefined) {
                            accumulator += price;
                          }
                          return accumulator;
                        },
                        0
                      ) + product.priceRegular}
                  </Text>
                )}
              </Flex>
              <Flex width="100%" gap="8px" mt="30px" mb="32px">
                <Button radius="large" className="product__btn-add-to-cart">
                  Add to cart
                </Button>
                <Button
                  radius="large"
                  color="gray"
                  className="product__btn-favorite"
                  onClick={favoriteHandler}
                >
                  {isFavorite ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.2996 1.29877C10.7259 1.29877 10.158 1.41178 9.62803 1.63136C9.09816 1.85091 8.61662 2.17281 8.21113 2.57846L7.99956 2.79003L7.78787 2.57834C6.9688 1.75927 5.8579 1.29912 4.69956 1.29912C3.54122 1.29912 2.43032 1.75927 1.61125 2.57834C0.79218 3.39741 0.332031 4.50831 0.332031 5.66665C0.332031 6.82499 0.79218 7.93589 1.61125 8.75496L7.50458 14.6483C7.77795 14.9217 8.22117 14.9217 8.49453 14.6483L14.3879 8.75496C14.7935 8.34947 15.1153 7.86805 15.3349 7.33817C15.5544 6.80825 15.6674 6.24026 15.6674 5.66665C15.6674 5.09304 15.5544 4.52505 15.3349 3.99513C15.1153 3.46531 14.7936 2.98392 14.388 2.57846C13.9825 2.17276 13.501 1.85093 12.9711 1.63136C12.4412 1.41178 11.8732 1.29877 11.2996 1.29877Z"
                        fill="#EB5757"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.62803 0.631371C10.158 0.411797 10.7259 0.298782 11.2996 0.298782C11.8732 0.298782 12.4412 0.411797 12.9711 0.631371C13.501 0.850945 13.9825 1.17277 14.388 1.57847C14.7936 1.98394 15.1153 2.46532 15.3349 2.99514C15.5544 3.52506 15.6674 4.09305 15.6674 4.66667C15.6674 5.24028 15.5544 5.80827 15.3349 6.33819C15.1153 6.86806 14.7935 7.34949 14.3879 7.75497C14.3878 7.75501 14.3879 7.75493 14.3879 7.75497L8.49453 13.6483C8.22117 13.9217 7.77795 13.9217 7.50458 13.6483L1.61125 7.75497C0.79218 6.9359 0.332031 5.82501 0.332031 4.66667C0.332031 3.50833 0.79218 2.39743 1.61125 1.57836C2.43032 0.759288 3.54122 0.299139 4.69956 0.299139C5.8579 0.299139 6.9688 0.759288 7.78787 1.57836L7.99956 1.79005L8.21113 1.57847C8.2111 1.57851 8.21117 1.57844 8.21113 1.57847C8.61662 1.17283 9.09816 0.850924 9.62803 0.631371ZM13.3978 2.56819C13.1223 2.29256 12.7952 2.07392 12.4352 1.92474C12.0751 1.77556 11.6893 1.69878 11.2996 1.69878C10.9099 1.69878 10.524 1.77556 10.1639 1.92474C9.80392 2.07392 9.47681 2.29256 9.20132 2.56819L8.49453 3.27497C8.22117 3.54834 7.77795 3.54834 7.50458 3.27497L6.79792 2.56831C6.2414 2.01179 5.4866 1.69914 4.69956 1.69914C3.91252 1.69914 3.15772 2.01179 2.6012 2.56831C2.04468 3.12483 1.73203 3.87963 1.73203 4.66667C1.73203 5.4537 2.04468 6.20851 2.6012 6.76502L7.99956 12.1634L13.3979 6.76502C13.6735 6.48953 13.8923 6.16231 14.0415 5.80228C14.1907 5.44226 14.2674 5.05637 14.2674 4.66667C14.2674 4.27696 14.1907 3.89107 14.0415 3.53105C13.8923 3.17103 13.6734 2.84369 13.3978 2.56819Z"
                        fill="#F1F2F9"
                      />
                    </svg>
                  )}
                </Button>
              </Flex>
              <Description
                size="1"
                data={{
                  screen: product.display_size,
                  resolution: product.display_resolution,
                  processor: product.chip,
                  weight: product.weight,
                }}
              />
            </Flex>
          </Flex>
          <Grid
            gap={{ initial: "32px", md: "64px" }}
            columns={{ initial: "1", sm: "2" }}
            mt="80px"
          >
            <Flex direction="column" gap="12px" align="start">
              <Heading as="h2">About</Heading>
              <Separator my="3" size="4" mb="24px" mt="16px" />
              {product.description.map((item) => (
                <Text key={item.title} as="p" align="left" size="2">
                  <Strong>{item.title}</Strong> <br /> {item.text}
                </Text>
              ))}
            </Flex>
            <Flex direction="column" gap="12px" align="start">
              <Heading as="h2">Tech specs</Heading>
              <Separator my="3" size="4" mb="24px" mt="16px" />
              <Description
                size="2"
                data={{
                  model: product.model,
                  chip: product.chip,
                  cpu_cores: product.cpu_cores,
                  gpu_cores: product.gpu_cores,
                  memory: product.memory,
                  display_size: product.display_size,
                  display_type: product.display_type,
                  display_color_gamut: product.display_color_gamut,
                  display_brightness: product.display_brightness,
                  display_resolution: product.display_resolution,
                  storage: product.storage,
                  color: titleCase(product.color.replace("_", " ")),
                  battery_life: product.battery_life,
                  operating_system: product.operating_system,
                  weight: product.weight,
                }}
              />
            </Flex>
          </Grid>
        </div>
      )}
    </>
  );
};

export default ProductPage;
