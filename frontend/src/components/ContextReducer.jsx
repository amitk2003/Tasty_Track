import React, { useContext, useReducer } from 'react'
import { createContext } from 'react'
const CartStateContext= createContext();
const CartDispatchContext=createContext();
export const CartProvider=({children}) =>{
    const reducer=(state,action) =>{
    switch (action.type) {
        case "ADD":
            // here{} shows what type of data need to passed when adding that item to paricular user cart
            return [...state,{id:action.id,title:action.title,img:action.img,qty:action.qty,size:action.size,price:action.price}]
        case "REMOVE":
            // FOR REMOVE YOU CANT DIRECTLY REMOVE FROM ORIGINAL ARRAY
            let DelArray=[...state];
            DelArray.splice(action.index,1) ;
            return DelArray;
        case "UPDATE":
            let UpdateArray=[...state];
            UpdateArray.find((food,index) =>{
                if(food.id===action.id){
                    UpdateArray[index]={...food, qty:parseInt(action.qty)+food.qty,price:action.price+food.price}
                }
                return UpdateArray;
            })
            return UpdateArray;
        case "DROP":
                let empArr=[]
                return empArr;
        default:
            console.log("error in reducer function")
    }
    }
    const[state,dispatch]=useReducer(reducer,[])

    return(
        <>
        <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>


        </CartDispatchContext.Provider>
        </>
    )
}

export const useCart =()=> useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);
