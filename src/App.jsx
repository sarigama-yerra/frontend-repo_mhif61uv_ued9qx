import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import LeadForm from './components/LeadForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <LeadForm />
      </main>
      <footer className="py-12 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Tiger Credit Card. All rights reserved.
      </footer>
    </div>
  )
}

export default App
