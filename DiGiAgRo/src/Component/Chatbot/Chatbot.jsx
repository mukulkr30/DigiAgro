import React from 'react'
import { useState } from 'react'
function Chatbot() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button className='bg-green-300 h-15 w-15 flex items-center justify-center rounded-full ml-auto mr-5 mb-5'
                onClick={()=>setOpen((o)=>!o)}
            >
                {open?"AI":"X"}
            </button>
        </div>
    )
}

export default Chatbot
