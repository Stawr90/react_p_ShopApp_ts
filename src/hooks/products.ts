import { useEffect, useState } from 'react';
import { IProduct } from '../models';

export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function addProduct(product: IProduct) {
        setProducts(prev => [...prev, product])
    }

    function editProduct(product: IProduct) {
        setProducts([product])
    }

    async function fetchProducts() {
        try {
            setLoading(true)
            const responce = await fetch('https://fakestoreapi.com/products?limit=5')
            const newArr = await responce.json();
            setProducts(newArr)
            setLoading(false)
        } catch (e) {
            setLoading(false);
            setError('Ошибка при загрузке страницы...');
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return { products, error, loading, addProduct, editProduct, fetchProducts }
}