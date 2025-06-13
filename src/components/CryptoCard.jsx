import React, {useEffect, useState} from "react";
import axios from "axios";

function CryptoCard({ coin, currency }) 
{ 
    const currencySymbols = {
        idr: 'Rp',   // Indonesian Rupiah
        usd: '$',    // US Dollar
        eur: '€',    // Euro
        gbp: '£',    // British Pound
        jpy: '¥',    // Japanese Yen
        inr: '₹',    // Indian Rupee
        aud: '$',    // Australian Dollar
        cad: '$',   // Canadian Dollar
        try: '₺',    // Turkish Lira
        krw: '₩'    // Korean Won
};
// Price Change Percentage
    return (
        <div data-aos="fade-up">
        <div className="bg-gray-900 rounded-lg shadow-md p-4 flex justify-between items-center text-white mb-4">
            <div className="flex-items-center spaces-x-4">
                <img src={coin.image} alt={coin.name} className="w-10 h-10"/>
                <div>
                    <h2 className="font-bold text-lg">{coin.name}</h2>
                    <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
                    <p className="font-semibold-text-x1">
            {currencySymbols[currency]}{coin.current_price.toLocaleString()}
        </p>
                </div>
            </div>
            <div className="text-right">
                <p
                className={`text-sm ${
                    coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
               
            </div>
        </div> 
        </div>
    );
}

// Crypto Currencies Settings
function App () {
 const [coins, setCoins] = useState([]);
 const [currency, SetCurrency] = useState('idr');
 const [search, setSearch] = useState('');
 useEffect(() => {
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 8,
            page: 1,
            sparkling: false,
            
        },
    })
    .then((response) => setCoins(response.data))
    .catch((error) => console.error(error));
 }, [currency]);


 // Currencies List
 return (
    <div data-aos="fade-up">
    <div className="min-h-screen bg-black p-6">
        <h1 className="text-3x1 mt-8 font-bold text-white mb-8">Crypto Price Tracker</h1>
         <div className="mb-6 bg-blue-950 rounded-lg shadow-md p-4">
                    <label className="text-white mr-2">Select Currency: </label>
                    <select
                    value={currency}
                    onChange={(e) => SetCurrency(e.target.value)}
                    className="p-2 rounded-3xl text-white bg-black border-blue-950 dark:hover:bg-black"> 
                    <option value="idr">IDR</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                    <option value="jpy">JPY</option>
                    <option value="inr">INR</option>
                    <option value="aud">AUD</option>
                    <option value="cad">CAD</option>
                    <option value="try">TRY</option>
                    <option value="krw">KRW</option>
                    </select>
                </div>
                <div className="mb-6 bg-white rounded-lg max-w-md">
    <input
        type="text"
        placeholder="Search crypto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded w-full"
    />
</div>
        <div>
            {coins.filter((coin) => 
            coin.name.toLowerCase().includes(search.toLowerCase()))
            .map((coin) => (
                <CryptoCard key={coin.id} coin={coin} currency={currency} />
            ))
        }
        </div>
    </div>
    </div>

    
 )
}



export default App;
