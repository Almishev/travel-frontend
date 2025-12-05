import styled from "styled-components";
import Center from "@/components/Center";
import ButtonLink from "@/components/ButtonLink";
import FoundersSection from "@/components/FoundersSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

const AnimatedTitle = styled(Title)`
  ${props => props.style}
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

const AnimatedContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.8;
  color: #555;
  font-size: 1.05rem;
  margin-bottom: 30px;
  ${props => props.style}
`;

const AnimatedParagraph = styled.p`
  ${props => props.style}
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export default function AboutSection() {
  const titleAnimation = useScrollAnimation({ animation: 'fadeIn', delay: 0 });
  const firstParagraphAnimation = useScrollAnimation({ animation: 'slideUp', delay: 200 });
  const secondParagraphAnimation = useScrollAnimation({ animation: 'slideUp', delay: 400 });

  return (
    <Section>
      <Center>
        <AnimatedTitle ref={titleAnimation.ref} style={titleAnimation.style}>
          За нас
        </AnimatedTitle>
        <Content>
          <AnimatedParagraph ref={firstParagraphAnimation.ref} style={firstParagraphAnimation.style}>
          Ние сме екип от двама учители с дългогодишен педагогически опит и силна мотивация да създаваме незабравими пътувания за ученици и групи. Основахме нашата фирма, водени от желанието да предложим безопасни, образователни и вдъхновяващи екскурзии, които съчетават учебния процес с приключение и нови преживявания.
          Разбираме нуждите на учениците, училищата и родителите, защото познаваме училищната среда отвътре. Затова изготвяме внимателно подбрани маршрути, осигуряваме надежден транспорт, комфортно настаняване и професионални екскурзоводи. Нашата мисия е всяко пътуване да бъде не само приятно, но и полезно, сигурно и запомнящо се.
          </AnimatedParagraph>
          <AnimatedParagraph 
            ref={secondParagraphAnimation.ref} 
            style={{...secondParagraphAnimation.style, marginTop: '20px'}}
          >
            Предлагаме ученически екскурзии, зелени училища, културно-исторически турове, организиране на спортни турнири, както и персонализирани групови пътувания в България и чужбина. С грижа за всеки детайл – от първата среща до последния момент от екскурзията – се стремим да създаваме емоции, които остават за цял живот.
          </AnimatedParagraph>
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

