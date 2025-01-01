import React from 'react'

const Footer: React.FC = () => {
 return (
   <footer className="bg-gray-50 border-t">
     <div className="max-w-7xl mx-auto px-4 py-8">
       <p className="text-center text-gray-500">
         © {new Date().getFullYear()} dsa.gay | All Rights Reserved
       </p>
     </div>
   </footer>
 )
}

export default Footer