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
  border: 4px solid #0D3D29;
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
  background: linear-gradient(135deg, #0D3D29 0%, #065f46 100%);
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
  color: #0D3D29;
  text-decoration: none;
  margin-bottom: 20px;
  font-weight: 500;
  
  &:hover {
    color: #065f46;
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
    bio: "С над 15 години опит в туристическия бизнес, Феим Атипов е един от основателите на нашата агенция. Специализиран в организиране на групови екскурзии и почивки, той има дълбоко разбиране на нуждите на клиентите и се стреми да създава незабравими преживявания. Неговият ентусиазъм към пътуванията и внимание към детайла правят всяка екскурзия уникална и запомняща се.",
    initial: "ФА"
  },
  {
    name: "Феим Мусанков",
    phone: "0896270105",
    bio: "Феим Мусанков привнася богат опит в сферата на туризма и гостоприемството. Като съосновател на агенцията, той отговаря за развитието на нови дестинации и партньорства. Неговият професионализъм и способност да намира най-добрите оферти гарантират, че нашите клиенти получават отлично съотношение цена-качество. Страстта му към откриването на нови места вдъхновява всички около него.",
    initial: "ФМ"
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
              <PlaceholderPhoto>
                {founder.initial}
              </PlaceholderPhoto>
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

