const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const CATEGORIES = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
const BASE_URL = "http://20.244.56.144/test/companies/{company}/categories/{category}/products";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjI4NjQwLCJpYXQiOjE3MTcyMjgzNDAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImM4NDRiYTkyLTM5NTYtNDRhYi04OTZkLWZhMTkzNDVjODgzMCIsInN1YiI6ImFudXJhZy4yMTI1Y3NzMTE3OUBraWV0LmVkdSJ9LCJjb21wYW55TmFtZSI6Im93bk1hcnQiLCJjbGllbnRJRCI6ImM4NDRiYTkyLTM5NTYtNDRhYi04OTZkLWZhMTkzNDVjODgzMCIsImNsaWVudFNlY3JldCI6IkJveFdCYXplS1JRU3FIbUYiLCJvd25lck5hbWUiOiJBbnVyYWcgS3VtYXIiLCJvd25lckVtYWlsIjoiYW51cmFnLjIxMjVjc3MxMTc5QGtpZXQuZWR1Iiwicm9sbE5vIjoiMjEwMDI5MDEyMDAzOCJ9.prAiQd5bB3yPjaL244clN0qLptJXLj4G4MJspvuN4W4";


// Fetch products from a company
const fetchProducts = async (company, category, top, minPrice, maxPrice) => {
    const url = BASE_URL.replace('{company}', company).replace('{category}', category);
    try {
        const response = await axios.get(url, {
            params: {
                top: top,
                minPrice: minPrice,
                maxPrice: maxPrice
            },
            headers: {
                'Authorization': AUTH_TOKEN
            }
        });
        return response.data.map(product => ({
            ...product,
            id: uuidv4(),
            company,
            category
        }));
    } catch (error) {
        console.error(`Error fetching products from ${company}: ${error.message}`);
        return [];
    }
};


// Get products 

const getProducts = async (req, res, next) => {
    const { categoryname } = req.params;
    
    if (!CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: "Invalid category" });
    }
    
    const top = parseInt(req.query.top) || 10;
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Infinity;
    const sortBy = req.query.sortBy || 'price';
    const order = req.query.order || 'asc';
    const page = parseInt(req.query.page) || 1;

    try {
        let allProducts = [];

        for (const company of COMPANIES) {
            const products = await fetchProducts(company, categoryname, top, minPrice, maxPrice);
            allProducts = allProducts.concat(products);
        }

        if (['price', 'rating', 'discount', 'company'].includes(sortBy)) {
            const reverse = order === 'desc';
            allProducts.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return reverse ? 1 : -1;
                if (a[sortBy] > b[sortBy]) return reverse ? -1 : 1;
                return 0;
            });
        }

        const startIndex = (page - 1) * top;
        const endIndex = startIndex + top;
        const paginatedProducts = allProducts.slice(startIndex, endIndex);

        res.json(paginatedProducts);
    } catch (error) {
        next(error);
    }
};

// Get product details

const getProductDetails = async (req, res, next) => {
    const { categoryname, productid } = req.params;

    if (!CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: "Invalid category" });
    }

    try {
        for (const company of COMPANIES) {
            const products = await fetchProducts(company, categoryname, 100, 0, Infinity);
            const foundProduct = products.find(p => p.id === productid);
            if (foundProduct) {
                res.json(foundProduct);
                return;
            }
        }
        res.status(404).json({ error: "Product not found" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductDetails
};
