import styled from "styled-components";
import Image from "next/image";

const FoundersContainer = styled.div`
  margin-top: 50px;
  padding-top: 50px;
  border-top: 2px solid #e5e7eb;
  width: 100%;
`;

const FoundersTitle = styled.h3`
  font-size: 1.8rem;
  margin: 0 0 40px;
  font-weight: 600;
  text-align: center;
  color: #111;
`;

const FoundersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
  
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 1200px;
    gap: 40px;
  }
`;

const FounderCard = styled.div`
  text-align: center;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
`;

const PhotoWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #b8860b;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FounderPhoto = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderPhoto = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #b8860b 0%, #9a7209 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
`;

const FounderName = styled.h4`
  font-size: 1.4rem;
  margin: 0 0 10px;
  color: #111;
  font-weight: 600;
`;

const FounderPhone = styled.a`
  display: block;
  font-size: 1.1rem;
  color: #b8860b;
  text-decoration: none;
  margin-bottom: 20px;
  font-weight: 500;
  
  &:hover {
    color: #9a7209;
    text-decoration: underline;
  }
`;

const FounderBio = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
  text-align: left;
  margin: 0;
`;

const founders = [
  {
    name: "Феим Атипов",
    phone: "0896178447",
    bio: "Феим Атипов – учител с дългогодишен стаж, който отлично познава интересите и очакванията на децата при пътувания. Работата ми в образованието ми помага да създавам екскурзии, които са едновременно забавни, сигурни и с висока образователна стойност. Като част от хотелиерската сфера развивам усет към качеството на обслужването и комфорта, необходими за едно добре организирано пътуване.Като съуправител на фирма за туроператорска дейност комбинирам тези умения, за да предлагам програми в България и международни дестинации, които разширяват мирогледа на децата и оставят трайни положителни впечатления.",
    initial: "ФА",
    image: "https://travel-agency-toni.s3.eu-central-1.amazonaws.com/5.png"
  },
  {
    name: "Феим Мусанков",
    phone: "0896270105",
    bio: "Феим Мусанков е педагог с професионална квалификация и утвърден опит в образователната среда. Паралелно с учителската дейност развива и дългогодишна ангажираност в областта на спорта и различни организационни инициативи, което допринася за изграждането на висока дисциплина, отговорност и умения за работа с групи. Комбинацията от педагогическа подготовка и практическа организационна експертиза го превръща в надежден ръководител и партньор в туристическата дейност. Като част от тази фирма, Феим Мусанков поставя акцент върху сигурността, качеството на услугите и професионалния подход към всеки клиент.",
    initial: "ФМ",
    image: "https://travel-agency-toni.s3.eu-central-1.amazonaws.com/IMG_5828.jpg"
  },
  {
    name: "Фикрие Люманкова",
    phone: "0895568055",
    bio: "Фикрие Люманкова е координатор с международен опит и силен фокус върху работата с хора, клиенти и деца. Завършила е Бизнес мениджмънт във Великобритания, а в момента продължава образованието си в областта на педагогиката, което ѝ дава както теоретична подготовка, така и практическа основа за работа с деца. В продължение на 10 години работи в сферата на хотелиерството и ресторантьорството във Великобритания, където натрупва богат опит в обслужването на клиенти, организацията на дейности и работата в динамична среда. Като част от професионалния си път участва в сътрудничество с туристически агенции и в организиране на малки пътувания, съобразени с нуждите и очакванията на клиентите.",
    initial: "ФЛ",
    image: "https://travel-agency-toni.s3.eu-central-1.amazonaws.com/friendlytravel-excursuins.png"
  }

];

export default function FoundersSection() {
  return (
    <FoundersContainer>
      <FoundersTitle>Нашите основатели</FoundersTitle>
      <FoundersGrid>
        {founders.map((founder, index) => (
          <FounderCard key={index}>
            <PhotoWrapper>
              {founder.image ? (
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={200}
                  height={200}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  unoptimized
                />
              ) : (
                <PlaceholderPhoto>
                  {founder.initial}
                </PlaceholderPhoto>
              )}
            </PhotoWrapper>
            <FounderName>{founder.name}</FounderName>
            <FounderPhone href={`tel:+359${founder.phone.substring(1)}`}>
              {founder.phone}
            </FounderPhone>
            <FounderBio>{founder.bio}</FounderBio>
          </FounderCard>
        ))}
      </FoundersGrid>
    </FoundersContainer>
  );
}

