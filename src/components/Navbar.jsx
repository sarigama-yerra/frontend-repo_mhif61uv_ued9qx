import { Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-xl mt-4 backdrop-blur-md bg-white/40 border border-white/30 shadow-sm">
          <div className="flex items-center gap-2 pl-4">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black">T</div>
            <span className="font-semibold text-gray-800 tracking-tight">Tiger Credit Card</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#features" className="hover:text-gray-900">Benefits</a>
            <a href="#eligibility" className="hover:text-gray-900">Eligibility</a>
            <a href="#apply" className="hover:text-gray-900">Apply</a>
          </nav>
          <div className="flex items-center pr-2">
            <a href="#apply" className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black/90 transition">Get Started</a>
            <button className="md:hidden p-2"><Menu size={22} /></button>
          </div>
        </div>
      </div>
    </header>
  )
}
