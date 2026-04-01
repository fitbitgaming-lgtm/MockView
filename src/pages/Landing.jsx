import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, ArrowRight, Mic, Code2, Users, Cpu, Play, Check, Mail, MapPin, Phone, Globe, MessageCircle, Link2, Menu, X } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'

const features = [
  { icon: Mic, title: 'Voice Interview', desc: 'Real-time voice conversations with an AI interviewer that adapts to your responses.', color: '#0066FF', bg: '#E6F0FF', dbg: '#1E3A5F' },
  { icon: Code2, title: 'Code Review', desc: 'Write and run code in-browser with intelligent feedback on optimization and style.', color: '#10B981', bg: '#D1FAE5', dbg: '#064E3B' },
  { icon: Users, title: 'Behavioral Coach', desc: 'Practice STAR-method responses with real-time scoring and improvement tips.', color: '#F59E0B', bg: '#FEF3C7', dbg: '#78350F' },
  { icon: Cpu, title: 'System Design', desc: 'Tackle architecture challenges with guided diagrams and expert-level analysis.', color: '#8B5CF6', bg: '#EDE9FE', dbg: '#4C1D95' },
]

function StreamingText() {
  const full = 'I would approach this problem by first identifying the key constraints. Using a hash map gives us O(1) lookup time, which is optimal for this scenario...'
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (idx < full.length) {
      const t = setTimeout(() => { setText(p => p + full[idx]); setIdx(p => p + 1) }, 30 + Math.random() * 20)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => { setText(''); setIdx(0) }, 3000)
      return () => clearTimeout(t)
    }
  }, [idx])
  return (
    <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-1)', margin: 0 }}>
      {text}<motion.span style={{ display: 'inline-block', width: 2, height: 14, background: 'var(--color-accent)', marginLeft: 2, verticalAlign: 'middle' }} animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
    </p>
  )
}

function HeroWidget({ dk }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
      style={{ width: '100%', maxWidth: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Zap size={16} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-1)' }}>AI Interviewer</div>
          <div style={{ fontSize: 10, color: 'var(--color-accent)' }}>● Active</div>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ borderRadius: 12, padding: 14, marginBottom: 12, background: 'var(--color-surface-3)' }}>
          <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-1)', margin: 0 }}>
            "Given an array of integers, find the two numbers that add up to a specific target. What's your approach?"
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, height: 32, marginBottom: 12 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div key={i} style={{ width: 2, borderRadius: 1, background: 'var(--color-accent)' }}
              animate={{ height: [3, Math.random() * 16 + 4, 3] }} transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: i * 0.04 }} />
          ))}
        </div>
        <div style={{ borderRadius: 12, padding: 14, background: dk ? '#0F172A' : '#F8FAFC', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--color-accent)', marginBottom: 6 }}>Your Response</div>
          <StreamingText />
        </div>
      </div>
    </motion.div>
  )
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  )
}

