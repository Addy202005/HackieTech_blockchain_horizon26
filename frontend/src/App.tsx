import { useState } from "react"

function App() {

const [buyer,setBuyer] = useState("")
const [seller,setSeller] = useState("")
const [shares,setShares] = useState("")
const [price,setPrice] = useState("")
const [result,setResult] = useState("")

// predefined traders
const traders = {
"Trader A":"0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
"Trader B":"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
}

// connect metamask
async function connectWallet(){

if(window.ethereum){

const accounts = await window.ethereum.request({
method:"eth_requestAccounts"
})

setBuyer(accounts[0])

}else{
alert("Please install MetaMask")
}

}

// execute trade
async function executeTrade(){

try{

const res = await fetch("http://localhost:5000/settleTrade",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
buyer,
seller,
shares,
price
})
})

const data = await res.json()

if(data.txHash){
setResult("Trade Settled Successfully\nTxHash: "+data.txHash)
}else{
setResult(data.error)
}

}catch(err){
setResult("Backend connection error")
}

}

return(

<div style={container}>

{/* Navbar */}

<div style={navbar}>

<h2 style={{paddingLeft:"10px",color:"#ff4d6d"}}>HechieTech Settlement</h2>

<button style={navBtn} onClick={connectWallet}>
Connect MetaMask
</button>

</div>


<div style={layout}>

{/* Sidebar */}

<div style={sidebar}>

<h3>Menu</h3>

<button style={sideBtn}>Place Order</button>
<button style={sideBtn}>Wallet</button>
<button style={sideBtn}>Settlement</button>
<button style={sideBtn}>History</button>

</div>


{/* Main */}

<div style={main}>

<div style={card}>

<h2>Place Order</h2>

{/* Buyer */}

<input
value={buyer}
readOnly
style={input}
/>

{/* Seller */}

<select
style={select}
onChange={(e)=>setSeller(e.target.value)}
>

<option value="">Select Seller</option>

<option value={traders["Trader A"]}>
Trader A (0x3C44...93BC)
</option>

<option value={traders["Trader B"]}>
Trader B (0x7099...79C8)
</option>

</select>


{/* Shares */}

<input
placeholder="Shares"
style={input}
onChange={(e)=>setShares(e.target.value)}
/>

{/* Price */}

<input
placeholder="Price"
style={input}
onChange={(e)=>setPrice(e.target.value)}
/>

<button style={tradeBtn} onClick={executeTrade}>
Execute Trade
</button>

<p style={{marginTop:"20px",whiteSpace:"pre-line"}}>
{result}
</p>

</div>

</div>

</div>

</div>

)

}

export default App


// ================= Styles =================

const container={
background:"#020617",
minHeight:"100vh",
color:"white"
}

const navbar={
display:"flex",
justifyContent:"space-between",
padding:"20px",
background:"#0f172a"
}

const navBtn={
padding:"5px 5px",
background:"#1054e7e4",
border:"none",
borderRadius:"10px",
color:"white",
cursor:"pointer"
}

const layout={
display:"flex"
}

const sidebar={
width:"200px",
background:"#0f172a",
padding:"20px"
}

const sideBtn={
display:"block",
width:"100%",
marginTop:"10px",
padding:"10px",
background:"#1e293b",
border:"none",
color:"white",
cursor:"pointer"
}

const main={
display:"flex",
justifyContent:"center",
alignItems:"center",
flex:1,
padding:"40px",
minHeight:"80vh"
}

const card={
width:"420px",
background:"#1e293b",
padding:"30px",
borderRadius:"15px",
display:"flex",
flexDirection:"column",
alignItems:"center"
}

const input={
width:"95%",
padding:"10px",
marginTop:"10px",
borderRadius:"10px",
border:"none"
}

const select={
width:"100%",
padding:"10px",
marginTop:"10px",
borderRadius:"10px",
border:"none"
}

const tradeBtn={
width:"85%",
marginTop:"20px",
padding:"12px",
background:"#07a842cf",
border:"none",
borderRadius:"10px",
color:"white",
cursor:"pointer"
}
