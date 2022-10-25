import React, { createContext, useEffect, useState, useContext } from 'react';

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({ children }) =>{

    const [cart, setCart] = useState([])
    const [totalQuantity, setTotalQuantity] = useState (0)
    const [totaly, setTotaly] = useState (0)
    console.log(cart);

  const addItem = (productToAdd) => {
    if(!isInCart(productToAdd.id)) {
      setCart([...cart, productToAdd])
    }else{
    const cartUpdate = cart.map(prod =>{
      if(prod.id === productToAdd.id){
        const productUpdated = {
          ...prod,
          quantity: productToAdd.quantity
        }
        return productUpdated
      }else{
        return prod
      }
    })
    setCart(cartUpdate)
    }
  }
  console.log('carrito', cart);
    const isInCart = (id) => {
      return cart.some(prod => prod.id === id)
    }
  const removeItem = (id) => {
    const cartWithoutItem = cart.filter(prod => prod.id !== id)
    setCart(cartWithoutItem)
  }

  useEffect(() =>{
    const totalQuantity = getTotalQuantity ()
    setTotalQuantity(totalQuantity)
  }, [cart])
  useEffect(() =>{
    const totaly = getTotaly ()
    setTotaly(totaly)
  }, [cart])

    const getTotalQuantity = () => {
        let totalQuantity = 0

        cart.forEach (prod => {
            totalQuantity += prod.quantity
        })
        return totalQuantity
    }
    const getProductQuantity = (id) =>{
      const product = cart.find(prod => prod.id === id)

      return product?.quantity
    }
    const getTotaly = () =>{
      let accu = 0

      cart.forEach(prod =>{
        accu += prod.quantity * prod.price
      })
      return accu
    }
    const clearCart = () => {
      setCart([])
    }

    return (
        <CartContext.Provider value={{
         addItem,
         removeItem,
         clearCart,
         getProductQuantity,
         cart,
         totalQuantity,
         totaly }}>
            { children }
        </CartContext.Provider>  
    )
}