export default function Landing({ theme, toggle }) {
  const navigate = useNavigate()
  const dk = theme === 'dark'
  const [mobileMenu, setMobileMenu] = useState(false)
  const links = ['Home', 'About', 'Demo', 'Contact']
  const bd = '1px solid var(--color-border)'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface)' }}>
      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: 'blur(20px)', background: dk ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)', borderBottom: bd }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-text-1)' }}>MockView</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-2)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ThemeToggle theme={theme} toggle={toggle} />
            <button onClick={() => navigate('/dashboard')}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 500, border: 'none', background: 'var(--color-accent)', color: '#fff', cursor: 'pointer' }}>
              Get Started <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" style={{ paddingTop: 128, paddingBottom: 80, padding: '128px 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 64 }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            style={{ flex: 1, maxWidth: 540 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, marginBottom: 24, background: dk ? '#1E3A5F' : '#E6F0FF', color: 'var(--color-accent)' }}>
              <Zap size={14} /> AI-Powered Interview Practice
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.15, margin: '0 0 20px', color: 'var(--color-text-1)' }}>
              Practice with an AI that thinks like a <span style={{ color: 'var(--color-accent)' }}>real interviewer</span>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 32, color: 'var(--color-text-2)' }}>
              Get personalized technical, behavioral, and system design interviews. Real-time feedback, detailed analytics, and a path to your dream job.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => navigate('/dashboard')}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600, border: 'none', background: 'var(--color-accent)', color: '#fff', cursor: 'pointer' }}>
                Get Started Free <ArrowRight size={16} />
              </button>
              <a href="#demo" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600, border: bd, background: 'var(--color-surface-2)', color: 'var(--color-text-1)', textDecoration: 'none', cursor: 'pointer' }}>
                <Play size={16} /> See Demo
              </a>
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 40, paddingTop: 32, borderTop: bd }}>
              {[{ v: '500+', l: 'Questions' }, { v: '50+', l: 'Companies' }, { v: '4', l: 'Interview Types' }, { v: '97%', l: 'AI Accuracy' }].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-1)' }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-3)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <HeroWidget dk={dk} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="demo" style={{ padding: '80px 24px', background: 'var(--color-surface-2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--color-accent)', marginBottom: 8 }}>Features</div>
              <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--color-text-1)', margin: '0 0 12px' }}>Everything you need to ace your interview</h2>
              <p style={{ fontSize: 14, color: 'var(--color-text-2)', maxWidth: 500, margin: '0 auto' }}>From coding challenges to behavioral questions, we've got you covered.</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }}
                  style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', border: bd, cursor: 'pointer', height: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: dk ? f.dbg : f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <f.icon size={24} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-1)', margin: '0 0 8px' }}>{f.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-2)', margin: 0 }}>{f.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--color-accent)', marginBottom: 8 }}>About MockView</div>
                <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--color-text-1)', margin: '0 0 20px' }}>Built by engineers, for engineers</h2>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-2)', margin: '0 0 16px' }}>
                  MockView was born from the frustration of generic interview prep. We're building an AI that doesn't just ask questions — it listens, adapts, and gives you the kind of honest feedback a real interviewer would.
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-2)', margin: '0 0 24px' }}>
                  Our question bank covers 50+ top tech companies including Google, Meta, Amazon, and Microsoft — with new questions added weekly.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {['Adaptive AI', 'Real-time Feedback', 'Detailed Analytics', 'Multi-format'].map(tag => (
                    <span key={tag} style={{ fontSize: 12, fontWeight: 500, padding: '6px 12px', borderRadius: 8, background: dk ? '#1E3A5F' : '#E6F0FF', color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Check size={12} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[{ v: '500+', l: 'Questions', c: '#0066FF' }, { v: '50+', l: 'Companies', c: '#10B981' }, { v: '4', l: 'Interview Types', c: '#F59E0B' }, { v: '97%', l: 'AI Accuracy', c: '#8B5CF6' }].map(s => (
                  <div key={s.l} style={{ padding: 20, borderRadius: 16, textAlign: 'center', background: 'var(--color-surface-2)', border: bd }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: s.c, marginBottom: 4 }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '80px 24px', background: 'var(--color-surface-2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--color-accent)', marginBottom: 8 }}>Contact Us</div>
                <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--color-text-1)', margin: '0 0 20px' }}>Get in touch</h2>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-2)', margin: '0 0 32px' }}>Have questions or feedback? We'd love to hear from you.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[{ icon: Mail, t: 'hello@mockview.ai' }, { icon: MapPin, t: 'San Francisco, CA' }, { icon: Phone, t: '+1 (555) 123-4567' }].map(c => (
                    <div key={c.t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: dk ? '#1E3A5F' : '#E6F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <c.icon size={16} color="var(--color-accent)" />
                      </div>
                      <span style={{ fontSize: 14, color: 'var(--color-text-1)' }}>{c.t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: 24, borderRadius: 16, background: 'var(--color-surface)', border: bd }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {['First Name', 'Last Name'].map(l => (
                      <div key={l}>
                        <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input style={{ width: '100%', padding: '10px 16px', borderRadius: 12, fontSize: 14, border: bd, background: 'var(--color-surface-2)', color: 'var(--color-text-1)', outline: 'none', fontFamily: 'inherit' }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)', display: 'block', marginBottom: 6 }}>Email</label>
                    <input type="email" placeholder="john@example.com"
                      style={{ width: '100%', padding: '10px 16px', borderRadius: 12, fontSize: 14, border: bd, background: 'var(--color-surface-2)', color: 'var(--color-text-1)', outline: 'none', fontFamily: 'inherit' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)', display: 'block', marginBottom: 6 }}>Message</label>
                    <textarea rows={4} placeholder="Your message..."
                      style={{ width: '100%', padding: '10px 16px', borderRadius: 12, fontSize: 14, border: bd, background: 'var(--color-surface-2)', color: 'var(--color-text-1)', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
                  </div>
                  <button style={{ width: '100%', padding: '12px 0', borderRadius: 12, fontSize: 14, fontWeight: 600, border: 'none', background: 'var(--color-accent)', color: '#fff', cursor: 'pointer' }}>
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', borderTop: bd }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={14} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-text-1)' }}>MockView</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>© 2026 MockView. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 12 }}>
            {[Globe, MessageCircle, Link2].map((Icon, i) => (
              <a key={i} href="#" style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-surface-2)', border: bd, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-2)', textDecoration: 'none' }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
