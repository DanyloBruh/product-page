import { RadioCards, Text } from "@radix-ui/themes";
import "./optionSelector.css";

const OptionSelector = ({ title, data, onChange, value, type }) => {
  return (
    <>
      <Text as="span" color="gray" size="1" align="left" mb="8px">
        {title}
      </Text>
      <RadioCards.Root
        onValueChange={onChange}
        value={value.toLowerCase().replace(" ", "_")}
        columns={data.length.toString()}
        gap="8px"
      >
        {data.map((item) => (
          <RadioCards.Item
            value={
              type === "color"
                ? Object.keys(item)[0]
                : item.toLowerCase().replace(" ", "_")
            }
            key={type === "color" ? Object.keys(item) : item}
            className={type === "color" ? "select__color" : ""}
          >
            {type === "color" ? (
              <div
                className="select__color-item"
                style={{ backgroundColor: Object.values(item) }}
              />
            ) : (
              <Text as="span" size="1">
                {item}
              </Text>
            )}
          </RadioCards.Item>
        ))}
      </RadioCards.Root>
    </>
  );
};

export default OptionSelector;
