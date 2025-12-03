import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import SEO from "@/components/SEO";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import PopularDestinations from "@/components/PopularDestinations";
import {Settings} from "@/models/Settings";

export default function HomePage({featuredProduct,newProducts,popularDestinations, heroSettings}) {
  return (
    <>
      <SEO 
        title="Туристическа агенция - Екскурзии и пътувания"
        description="Организираме разнообразни пътувания и екскурзии за всяка възраст и вкус."
        keywords="екскурзии, пътувания, почивки, туристическа агенция"
        url="/"
      />
      <div>
        <Header />
        <HeroVideo heroSettings={heroSettings} />
        {featuredProduct && <Featured product={featuredProduct} />}
        <NewProducts products={newProducts} />
        <PopularDestinations destinations={popularDestinations} />
        <AboutSection />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    await mongooseConnect();
    // Взимаме всички настройки
    const allSettings = await Settings.find();
    const settingsMap = {};
    allSettings.forEach((setting) => {
      settingsMap[setting.name] = setting.value;
    });

    const featuredProductId = settingsMap.featuredProductId;
    
    let featuredProduct = null;
    if (featuredProductId) {
      featuredProduct = await Product.findById(featuredProductId);
    }
    
    // Първо опитваме да взимаме акцентираните екскурзии (isFeatured: true)
    let newProducts = await Product.find({isFeatured: true}, null, {sort: {'_id':-1}, limit:12});
    
    // Ако няма акцентирани екскурзии, показваме 12-те с най-скорошна дата на заминаване
    if (!newProducts || newProducts.length === 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Започваме от началото на днес
      
      newProducts = await Product.find({
        startDate: { $gte: today } // Само екскурзии с дата >= днес
      }, null, {
        sort: { startDate: 1 }, // Сортиране по дата възходящо (най-скорошна първа)
        limit: 12
      });
      
      // Ако все още няма с бъдещи дати, взимаме последните 12 добавени
      if (!newProducts || newProducts.length === 0) {
        newProducts = await Product.find({}, null, {
          sort: { '_id': -1 },
          limit: 12
        });
      }
    }
    
    // Взимаме популярни дестинации (топ 6 по брой екскурзии)
    const popularDestinationsAgg = await Product.aggregate([
      {
        $addFields: {
          destinationName: {
            $trim: {
              input: {
                $concat: [
                  {$ifNull: ["$destinationCountry", ""]},
                  " ",
                  {$ifNull: ["$destinationCity", ""]},
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          destinationName: {$ne: ""},
        },
      },
      {
        $group: {
          _id: "$destinationName",
          count: {$sum: 1},
          sample: {
            $first: {
              title: "$title",
              image: {$arrayElemAt: ["$images", 0]},
            },
          },
        },
      },
      {$sort: {count: -1}}, // Сортиране по брой екскурзии (най-популярните първи)
      {$limit: 6},
    ]);

    const popularDestinations = popularDestinationsAgg.map(item => ({
      name: item._id ? item._id.replace(/\s+/g, ' ').trim() : item._id,
      count: item.count,
      sample: item.sample || null,
    }));
    
    return {
      props: {
        featuredProduct: featuredProduct ? JSON.parse(JSON.stringify(featuredProduct)) : null,
        newProducts: JSON.parse(JSON.stringify(newProducts)),
        popularDestinations: JSON.parse(JSON.stringify(popularDestinations)),
        heroSettings: {
          heroVideoDesktop: settingsMap.heroVideoDesktop || '',
          heroVideoMobile: settingsMap.heroVideoMobile || '',
          heroTitle: settingsMap.heroTitle || 'Туристическа агенция - Екскурзии и пътувания',
          heroSubtitle: settingsMap.heroSubtitle || 'Организираме разнообразни пътувания и екскурзии за всяка възраст и вкус.',
        },
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        featuredProduct: null,
        newProducts: [],
        popularDestinations: [],
        heroSettings: null,
      },
    };
  }
}