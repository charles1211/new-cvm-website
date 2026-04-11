import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'CVM Finance Terms and Conditions — Data privacy consent and personal data processing agreement.',
};

const paragraphs = [
  {
    title: 'Consent to Data Collection',
    content:
      'I confirm that I freely and voluntarily give consent to the collection and processing of my data, which may include personal information and/or sensitive information set out in this registration and application possessed by CVM Finance and Credit Corporation.',
  },
  {
    title: 'Personal Data Processing Consent',
    content:
      "I also confirm that I have read the 'Loan Contract' and give my full consent to CVM Finance and Credit Corporation to collect, store, access and/or process any personal data I may provide herein, such as but not limited to my name, address, telephone number and e-mail address etc. I also acknowledge that the collection and processing of my personal data is necessary for such purpose.",
  },
  {
    title: 'Data Rights Acknowledgment (Data Privacy Act of 2012)',
    content:
      'I am aware of my right to be informed, to access, to object, to erasure or blocking, to damages, to file a complaint, to rectify and to data portability, and I understand that there are procedures, conditions and exceptions to be complied with in order to exercise or invoke such rights in accordance with Data Privacy act of 2012.',
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Yellow banner header */}
      <section className='pt-32 pb-16 bg-secondary relative overflow-hidden'>
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(8,71,124,0.4) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center'>
              <Shield className='w-6 h-6 text-primary' />
            </div>
            <span className='text-primary/60 text-xs font-bold uppercase tracking-widest'>
              Legal Document
            </span>
          </div>
          <h1 className='text-4xl md:text-5xl font-extrabold text-primary leading-tight'>
            Terms and Condition
          </h1>
          <p className='text-primary/65 mt-3 text-sm'>
            Data Privacy Consent and Personal Data Processing Agreement
          </p>
        </div>
      </section>

      <section className='py-16 bg-background'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden'>
            <div className='bg-primary/5 border-b border-slate-100 px-8 py-5'>
              <p className='text-slate-600 text-sm leading-relaxed'>
                Please read the following terms carefully. By using our services, you agree to the
                conditions outlined below in accordance with Philippine law and the Data Privacy Act
                of 2012.
              </p>
            </div>
            <div className='p-8 space-y-8'>
              {paragraphs.map((p, i) => (
                <div key={p.title} className='group'>
                  <div className='flex items-start gap-4 mb-3'>
                    <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-secondary font-extrabold text-sm flex-shrink-0 mt-0.5'>
                      {i + 1}
                    </div>
                    <h2 className='text-lg font-bold text-primary'>{p.title}</h2>
                  </div>
                  <div className='ml-12'>
                    <p className='text-slate-600 leading-relaxed text-sm border-l-2 border-slate-100 pl-4 group-hover:border-secondary transition-colors duration-300'>
                      {p.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='bg-slate-50 border-t border-slate-100 px-8 py-5'>
              <p className='text-slate-400 text-xs text-center'>
                CVM Finance and Credit Corporation ·{' '}
                <a
                  href='mailto:customerservice@cvmfinance.com'
                  className='text-primary hover:underline'
                >
                  customerservice@cvmfinance.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
