import { Clock, Users, Zap, Award, HeartHandshake } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionReveal from '@/components/shared/SectionReveal';

const reasons = [
  {
    icon: Zap,
    title: 'Fast Loan Processing',
    description:
      'Quick approval process with minimal requirements. Get your loan in days, not weeks.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Award,
    title: 'ISO 9001:2015 Certified',
    description: 'Our quality management systems meet international standards for excellence.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Clock,
    title: '30+ Years of Experience',
    description:
      'Founded in 1994, we have over three decades of experience serving Filipino borrowers.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Users,
    title: '50+ Branches Nationwide',
    description: "With over 56 branches across the Philippines, we're always near you.",
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-First Approach',
    description: 'Our dedicated team is committed to helping you achieve your financial goals.',
    color: 'bg-pink-50 text-pink-600',
  },
];

export default function WhyChooseCVM() {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <SectionHeader
          eyebrow='Why Choose Us'
          title='The CVM Finance'
          titleHighlight='Advantage'
          subtitle="Trusted by 30,000+ Filipinos. Here's why they choose us for their financial needs."
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {reasons.map((reason, i) => (
            <SectionReveal key={reason.title} delay={i * 0.08} direction='up'>
              <div className='group p-6 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-card-hover transition-all duration-300 bg-white'>
                <div
                  className={`w-12 h-12 ${reason.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <reason.icon className='w-6 h-6' />
                </div>
                <h3 className='font-bold text-primary text-base mb-2'>{reason.title}</h3>
                <p className='text-slate-500 text-sm leading-relaxed'>{reason.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
