import { Shield, Crown, Plane, Gift } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Advanced Security',
    desc: 'Real-time fraud alerts, card lock/unlock, and biometric verification.'
  },
  {
    icon: Crown,
    title: 'Premium Rewards',
    desc: '5x points on dining and entertainment, instant cashback on partners.'
  },
  {
    icon: Plane,
    title: 'Travel Privileges',
    desc: 'Complimentary lounge access and zero foreign exchange markup.'
  },
  {
    icon: Gift,
    title: 'Welcome Bonus',
    desc: 'Limited-time joining bonus when you apply this month.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why choose Tiger</h2>
          <p className="text-gray-600 mt-2">Designed for speed, security, and style.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl p-6 bg-white/70 backdrop-blur border border-white/60 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-gray-900 text-white flex items-center justify-center mb-4">
                <f.icon size={20} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
