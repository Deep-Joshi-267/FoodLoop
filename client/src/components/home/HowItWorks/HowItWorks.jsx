import React from 'react';
import { Container } from '../../common/Container/Container';
import { SectionHeading } from '../../common/SectionHeading/SectionHeading';
import { useInView } from '../../../hooks/useInView';
import './HowItWorks.css';

const STEPS = [
  {
    number: '01',
    title: 'Surplus Detection & Listing',
    description: 'Certified bakeries and cafes audit end-of-day stock and publish verified surplus items at discounted rates.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#E23744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Instant In-App Reservation',
    description: 'Customers discover nearby verified deals, lock in portions in seconds, and receive an instant pickup pass.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#E23744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Verified Counter Handover',
    description: 'Customer visits the kitchen during the scheduled evening window and displays their verification code.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#E23744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

export const HowItWorks = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="how-it-works" className="how-it-works-section" ref={sectionRef}>
      <Container>
        <SectionHeading
          title="How FoodLoop Works"
          subtitle="A disciplined, three-stage fulfillment model designed for speed, zero friction, and high food safety standards."
        />

        <div className={`how-it-works-grid ${isInView ? 'is-in-view' : ''}`}>
          <div className="how-it-works-line" />

          {STEPS.map((step) => (
            <div key={step.number} className="how-it-works-step">
              <div className="how-it-works-circle">
                <span className="how-it-works-icon-svg">{step.icon}</span>
                <span className="how-it-works-badge">{step.number}</span>
              </div>
              <h3 className="how-it-works-step-title">{step.title}</h3>
              <p className="how-it-works-step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
