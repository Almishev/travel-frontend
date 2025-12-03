import styled from "styled-components";
import Center from "@/components/Center";
import {useState} from "react";

const Section = styled.section`
  padding: 60px 0;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0 0 40px;
  font-weight: normal;
  text-align: center;
`;

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding: 20px 0;
  
  &:first-child {
    border-top: 1px solid #e5e7eb;
  }
`;

const Question = styled.button`
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  
  &:hover {
    color: #0D3D29;
  }
`;

const Answer = styled.div`
  margin-top: 15px;
  color: #666;
  line-height: 1.8;
  padding-right: 30px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const Icon = styled.span`
  font-size: 1.5rem;
  color: #0D3D29;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const faqs = [
  {
    question: "Как мога да резервирам екскурзия?",
    answer: "Можете да се свържете с нас по телефон или да използвате формата за резервация на страницата на конкретната екскурзия. Отговаряме бързо и ще ви помогнем с всичко необходимо!"
  },
  {
    question: "Какво е включено в цената на екскурзията?",
    answer: "Всяка екскурзия има различно включено в цената. Детайлна информация за включените услуги можете да намерите в описанието на конкретната екскурзия или да попитате при резервация."
  },
  {
    question: "Мога ли да отменя резервация?",
    answer: "Да, можете да отмените резервация. Моля, свържете се с нас възможно най-скоро, за да уточним условията за отмяна според вида на екскурзията."
  },
  {
    question: "Откъде тръгват екскурзиите?",
    answer: "Повечето от нашите екскурзии тръгват от град Гоце Делчев и други градове в региона. Точният град на тръгване е посочен в описанието на всяка екскурзия."
  },
  {
    question: "Какво да взема със себе си?",
    answer: "Препоръките зависят от вида на екскурзията. Обикновено препоръчваме удобна обувка, подходящо облекло за времето, документи за самоличност и камера за спомени. При резервация ще получите пълен списък с препоръки."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section>
      <Center>
        <Title>Често задавани въпроси</Title>
        <FAQContainer>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <Question onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <Icon isOpen={openIndex === index}>▼</Icon>
              </Question>
              <Answer isOpen={openIndex === index}>
                {faq.answer}
              </Answer>
            </FAQItem>
          ))}
        </FAQContainer>
      </Center>
    </Section>
  );
}

