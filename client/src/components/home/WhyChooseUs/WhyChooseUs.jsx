import React, { useState } from 'react';
import { Container } from '../../common/Container/Container';
import { SectionHeading } from '../../common/SectionHeading/SectionHeading';
import { useInView } from '../../../hooks/useInView';
import { useCountUp } from '../../../hooks/useCountUp';
import './WhyChooseUs.css';

const VALUE_PROPOSITIONS = [
  {
    id: 'value-savings',
    title: 'Up to 70% Pricing Advantage',
    summary: 'Direct access to restaurant quality surplus meals at fraction of standard menu pricing.',
    points: ['No hidden delivery surcharges', 'Curated premium outlets', 'Guaranteed fresh daily inventory'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#E23744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'value-esg',
    title: 'Measurable Environmental Impact',
    summary: 'Tangible ESG contribution keeping safe, edible surplus away from carbon-heavy landfills.',
    points: ['Verified CO₂ offset tracking', 'Circular food ecosystem', 'Zero food waste compliance'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#E23744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'value-merchant',
    title: 'Incremental Merchant Revenue',
    summary: 'Empowering local kitchens to monetize end-of-day stock that previously counted as pure margin loss.',
    points: ['Recovers raw material costs', 'Introduces new store footfalls', 'Zero inventory risk'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#E23744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'value-frictionless',
    title: 'Fast Self-Pickup Flow',
    summary: 'Simple 4-digit verification code eliminates delivery delays and order mishandling.',
    points: ['Instant counter handover', 'Zero wait in queue', 'Verified hygienic packaging'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#E23744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const IMPACT_STATS = [
  { target: 28450, label: 'Meals Rescued', suffix: '+' },
  { target: 1420000, label: 'Customer Savings', prefix: '₹', suffix: '+' },
  { target: 180, label: 'Kitchen Partners', suffix: '+' },
  { target: 72, label: 'Tons CO₂ Offset', suffix: ' Tons' },
];

const StatBlock = ({ stat, animate }) => {
  const count = useCountUp(stat.target, 2000, animate);

  const formatNumber = () => {
    if (stat.target >= 1000000) {
      return (count / 100000).toFixed(1) + ' Lakh';
    }
    return count.toLocaleString('en-IN');
  };

  return (
    <div className="stat-block">
      <div className="stat-number">
        {stat.prefix || ''}{formatNumber()}{stat.suffix || ''}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

export const WhyChooseUs = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="why-choose-us" className="why-choose-us-section" ref={sectionRef}>
      <Container>
        <SectionHeading
          title="Engineered for Scalable Urban Impact"
          subtitle="Delivering measurable unit economics to food businesses while unlocking high-quality affordable meals for urban consumers."
        />

        {/* Professional 4 Cards Grid */}
        <div className="value-cards-grid">
          {VALUE_PROPOSITIONS.map((prop) => (
            <div key={prop.id} className="value-card">
              <div className="value-card-icon-wrapper">{prop.icon}</div>
              <h3 className="value-card-title">{prop.title}</h3>
              <p className="value-card-summary">{prop.summary}</p>
              <ul className="value-card-points">
                {prop.points.map((pt, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#E23744" strokeWidth="2.5">
                      <path d="M3 8.5l3.5 3.5 6.5-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Clean Corporate Metric Strip */}
        <div className="stats-strip">
          {IMPACT_STATS.map((stat, idx) => (
            <StatBlock key={idx} stat={stat} animate={isInView} />
          ))}
        </div>
      </Container>
    </section>
  );
};
