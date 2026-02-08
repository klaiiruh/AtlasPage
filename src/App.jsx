import React, { useEffect, useRef, useState } from 'react';

const ProjectAtlas = () => {
  useEffect(() => {
    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      
      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Parallax effect on mission cards (subtle)
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.mission-card');
      
      parallaxElements.forEach((el, index) => {
        const speed = 0.01 * (index + 1);
        const yPos = -(scrolled * speed);
        const rect = el.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleParallax);

    // Interactive cursor glow effect (throttled)
    let lastGlowTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastGlowTime > 100) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.left = e.pageX + 'px';
        glow.style.top = e.pageY + 'px';
        document.body.appendChild(glow);
        
        setTimeout(() => glow.remove(), 1000);
        lastGlowTime = now;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Interactive hover effect for cards
    const missionCards = document.querySelectorAll('.mission-card');
    const statCards = document.querySelectorAll('.stat-card');
    
    missionCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });

    statCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('scroll', handleParallax);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --mv-black: #0a0a0a;
          --mv-charcoal: #1a1a1a;
          --atlas-purple: #a78bfa;
          --atlas-violet: #8b5cf6;
          --soft-white: #f8f9fa;
          --light-gray: #e9ecef;
          --mid-gray: #6c757d;
          --accent-purple: #c084fc;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0f1f 25%, #0d0d0d 50%, #1c1129 75%, #0a0a0a 100%);
          background-size: 400% 400%;
          animation: watercolorShift 15s ease infinite;
          color: var(--mv-black);
          overflow-x: hidden;
          line-height: 1.6;
          position: relative;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 20% 30%, rgba(167, 139, 250, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(192, 132, 252, 0.08) 0%, transparent 50%);
          z-index: -1;
          pointer-events: none;
        }

        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              rgba(255, 255, 255, 0.01) 1px,
              transparent 2px,
              transparent 40px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              rgba(255, 255, 255, 0.01) 1px,
              transparent 2px,
              transparent 40px
            );
          z-index: -1;
          pointer-events: none;
        }

        @keyframes watercolorShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .hero::after {
          content: '⛰️';
          position: absolute;
          font-size: 40rem;
          opacity: 0.04;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          pointer-events: none;
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: rgba(167, 139, 250, 0.15);
          backdrop-filter: blur(10px);
          color: white;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 2rem;
          letter-spacing: 0.5px;
          animation: fadeInDown 0.8s ease-out;
          border: 1px solid rgba(167, 139, 250, 0.4);
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.2);
        }

        h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 800;
          line-height: 0.95;
          margin-bottom: 1rem;
          letter-spacing: -0.03em;
          animation: fadeInUp 1s ease-out 0.2s both;
          color: white;
        }

        .hero h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 600;
          color: var(--atlas-purple);
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease-out 0.4s both;
          text-shadow: 0 0 30px rgba(167, 139, 250, 0.4);
        }

        .hero p {
          font-size: clamp(1rem, 2vw, 1.3rem);
          max-width: 700px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          margin-bottom: 3rem;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .cta-container {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeInUp 1s ease-out 0.8s both;
        }

        .btn {
          padding: 1.2rem 3rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--atlas-purple), var(--atlas-violet));
          color: white;
          box-shadow: 0 4px 20px rgba(167, 139, 250, 0.4);
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 40px rgba(167, 139, 250, 0.6);
          background: linear-gradient(135deg, #c084fc, #a78bfa);
        }

        .btn-secondary {
          background: white;
          color: var(--mv-black);
          border: 2px solid var(--mv-black);
        }

        .btn-secondary:hover {
          background: var(--mv-black);
          color: white;
        }

        section {
          padding: 6rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          text-align: center;
          letter-spacing: -0.02em;
          color: white;
        }

        .section-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
          line-height: 1.7;
        }

        .mission {
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(20px);
          color: white;
          border-radius: 24px;
          padding: 5rem 3rem;
          margin: 0 2rem;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(167, 139, 250, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(167, 139, 250, 0.15);
        }

        .mission::before {
          content: '🎉';
          position: absolute;
          font-size: 25rem;
          opacity: 0.02;
          top: -5rem;
          right: -5rem;
          transform: rotate(-15deg);
          animation: floatParty 10s ease-in-out infinite;
        }

        @keyframes floatParty {
          0%, 100% { transform: rotate(-15deg) translateY(0); }
          50% { transform: rotate(-13deg) translateY(-10px); }
        }

        .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          margin-top: 3rem;
        }

        .mission-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(167, 139, 250, 0.2);
          padding: 2.5rem;
          border-radius: 16px;
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .mission-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--atlas-purple);
          box-shadow: 0 12px 40px rgba(167, 139, 250, 0.3);
        }

        .mission-card h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: var(--atlas-purple);
          text-shadow: 0 0 20px rgba(167, 139, 250, 0.4);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin: 4rem 0;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--atlas-purple);
          box-shadow: 0 12px 40px rgba(167, 139, 250, 0.4);
        }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 4rem;
          font-weight: 800;
          color: var(--atlas-purple);
          line-height: 1;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 30px rgba(167, 139, 250, 0.5);
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-number {
          transform: scale(1.1);
          text-shadow: 0 0 40px rgba(167, 139, 250, 0.7);
        }

        .stat-label {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
        }

        .timeline {
          position: relative;
          max-width: 1000px;
          margin: 4rem auto;
          padding: 2rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, 
            transparent 0%,
            var(--atlas-purple) 10%,
            var(--atlas-purple) 90%,
            transparent 100%
          );
          transform: translateX(-50%);
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
        }

        .timeline-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6rem;
          position: relative;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        .timeline-item:nth-child(odd) {
          flex-direction: row;
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-content {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          width: 42%;
          position: relative;
        }

        .timeline-content:hover {
          border-color: var(--atlas-purple);
          box-shadow: 0 8px 30px rgba(167, 139, 250, 0.3);
        }

        .timeline-dot {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--atlas-purple), var(--atlas-violet));
          border-radius: 50%;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border: 3px solid var(--atlas-purple);
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.5);
          animation: pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .timeline-item:nth-child(odd) .timeline-content::before {
          content: '';
          position: absolute;
          right: -30px;
          top: 50%;
          width: 30px;
          height: 2px;
          background: linear-gradient(to right, var(--atlas-purple), transparent);
          transform: translateY(-50%);
        }

        .timeline-item:nth-child(even) .timeline-content::before {
          content: '';
          position: absolute;
          left: -30px;
          top: 50%;
          width: 30px;
          height: 2px;
          background: linear-gradient(to left, var(--atlas-purple), transparent);
          transform: translateY(-50%);
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(167, 139, 250, 0.5); }
          50% { box-shadow: 0 0 30px rgba(167, 139, 250, 0.7); }
        }

        .timeline-date {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--atlas-purple);
          margin-bottom: 0.5rem;
          text-shadow: 0 0 15px rgba(167, 139, 250, 0.4);
        }

        .timeline-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }

        .timeline-content p {
          color: rgba(255, 255, 255, 0.7);
        }

        footer {
          background: var(--mv-black);
          color: white;
          padding: 4rem 2rem 2rem;
          margin-top: 6rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 3rem;
          align-items: start;
        }

        .footer-section h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: white;
          font-weight: 600;
          text-transform: lowercase;
        }

        .footer-section:first-child h3 {
          font-size: 2rem;
          text-transform: none;
          font-weight: 800;
        }

        .footer-section p,
        .footer-section a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          display: block;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }

        .footer-section:first-child p {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .parallax {
          transition: transform 0.5s ease-out;
        }

        .cursor-glow {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: glowFade 1s ease-out forwards;
          z-index: 9999;
        }

        @keyframes glowFade {
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
          }
        }

        @media (max-width: 768px) {
          .timeline::before {
            left: 25px;
          }

          .timeline-item {
            flex-direction: row !important;
            padding-left: 60px;
          }

          .timeline-item:nth-child(odd),
          .timeline-item:nth-child(even) {
            flex-direction: row !important;
          }

          .timeline-content {
            width: 100%;
          }

          .timeline-dot {
            position: absolute;
            left: 0;
          }

          .timeline-item:nth-child(odd) .timeline-content::before,
          .timeline-item:nth-child(even) .timeline-content::before {
            display: none;
          }

          .cta-container {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            width: 100%;
          }

          .mission {
            margin: 0 1rem;
            padding: 3rem 2rem;
          }

          .footer-content {
            grid-template-columns: 1fr !important;
            gap: 2rem;
          }
        }
      `}</style>

      <div className="hero">
        <div className="hero-badge">Montreal to Toronto Tech Week</div>
        <h1>PROJECT<br/>ATLAS</h1>
        <h2>build together.</h2>
        <p>The best builders in Montreal are going to Toronto Tech Week. 50+ students. One week. 315+ events. Let's make some noise.</p>
        <div className="cta-container">
          <a href="#apply" className="btn btn-primary">Apply as a Builder</a>
        </div>
      </div>

      <section className="mission reveal">
        <h2 className="section-title" style={{color: 'white'}}>Why Atlas?</h2>
        <p className="section-subtitle" style={{color: 'rgba(255,255,255,0.8)'}}>McGill Ventures is bringing Montreal's student builders to Toronto Tech Week. Together. As a crew. Ready to show the ecosystem what Montreal's been building.</p>
        
        <div className="mission-grid">
          <div className="mission-card">
            <h3>🎯 Show Up Together</h3>
            <p>Montreal's talent showing up as a force, not scattered individuals. When we roll into Toronto, they'll know we're here.</p>
          </div>
          <div className="mission-card">
            <h3>🚀 Access Everything</h3>
            <p>315+ events. Exclusive office tours. Dinners with founders. Workshops with VCs. We're maxing out every opportunity this week has to offer.</p>
          </div>
          <div className="mission-card">
            <h3>🌍 Build the Network</h3>
            <p>50+ ambitious builders living together, grinding together, exploring Toronto's tech scene together. The connections you make this week last forever.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="stats reveal">
          <div className="stat-card">
            <div className="stat-number">315+</div>
            <div className="stat-label">Events to Hit Up</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">Days in Toronto</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Montreal Builders</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">∞</div>
            <div className="stat-label">Connections Made</div>
          </div>
        </div>
      </section>

      <section id="timeline">
        <h2 className="section-title reveal">The Journey</h2>
        <p className="section-subtitle reveal">May 25-31, 2025</p>

        <div className="timeline">
          <div className="timeline-item reveal">
            <div className="timeline-content">
              <div className="timeline-date">Sunday, May 25</div>
              <div className="timeline-title">Departure & Arrival</div>
              <p>Bus from Montreal (9 AM) → Arrive Toronto (6 PM) → Opening dinner, icebreakers, pitch night (7:30-9:30 PM)</p>
            </div>
            <div className="timeline-dot">🚌</div>
          </div>

          <div className="timeline-item reveal">
            <div className="timeline-content">
              <div className="timeline-date">Monday, May 26</div>
              <div className="timeline-title">Exclusive Access Day</div>
              <p>Private office tours, exclusive site visits with Toronto's best talent. Network with industry leaders before Tech Week begins.</p>
            </div>
            <div className="timeline-dot">🏢</div>
          </div>

          <div className="timeline-item reveal">
            <div className="timeline-content">
              <div className="timeline-date">May 26-30</div>
              <div className="timeline-title">Toronto Tech Week</div>
              <p>315+ events to explore. Build connections. Learn from the best. Breakfasts at housing, full days immersed in Canada's biggest tech gathering.</p>
            </div>
            <div className="timeline-dot">⛰️</div>
          </div>

          <div className="timeline-item reveal">
            <div className="timeline-content">
              <div className="timeline-date">Saturday, May 31</div>
              <div className="timeline-title">Return to Montreal</div>
              <p>Bus departs Toronto (10 AM) → Arrive Montreal (6 PM). Come home with a full contact list and stories to tell.</p>
            </div>
            <div className="timeline-dot">🏠</div>
          </div>
        </div>
      </section>

      <section id="apply" className="reveal">
        <h2 className="section-title">For Student Builders</h2>
        <p className="section-subtitle">We're taking 50+ of Montreal's most ambitious student builders to Toronto Tech Week. All-inclusive. Let's go.</p>

        <div className="mission-grid" style={{marginTop: '3rem'}}>
          <div className="stat-card">
            <h3 style={{fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', color: 'white', marginBottom: '1rem'}}>What's Included</h3>
            <ul style={{textAlign: 'left', listStyle: 'none', padding: 0}}>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>✓</span>
                Round-trip transportation
              </li>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>✓</span>
                Shared housing near downtown
              </li>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>✓</span>
                Breakfast & opening dinner
              </li>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>✓</span>
                Exclusive access to partner events
              </li>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>✓</span>
                Access to 315+ Toronto Tech Week events
              </li>
            </ul>
          </div>

          <div className="stat-card">
            <h3 style={{fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', color: 'white', marginBottom: '1rem'}}>Who Should Apply</h3>
            <ul style={{textAlign: 'left', listStyle: 'none', padding: 0}}>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>→</span>
                Montreal university students
              </li>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>→</span>
                Building something interesting
              </li>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>→</span>
                Ready to network hard
              </li>
              <li style={{padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'rgba(255, 255, 255, 0.8)'}}>
                <span style={{position: 'absolute', left: 0, color: 'var(--atlas-purple)'}}>→</span>
                Down for the full experience
              </li>
            </ul>
          </div>

          <div className="stat-card">
            <h3 style={{fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', color: 'white', marginBottom: '1rem'}}>Investment</h3>
            <div style={{textAlign: 'center', padding: '2rem 0'}}>
              <div className="stat-number" style={{fontSize: '3rem', marginBottom: '0.5rem'}}>TBD</div>
              <p style={{color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem'}}>Per person</p>
              <p style={{fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)'}}>Scholarships available for exceptional builders</p>
            </div>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '3rem'}}>
          <a href="mailto:atlas@mcgillventures.com?subject=Atlas Application" className="btn btn-primary">Apply Now</a>
        </div>
      </section>

      <section className="reveal" style={{textAlign: 'center', padding: '8rem 2rem', position: 'relative', overflow: 'hidden', minHeight: '60vh'}}>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '35rem', opacity: 0.04, zIndex: -1, pointerEvents: 'none'}}>⛰️</div>
        <h2 style={{fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'white', position: 'relative', zIndex: 1}}>Montreal's coming to Toronto.</h2>
        <p style={{fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1}}>And we're making it count.</p>
      </section>

      <footer>
        <div className="footer-content" style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4rem', alignItems: 'start'}}>
          <div className="footer-section">
            <h3 style={{fontFamily: 'Syne, sans-serif', fontSize: '2rem', marginBottom: '1.5rem', color: 'white'}}>Project Atlas</h3>
            <p style={{fontSize: '1.1rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.9)'}}>Montreal to Toronto Tech Week.</p>
            <p style={{fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem'}}>May 25-31, 2025</p>
            <a href="mailto:atlas@mcgillventures.com" style={{color: 'rgba(255,255,255,0.7)', fontSize: '1rem'}}>atlas@mcgillventures.com</a>
          </div>

          <div className="footer-section">
            <h3>socials</h3>
            <a href="https://linkedin.com/company/mcgill-ventures" target="_blank" rel="noopener noreferrer">linkedin</a>
            <a href="https://twitter.com/mcgillventures" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://instagram.com/mcgillventures" target="_blank" rel="noopener noreferrer">instagram</a>
          </div>

          <div className="footer-section">
            <h3>site map</h3>
            <a href="#apply">apply</a>
            <a href="#timeline">timeline</a>
            <a href="mailto:atlas@mcgillventures.com?subject=Partnership Inquiry">partner with us</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 McGill Ventures. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default ProjectAtlas;
