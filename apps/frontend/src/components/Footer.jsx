import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-sky-100 py-4 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© Copyright {new Date().getFullYear()}</p>
          <div className="mt-2 md:mt-0">
            <nav className="flex space-x-4">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-700">Help</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-700">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-700">Terms</a>
            </nav>
          </div>
        </div>
        <p className="mt-2 text-center text-sm hover:text-yellow-500 text-gray-600">Developed & Maintained by Techzone Team</p>
      </div>
    </footer>
  )
}

export default Footer
