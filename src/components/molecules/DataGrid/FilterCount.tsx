import { Tag, TagRightIcon } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

type Props = {
  currentLength: number;
  maxLength: number;
};

export default function FilterCount({ currentLength, maxLength }: Props) {
  return (
    <Tag size="lg">
      {`${currentLength}/${maxLength}件`}
      <TagRightIcon as={Search2Icon} />
    </Tag>
  );
}
