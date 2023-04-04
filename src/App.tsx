import { useContext, useState } from 'react';

import { Product } from './components/Product';
import { useProducts } from './hooks/products';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { Modal } from './components/Modal';
import { CreateProduct } from './components/CreateProduct';
import { IProduct } from './models';
import { ModalContext } from './context/ModalContext';

function App() {
  const {products, error, loading, addProduct, editProduct} = useProducts();
  const {modal, open, close} = useContext(ModalContext)
  const [newPrice, setNewPrice] = useState(0)
  const [productNumber, setProductNumber] = useState(0)
  const [newTitle, setNewTitle] = useState('')
  const inputStyle = 'border py-1 px-2 mb-2 ml-3 w-20 outline-0 bg-blue-100 hover:bg-yellow-100';

  const createHandler = (product: IProduct) => {
    close()
    addProduct(product)
  }

  const editTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }

  const editPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(event.target.valueAsNumber)
  }

  const editProductNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductNumber(event.target.valueAsNumber)
  }

  const editHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setNewTitle('');
    setProductNumber(0);
    setNewPrice(0);
    
    fetch(`https://fakestoreapi.com/products/${productNumber}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(
          {
            title: newTitle,
            price: newPrice,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
          }
        )
      })
      .then(res => res.json())
      .then(data => editProduct(data))
      .catch(error => console.log('Ошибка в запросе...'))
  }

  return (
    <div className="h-full bg-blue-100">
      <div className='container mx-auto max-w-2xl py-5'>
      {loading && <Loader/>}
      {error && <ErrorMessage error={error}/>}
      {products.map(item => <Product product={item} key={item.id}/>)}

      {modal && <Modal title="Create new product" onClose={close}>
        <CreateProduct onCreate={createHandler}/>
      </Modal>}

      {!modal && <button className="fixed top-5 right-5 rounded-full bg-red-700 text-white text-1xl px-3" 
      onClick={open}>Show modal</button>}
      <form onSubmit={editHandler}
        className='fixed rounded-[7px] top-5 left-5 w-40 bg-blue-400 px-1 py-1 hover:bg-yellow-400'>
        Product
        <input 
          type="number"
          placeholder='Product' 
          className={inputStyle}
          value={productNumber}
          onChange={editProductNumber}/><br/>
        Title
        <input 
          type="text"
          placeholder='Title' 
          className={inputStyle}
          value={newTitle}
          onChange={editTitle}/><br/>
        Price
        <input 
          type="number"
          placeholder='Price' 
          className={inputStyle}
          value={newPrice}
          onChange={editPrice}/>
          
        <button type='submit' className="left-5 rounded-full bg-red-700 text-white text-1xl px-3">Edit param</button>
      </form>
    </div>
  </div>
    
  )
}

export default App;