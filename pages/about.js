import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FoundersSection from "@/components/FoundersSection";

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="За нас | Туристическа агенция"
        description="Туристическа агенция, организираща екскурзии и пътувания за всяка възраст и вкус."
        keywords="туристическа агенция, екскурзии, почивки, пътувания"
        url="/about"
      />
      <Header />
      <Center>
        <Title>За нас</Title>
        <div style={{maxWidth: '1000px', lineHeight: '1.8', fontSize: '1.05rem', color: '#333'}}>
          <h2 style={{fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px'}}>Туристическа агенция</h2>
          <p>
            Ние сме туристическа агенция, базирана в община Гоце Делчев, която предлага разнообразни екскурзии
            и пътувания за всички възрасти.
          </p>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px'}}>Нашата мисия</h2>
          <p>
            Нашата цел е да направим пътуването достъпно и приятно за всички наши клиенти – 
            от кратки уикенд бягства до по-дълги почивки и обиколки.
          </p>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px'}}>Какво предлагаме</h2>
          <ul style={{paddingLeft: '20px'}}>
            <li>Еднодневни и уикенд екскурзии</li>
            <li>Почивки в страната и чужбина</li>
            <li>City break пътувания</li>
            <li>Специални тематични програми</li>
            <li>Онлайн каталог с актуални предложения</li>
          </ul>
          
          <FoundersSection />
          
          <h2 style={{fontSize: '1.5rem', marginTop: '50px', marginBottom: '15px'}}>Контакти</h2>
          <p>
            <strong>Адрес:</strong> град Гоце Делчев, община Гоце Делчев, България<br/>
            <strong>Телефон:</strong> +359 877 382 224<br/>
            <strong>Email:</strong> info@library-mosomishche.bg
          </p>
          
          <p style={{marginTop: '30px', fontStyle: 'italic', color: '#666'}}>
            Свържете се с нас и изберете следващата си екскурзия! Пътуването започва тук.
          </p>
        </div>
      </Center>
      <Footer />
    </>
  );
}


