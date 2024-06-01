import React, { useEffect, useState } from 'react';
import { getProducts, Product } from '../Services/api';
import ProductList from '../components/ProductList';

const CATEGORIES = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

interface Params {
    top: number;
    minPrice?: number;
    maxPrice?: number;
    company?: string;
}

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<string>('Laptop');
    const [company, setCompany] = useState<string | undefined>(undefined);
    const [params, setParams] = useState<Params>({ top: 10 });

    useEffect(() => {
        getProducts(category, params).then(response => {
            setProducts(response.data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    }, [category, company, params]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCompany(event.target.value === "All" ? undefined : event.target.value);
    };

    const handleParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setParams(prevParams => ({ ...prevParams, [name]: Number(value) }));
    };

    const handleSearch = () => {
        getProducts(category, params).then(response => {
            setProducts(response.data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex space-x-4 mb-4">
                <select value={category} onChange={handleCategoryChange} className="border p-2 rounded">
                    {CATEGORIES.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <select value={company || "All"} onChange={handleCompanyChange} className="border p-2 rounded">
                    <option value="All">All Companies</option>
                    {COMPANIES.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="top"
                    value={params.top}
                    onChange={handleParamChange}
                    placeholder="Top N"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="minPrice"
                    value={params.minPrice ?? ''}
                    onChange={handleParamChange}
                    placeholder="Min Price"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="maxPrice"
                    value={params.maxPrice ?? ''}
                    onChange={handleParamChange}
                    placeholder="Max Price"
                    className="border p-2 rounded"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">Search</button>
            </div>
            <ProductList products={products} />
        </div>
    );
};

export default HomePage;
