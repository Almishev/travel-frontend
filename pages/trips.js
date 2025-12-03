import Header from "@/components/Header";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import SEO from "@/components/SEO";

const PAGE_SIZE = 20;

import {useRouter} from "next/router";
import {useState} from "react";

export default function TripsPage({
  trips, 
  page, 
  totalPages, 
  totalCount, 
  search: initialSearch,
  filters: initialFilters,
  filterOptions
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [destinationCountry, setDestinationCountry] = useState(initialFilters?.destinationCountry || '');
  const [destinationCity, setDestinationCity] = useState(initialFilters?.destinationCity || '');
  const [travelType, setTravelType] = useState(initialFilters?.travelType || '');
  const [dateFrom, setDateFrom] = useState(initialFilters?.dateFrom || '');
  const [dateTo, setDateTo] = useState(initialFilters?.dateTo || '');

  function handleSearch(e) {
    e.preventDefault();
    applyFilters();
  }

  function applyFilters() {
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    if (destinationCountry) {
      params.set('destinationCountry', destinationCountry);
    }
    if (destinationCity) {
      params.set('destinationCity', destinationCity);
    }
    if (travelType) {
      params.set('travelType', travelType);
    }
    if (dateFrom) {
      params.set('dateFrom', dateFrom);
    }
    if (dateTo) {
      params.set('dateTo', dateTo);
    }
    params.set('page', '1'); // Reset to page 1 on new filters
    router.push('/trips?' + params.toString());
  }


  function clearFilters() {
    setSearchTerm('');
    setDestinationCountry('');
    setDestinationCity('');
    setTravelType('');
    setDateFrom('');
    setDateTo('');
    router.push('/trips');
  }

  // Build base path for pagination (preserves all filters)
  function buildBasePath() {
    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    if (destinationCountry) {
      params.set('destinationCountry', destinationCountry);
    }
    if (destinationCity) {
      params.set('destinationCity', destinationCity);
    }
    if (travelType) {
      params.set('travelType', travelType);
    }
    if (dateFrom) {
      params.set('dateFrom', dateFrom);
    }
    if (dateTo) {
      params.set('dateTo', dateTo);
    }
    const queryString = params.toString();
    return queryString ? `/trips?${queryString}` : '/trips';
  }

  const basePath = buildBasePath();
  const hasActiveFilters = searchTerm || destinationCountry || destinationCity || travelType || dateFrom || dateTo;

  // Формираме текст за показване в полето за търсене от активните филтри
  function getSearchPlaceholder() {
    const filterParts = [];
    if (destinationCountry) filterParts.push(destinationCountry);
    if (destinationCity) filterParts.push(destinationCity);
    if (travelType) {
      const typeNames = {
        'excursion': 'Екскурзия',
        'vacation': 'Почивка',
        'city-break': 'City Break',
        'other': 'Друго'
      };
      filterParts.push(typeNames[travelType] || travelType);
    }
    if (dateFrom || dateTo) {
      const fromDate = dateFrom ? new Date(dateFrom).toLocaleDateString('bg-BG') : '';
      const toDate = dateTo ? new Date(dateTo).toLocaleDateString('bg-BG') : '';
      if (fromDate && toDate) {
        filterParts.push(`${fromDate} - ${toDate}`);
      } else if (fromDate) {
        filterParts.push(`от ${fromDate}`);
      } else if (toDate) {
        filterParts.push(`до ${toDate}`);
      }
    }
    return filterParts.length > 0 ? filterParts.join(', ') : 'Търси по име, държава, град или описание...';
  }

  // SEO текстовете
  const filterParts = [];
  if (destinationCountry) filterParts.push(`в ${destinationCountry}`);
  if (destinationCity) filterParts.push(`в ${destinationCity}`);
  if (travelType) {
    const typeNames = {
      'excursion': 'екскурзии',
      'vacation': 'почивки',
      'city-break': 'city break',
      'other': 'други'
    };
    filterParts.push(typeNames[travelType] || travelType);
  }

  const seoTitle = initialSearch 
    ? `Търсене: "${initialSearch}"${filterParts.length > 0 ? ` - ${filterParts.join(', ')}` : ''}`
    : filterParts.length > 0 
      ? `Екскурзии - ${filterParts.join(', ')}`
      : 'Всички екскурзии';
  
  const seoDescription = initialSearch
    ? `Търсене на екскурзии по "${initialSearch}"${filterParts.length > 0 ? `, ${filterParts.join(', ')}` : ''}. Намерени ${totalCount}.`
    : filterParts.length > 0
      ? `Екскурзии ${filterParts.join(', ')}. Намерени ${totalCount}.`
      : `Всички екскурзии. Общо ${totalCount}.`;

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        url={basePath}
        image="/logo.png"
      />
      <Header />
      <Center>
        <Title>Всички екскурзии</Title>
        <p style={{color:'#6b7280', marginTop: '-8px'}}>
          {searchTerm
            ? `Намерени ${totalCount} ${totalCount === 1 ? 'екскурзия' : 'екскурзии'}`
            : `Общо екскурзии: ${totalCount}`}
        </p>
        
        <div style={{marginBottom: '20px'}}>
          <form onSubmit={handleSearch} style={{marginBottom: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
            <input
              type="text"
              placeholder={!hasActiveFilters || searchTerm ? 'Търси по име, държава, град или описание...' : getSearchPlaceholder()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{flex: '1 1 300px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', minWidth: '200px'}}
            />
            <button type="submit" style={{padding: '10px 20px', background: '#b8860b', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease'}} onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.color = '#000'; }}>
              Търси
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                style={{padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
              >
                Изчисти всички
              </button>
            )}
          </form>

          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center'}}>
            <select
              value={destinationCountry}
              onChange={(e) => {
                setDestinationCountry(e.target.value);
                // Автоматично прилагане на филтъра
                const params = new URLSearchParams();
                if (searchTerm.trim()) {
                  params.set('search', searchTerm.trim());
                }
                params.set('destinationCountry', e.target.value);
                if (destinationCity) {
                  params.set('destinationCity', destinationCity);
                }
                if (travelType) {
                  params.set('travelType', travelType);
                }
                if (dateFrom) {
                  params.set('dateFrom', dateFrom);
                }
                if (dateTo) {
                  params.set('dateTo', dateTo);
                }
                params.set('page', '1');
                router.push('/trips?' + params.toString());
              }}
              style={{padding: '6px 8px', border: '1px solid #ddd', borderRadius: '5px', width: '110px', fontSize: '13px'}}
            >
              <option value="">Всички държави</option>
              {filterOptions?.countries?.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <select
              value={destinationCity}
              onChange={(e) => {
                setDestinationCity(e.target.value);
                // Автоматично прилагане на филтъра
                const params = new URLSearchParams();
                if (searchTerm.trim()) {
                  params.set('search', searchTerm.trim());
                }
                if (destinationCountry) {
                  params.set('destinationCountry', destinationCountry);
                }
                params.set('destinationCity', e.target.value);
                if (travelType) {
                  params.set('travelType', travelType);
                }
                params.set('page', '1');
                router.push('/trips?' + params.toString());
              }}
              style={{padding: '6px 8px', border: '1px solid #ddd', borderRadius: '5px', width: '110px', fontSize: '13px'}}
            >
              <option value="">Всички градове</option>
              {filterOptions?.destinationCities?.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={travelType}
              onChange={(e) => {
                setTravelType(e.target.value);
                // Автоматично прилагане на филтъра
                const params = new URLSearchParams();
                if (searchTerm.trim()) {
                  params.set('search', searchTerm.trim());
                }
                if (destinationCountry) {
                  params.set('destinationCountry', destinationCountry);
                }
                if (destinationCity) {
                  params.set('destinationCity', destinationCity);
                }
                params.set('travelType', e.target.value);
                if (dateFrom) {
                  params.set('dateFrom', dateFrom);
                }
                if (dateTo) {
                  params.set('dateTo', dateTo);
                }
                params.set('page', '1');
                router.push('/trips?' + params.toString());
              }}
              style={{padding: '6px 8px', border: '1px solid #ddd', borderRadius: '5px', width: '110px', fontSize: '13px'}}
            >
              <option value="">Всички типове</option>
              <option value="excursion">Екскурзия</option>
              <option value="vacation">Почивка</option>
              <option value="city-break">City Break</option>
              <option value="other">Друго</option>
            </select>

            <label style={{display: 'flex', alignItems: 'center', gap: '3px', fontSize: '13px'}}>
              <span style={{whiteSpace: 'nowrap'}}>От:</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setTimeout(applyFilters, 0);
                }}
                style={{padding: '6px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '13px', width: '130px'}}
              />
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '3px', fontSize: '13px'}}>
              <span style={{whiteSpace: 'nowrap'}}>До:</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setTimeout(applyFilters, 0);
                }}
                min={dateFrom || undefined}
                style={{padding: '6px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '13px', width: '130px'}}
              />
            </label>
          </div>
        </div>

        {trips.length === 0 ? (
          <div>Няма намерени екскурзии.</div>
        ) : (
          <>
            <ProductsGrid products={trips} />
            <Pagination 
              page={page} 
              totalPages={totalPages} 
              basePath={basePath}
            />
          </>
        )}
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps({query}) {
  try {
    await mongooseConnect();
    const pageParam = parseInt(query.page, 10);
    const page = Math.max(1, isNaN(pageParam) ? 1 : pageParam);
    const search = query.search?.trim() || '';
    const destinationCountry = query.destinationCountry?.trim() || '';
    const destinationCity = query.destinationCity?.trim() || '';
    const travelType = query.travelType?.trim() || '';
    const dateFrom = query.dateFrom?.trim() || '';
    const dateTo = query.dateTo?.trim() || '';

    // Създаваме query за филтриране на екскурзии
    let mongoQuery = {
      status: { $ne: 'archived' }, // Не показваме архивирани
    };

    // Търсене
    if (search) {
      const regex = new RegExp(search, 'i');
      mongoQuery.$or = [
        { title: regex },
        { destinationCountry: regex },
        { destinationCity: regex },
        { departureCity: regex },
        { description: regex },
      ];
    }

    // Филтър по държава
    if (destinationCountry) {
      mongoQuery.destinationCountry = destinationCountry;
    }

    // Филтър по град за посещение
    if (destinationCity) {
      mongoQuery.destinationCity = destinationCity;
    }

    // Филтър по тип пътуване
    if (travelType) {
      mongoQuery.travelType = travelType;
    }

    // Филтър по диапазон от дати
    if (dateFrom || dateTo) {
      mongoQuery.$and = mongoQuery.$and || [];
      
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        // Екскурзии, които започват на или след началната дата
        mongoQuery.$and.push({
          startDate: { $gte: fromDate }
        });
      }
      
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        // Екскурзии, които завършват на или преди крайната дата
        mongoQuery.$and.push({
          endDate: { $lte: toDate }
        });
      }
    }

    // Вземаме уникални стойности за филтрите
    const [countries, destinationCities] = await Promise.all([
      Product.distinct('destinationCountry', { 
        destinationCountry: { $exists: true, $ne: '' },
        status: { $ne: 'archived' }
      }),
      Product.distinct('destinationCity', { 
        destinationCity: { $exists: true, $ne: '' },
        status: { $ne: 'archived' }
      }),
    ]);

    const totalCount = await Product.countDocuments(mongoQuery);
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const skip = (currentPage - 1) * PAGE_SIZE;

    const trips = await Product.find(mongoQuery, null, {
      sort: {'_id': -1},
      skip,
      limit: PAGE_SIZE,
    }).lean();

    return {
      props:{
        trips: JSON.parse(JSON.stringify(trips)),
        page: currentPage,
        totalPages,
        totalCount,
        search,
        filters: {
          destinationCountry,
          destinationCity,
          travelType,
          dateFrom,
          dateTo,
        },
        filterOptions: {
          countries: countries.sort(),
          destinationCities: destinationCities.sort(),
        },
      }
    };
  } catch (error) {
    console.error('Error fetching trips:', error.message);
    return {
      props:{
        trips: [],
        page: 1,
        totalPages: 1,
        totalCount: 0,
        search: '',
        filters: {},
        filterOptions: {
          countries: [],
          departureCities: [],
        },
      }
    };
  }
}