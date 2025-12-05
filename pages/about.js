import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FoundersSection from "@/components/FoundersSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 1.05rem;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 40px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #111;
  
  &:first-of-type {
    margin-top: 30px;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  text-align: justify;
`;

const Motto = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: #b8860b;
  font-weight: 500;
  text-align: center;
  margin: 15px 0 30px;
`;

const ServicesList = styled.ul`
  padding-left: 20px;
  margin-bottom: 30px;
  
  li {
    margin-bottom: 10px;
  }
`;

const DestinationsHighlight = styled.div`
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  margin: 30px 0;
  border-left: 4px solid #b8860b;
`;

const ContactInfo = styled.div`
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #e5e7eb;
  
  p {
    margin-bottom: 10px;
  }
  
  strong {
    color: #111;
  }
`;

const ClosingText = styled.p`
  margin-top: 30px;
  font-style: italic;
  color: #666;
  text-align: center;
`;

const AnimatedSection = styled.div`
  ${props => props.style}
`;

export default function AboutPage() {
  const introAnimation = useScrollAnimation({ animation: 'fadeIn', delay: 0 });
  const mottoAnimation = useScrollAnimation({ animation: 'fadeIn', delay: 200 });
  const teamAnimation = useScrollAnimation({ animation: 'slideUp', delay: 400 });
  const missionAnimation = useScrollAnimation({ animation: 'slideUp', delay: 600 });
  const destinationsAnimation = useScrollAnimation({ animation: 'slideUp', delay: 800 });
  const servicesAnimation = useScrollAnimation({ animation: 'slideUp', delay: 1000 });
  const foundersAnimation = useScrollAnimation({ animation: 'fadeIn', delay: 1200 });
  const contactAnimation = useScrollAnimation({ animation: 'fadeIn', delay: 1400 });

  return (
    <>
      <SEO 
        title="За нас | Туристическа агенция"
        description="Туристическа агенция, организираща екскурзии и пътувания за всяка възраст и вкус."
        keywords="туристическа агенция, екскурзии, почивки, пътувания"
        url="/about"
        image="/logo.png"
      />
      <Header />
      <Center>
        <Title>За нас</Title>
        <ContentWrapper>
          <AnimatedSection ref={introAnimation.ref} style={introAnimation.style}>
            <SectionTitle>Friendly Travel</SectionTitle>
            <Paragraph>
              Ние сме туристическа агенция, базирана в община Гърмен, която предлага разнообразни екскурзии
              и пътувания за всички възрасти.
            </Paragraph>
          </AnimatedSection>

          <AnimatedSection ref={mottoAnimation.ref} style={mottoAnimation.style}>
            <Motto>&quot;Making connections&quot;</Motto>
          </AnimatedSection>

          <AnimatedSection ref={teamAnimation.ref} style={teamAnimation.style}>
            <SectionTitle>Нашият екип</SectionTitle>
            <Paragraph>
              Friendly Travel е създадена от двама опитни преподаватели, които обединяват своя професионален опит в образованието с страстта си към пътуванията. Нашата визия е да предоставим на младите хора и групи възможност за обогатяващи изживявания, които допълват формалното обучение с практически знания и незабравими спомени.
            </Paragraph>
            <Paragraph>
              Благодарение на дългогодишния си опит в образователната система, нашият екип разпознава специфичните изисквания на училищата, учениците и техните семейства. Това ни позволява да създаваме персонализирани програми, които отговарят на образователните цели, като едновременно осигуряват високо качество на услугите. Работим с проверени партньори за транспорт и настаняване, а нашите екскурзоводи са сертифицирани специалисти в своите области.
            </Paragraph>
          </AnimatedSection>

          <AnimatedSection ref={missionAnimation.ref} style={missionAnimation.style}>
            <SectionTitle>Нашата мисия</SectionTitle>
            <Paragraph>
              Нашата цел е да бъдем вашият надежден партньор в организирането на образователни и развлекателни пътувания. Разширяваме портфолиото си с различни видове екскурзии – от образователни програми в природата до културни обиколки, спортни събития и индивидуално планирани групови пътешествия. Всяка наша услуга е внимателно обмислена и изпълнена с прецизност, за да гарантираме, че всеки момент от вашето пътуване ще бъде ценен и значим.
            </Paragraph>
          </AnimatedSection>

          <AnimatedSection ref={destinationsAnimation.ref} style={destinationsAnimation.style}>
            <DestinationsHighlight>
              <SectionTitle>Нашите дестинации</SectionTitle>
              <Paragraph>
                Специализирани сме в организиране на <strong>кратки екскурзии</strong> в три основни дестинации: 
                <strong> Гърция</strong>, <strong>Турция</strong> и <strong>България</strong>. Тези направления предлагат богато културно наследство, 
                красива природа и разнообразни възможности за изживявания, които са идеални за кратки пътувания и уикенд екскурзии.
              </Paragraph>
            </DestinationsHighlight>
          </AnimatedSection>

          <AnimatedSection ref={servicesAnimation.ref} style={servicesAnimation.style}>
            <SectionTitle>Какво предлагаме</SectionTitle>
            <ServicesList>
              <li>Еднодневни и уикенд екскурзии</li>
              <li>Кратки екскурзии в Гърция, Турция и България</li>
              <li>Почивки в страната и чужбина</li>
              <li>City break пътувания</li>
              <li>Ученически екскурзии и зелени училища</li>
              <li>Културно-исторически турове</li>
              <li>Организиране на спортни турнири</li>
              <li>Персонализирани групови пътувания</li>
              <li>Специални тематични програми</li>
              <li>Онлайн каталог с актуални предложения</li>
            </ServicesList>
          </AnimatedSection>


          <AnimatedSection ref={contactAnimation.ref} style={contactAnimation.style}>
            <ContactInfo>
              <SectionTitle>Контакти</SectionTitle>
              <Paragraph>
                <strong>Адрес:</strong> град Гоце Делчев, община Гоце Делчев, България
              </Paragraph>
              <Paragraph>
                <strong>Телефон:</strong> +359 896 178 447
              </Paragraph>
              <Paragraph>
                <strong>Email:</strong> officefriendlytravel@gmail.com
              </Paragraph>
            </ContactInfo>
            
            <ClosingText>
              Свържете се с нас и изберете следващата си екскурзия! Пътуването започва тук.
            </ClosingText>
          </AnimatedSection>
        </ContentWrapper>
      </Center>
      <Footer />
    </>
  );
}


