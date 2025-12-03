import styled from "styled-components";
import Center from "@/components/Center";
import ButtonLink from "@/components/ButtonLink";
import FoundersSection from "@/components/FoundersSection";

const Section = styled.section`
  padding: 60px 0;
  background-color: #f8f9fa;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0 0 20px;
  font-weight: normal;
  text-align: center;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.8;
  color: #555;
  font-size: 1.05rem;
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export default function AboutSection() {
  return (
    <Section>
      <Center>
        <Title>За нас</Title>
        <Content>
          <p>
            Ние сме туристическа агенция, базирана в община Гоце Делчев, която предлага разнообразни екскурзии
            и пътувания за всички възрасти. Нашата цел е да направим пътуването достъпно и приятно за всички наши клиенти – 
            от кратки уикенд бягства до по-дълги почивки и обиколки.
          </p>
          <p style={{marginTop: '20px'}}>
            Организираме еднодневни и уикенд екскурзии, почивки в страната и чужбина, City break пътувания 
            и специални тематични програми. Свържете се с нас и изберете следващата си екскурзия!
          </p>
        </Content>
        <FoundersSection />
        <ButtonWrapper>
          <ButtonLink href="/about" primary size="l">
            Научете повече за нас
          </ButtonLink>
        </ButtonWrapper>
      </Center>
    </Section>
  );
}

