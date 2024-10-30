import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import "./description.css";

const Description = ({ data, size }) => {
  const key = Object.keys(data).map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).replace("_", " ")
  );
  const objData = Object.values(data);

  return (
    <ul className="description__list">
      {key.map((item, index) => (
        <li key={item} className="description__item">
          <Text as="span" size={size}>
            {item}
          </Text>
          <Text as="span" size={size}>
            {objData[index]}
          </Text>
        </li>
      ))}
    </ul>
  );
};

export default Description;
