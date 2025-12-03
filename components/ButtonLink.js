import Link from "next/link";
import styled from "styled-components";
import {ButtonStyle} from "@/components/Button";

// Филтрираме проповете за стилизиране, за да не стигат до DOM (<a> елемента).
const BaseLink = ({primary, white, black, outline, size, block, ...rest}) => {
  return <Link {...rest} />;
};

const StyledLink = styled(BaseLink)`
  ${ButtonStyle}
`;

export default function ButtonLink(props) {
  return <StyledLink {...props} />;
}