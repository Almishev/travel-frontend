import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import ButtonLink from "@/components/ButtonLink";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <Title>Акцентни екскурзии</Title>
      <ProductsGrid products={products} />
      <ButtonWrapper>
        <ButtonLink href="/trips" primary size="l">
          Виж всички екскурзии
        </ButtonLink>
      </ButtonWrapper>
    </Center>
  );
}