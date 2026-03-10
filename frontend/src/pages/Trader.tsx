import { useState } from "react";

export default function Trader() {

  const [shares,setShares] = useState("")
  const [price,setPrice] = useState("")

  return (

    <div style={container}>

      <h2>Trader Dashboard</h2>

      <div style={card}>

        <h3>Place Order</h3>

        <select style={input}>
          <option>TCS ₹3589</option>
          <option>Reliance ₹2700</option>
          <option>Infosys ₹1500</option>
        </select>

        <input
        placeholder="Quantity (Shares)"
        value={shares}
        onChange={(e)=>setShares(e.target.value)}
        style={input}
        />

        <input
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        style={input}
        />

        <button style={buy}>Submit BUY Order</button>

      </div>

    </div>

  )

}

const container = {
  textAlign:"center",
  marginTop:"40px"
}

const card = {
  width:"400px",
  margin:"auto",
  padding:"30px",
  background:"#1e293b",
  borderRadius:"10px",
  color:"white"
}

const input = {
  width:"100%",
  padding:"10px",
  marginTop:"10px"
}

const buy = {
  width:"100%",
  marginTop:"20px",
  padding:"12px",
  background:"#16a34a",
  border:"none",
  color:"white"
}