import React from 'react'
import {useState} from 'react'
import { IProduct } from '../models';
import { ErrorMessage } from './ErrorMessage';

const productData: IProduct = {
    title: '',
    price: 0,
    description: 'Description...',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 42,
        count: 10
    }
}

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

export function CreateProduct({onCreate}: CreateProductProps) {
    const [value, setValue] = useState('');
    const [price, setPrice] = useState(0);
    const [error, setError] = useState('');

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setPrice(0);

        if (value.trim().length === 0) {
            setError('Please enter valid title')
            return
        }

        if (value.trim().length === 0) {
            setError('Please enter valid price')
            return
        }

        productData.title = value;
        productData.price = price;

        const responce = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(productData)
        })
        const updateProduct = await responce.json();

        onCreate(updateProduct);
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.valueAsNumber);
    }

    return (
        <form onSubmit={submitHandler}>
            <input 
            type="text" 
            className="border py-2 px-4 mb-2 w-full outline-0"
            placeholder="Enter title"
            value={value}
            onChange={changeHandler}/>
            <input 
            type="number" 
            className="border py-2 px-4 mb-2 w-full outline-0"
            placeholder="Enter price"
            value={price}
            onChange={changePrice}/>

            {error && <ErrorMessage error={error}/>}

            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
        </form>
    )
}