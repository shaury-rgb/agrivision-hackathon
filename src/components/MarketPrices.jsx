import { useEffect, useState } from 'react';
import { fetchMarketPrices } from '../api/client';
import { marketPrices } from '../data/mockData';

function getDiff(market, msp) {
  const diff = market - msp;
  const direction = diff >= 0 ? 'above' : 'below';
  return { value: Math.abs(diff), direction };
}

export default function MarketPrices() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(marketPrices);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchMarketPrices(query.trim());
        if (isMounted) {
          setItems(Array.isArray(data) ? data : marketPrices);
        }
      } catch {
        const fallback = marketPrices.filter((item) =>
          item.crop.toLowerCase().includes(query.trim().toLowerCase())
        );
        if (isMounted) {
          setItems(fallback);
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>Market Intelligence</h1>
        <p>Track MSP gaps, crop trends, and pick the best selling window.</p>
      </div>

      <div className="feature-card">
        <label className="field search-field">
          <span>Search crop</span>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type crop name"
          />
        </label>
      </div>

      <div className="market-grid">
        {items.map((item) => {
          const diff = getDiff(item.market, item.msp);

          return (
            <article key={item.crop} className="market-card">
              <header>
                <h3>{item.crop}</h3>
                <span className={`trend ${item.trend}`}>{item.change}</span>
              </header>

              <div className="price-row">
                <div>
                  <p className="price-label">Market</p>
                  <p className="price-value">{item.market} {item.unit}</p>
                </div>
                <div>
                  <p className="price-label">MSP</p>
                  <p className="price-value">{item.msp} {item.unit}</p>
                </div>
              </div>

              <p className="delta-line">
                {diff.value} {item.unit} {diff.direction} MSP
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
