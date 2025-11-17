import { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function LeadForm() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    income_range: '',
    message: '',
    consent: false,
  })
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => {
    if (!form.full_name || form.full_name.length < 2) return 'Please enter your full name.'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.'
    if (!form.phone || form.phone.replace(/\D/g, '').length < 7) return 'Please enter a valid phone number.'
    if (!form.consent) return 'Please accept the consent to proceed.'
    return null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setStatus({ type: 'error', message: err })
      return
    }
    setStatus({ type: 'loading', message: 'Submitting your details...' })

    try {
      const res = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.detail || 'Submission failed')
      setStatus({ type: 'success', message: 'Thank you! Our team will contact you soon.' })
      setForm({ full_name: '', email: '', phone: '', income_range: '', message: '', consent: false })
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong.' })
    }
  }

  return (
    <section id="apply" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Apply in minutes</h2>
            <p className="text-gray-600">Enter your contact details and we’ll get back to you with the next steps.</p>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>No impact on your credit score</li>
              <li>Secure data handling</li>
              <li>Quick turnaround</li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="bg-white/70 backdrop-blur rounded-2xl border border-white/60 shadow-sm p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input name="full_name" value={form.full_name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" placeholder="jane@example.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" placeholder="+1 555 123 4567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Income Range (optional)</label>
                <select name="income_range" value={form.income_range} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10">
                  <option value="">Select</option>
                  <option value="< $25k">Less than $25k</option>
                  <option value="$25k - $50k">$25k - $50k</option>
                  <option value="$50k - $100k">$50k - $100k</option>
                  <option value="> $100k">More than $100k</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message (optional)</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="3" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10" placeholder="Anything we should know?" />
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1 h-4 w-4" />
              I agree to be contacted about my application and accept the privacy policy.
            </label>
            <button type="submit" className="w-full bg-gray-900 text-white font-semibold rounded-lg py-3 hover:bg-black/90 transition">
              {status.type === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
            {status.type !== 'idle' && (
              <p className={`text-sm ${status.type === 'success' ? 'text-emerald-600' : status.type === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
