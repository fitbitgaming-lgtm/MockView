import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Award, Download, ArrowRight, ChevronDown, ChevronUp, Zap, MessageSquare, Shield, Layers, Target } from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

const overall = 84
const scores = [
  { label: 'Technical', value: 82, icon: Zap, color: '#0066FF' },
  { label: 'Communication', value: 88, icon: MessageSquare, color: '#10B981' },
  { label: 'Confidence', value: 79, icon: Shield, color: '#F59E0B' },
  { label: 'Structure', value: 91, icon: Layers, color: '#8B5CF6' },
  { label: 'Completeness', value: 76, icon: Target, color: '#EF4444' },
]
const radarData = scores.map(s => ({ subject: s.label, score: s.value, fullMark: 100 }))

const qaItems = [
  { q: 'Explain the difference between a hash map and a tree map.', score: 88, a: 'A hash map uses hashing to store key-value pairs with O(1) average lookup time, while a tree map uses a balanced BST with O(log n) operations but maintains sorted order.', fb: 'Excellent explanation covering time complexity and ordering. Could have mentioned real-world use cases.' },
  { q: 'How would you design a URL shortening service?', score: 82, a: 'I would use a base62 encoding scheme with a counter-based ID generator, backed by a distributed key-value store.', fb: 'Good approach with base62 encoding. Consider discussing collision handling and cache layers.' },
  { q: 'What is the time complexity of quicksort and when does it degrade?', score: 79, a: 'Average case O(n log n), worst case O(n²) when the pivot selection is poor.', fb: 'Correct analysis. Mentioning randomized pivot selection would strengthen the answer.' },
  { q: 'Implement a LRU Cache with O(1) operations.', score: 91, a: 'Use a doubly linked list combined with a hash map. The hash map provides O(1) access, and the linked list provides O(1) insertion/deletion.', fb: 'Perfect approach and implementation. Clean explanation of the data structure combination.' },
]

function Ring({ value, color, label, icon: Icon, delay }) {
  const r = 32, c = 2 * Math.PI * r, p = (value / 100) * c
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <svg width="80" height="80" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-border)" strokeWidth="5" />
          <motion.circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - p }} transition={{ delay: delay + 0.3, duration: 1 }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-1)' }}>{value}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={14} color={color} />
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)' }}>{label}</span>
      </div>
    </motion.div>
  )
}

function Confetti({ color, left, delay }) {
  return (
    <motion.div
      style={{ position: 'fixed', width: 10, height: 10, left: `${left}%`, top: -10, background: color, borderRadius: Math.random() > 0.5 ? '50%' : 2, zIndex: 100 }}
      initial={{ y: -10, rotate: 0, opacity: 1 }}
      animate={{ y: '100vh', rotate: 720, opacity: [1, 1, 0] }}
      transition={{ duration: 3 + Math.random() * 2, delay }}
    />
  )
}

export default function Results({ theme }) {
  const navigate = useNavigate()
  const dk = theme === 'dark'
  const [expanded, setExpanded] = useState(null)
  const [confetti, setConfetti] = useState(true)

  useEffect(() => { const t = setTimeout(() => setConfetti(false), 5000); return () => clearTimeout(t) }, [])

  const card = { background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 12 }
  const colors = ['#0066FF', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899', '#06B6D4']

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface)' }}>
      {confetti && overall > 80 && Array.from({ length: 40 }).map((_, i) => (
        <Confetti key={i} delay={Math.random() * 2} color={colors[Math.floor(Math.random() * colors.length)]} left={Math.random() * 100} />
      ))}

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        {/* Score Badge */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            style={{ width: 128, height: 128, borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `conic-gradient(var(--color-accent) ${overall * 3.6}deg, var(--color-surface-3) ${overall * 3.6}deg)` }}>
            <div style={{ width: 104, height: 104, borderRadius: '50%', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text-1)' }}>{overall}</span>
              <span style={{ fontSize: 10, color: 'var(--color-text-3)' }}>/100</span>
            </div>
          </motion.div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 20, background: dk ? '#064E3B' : '#D1FAE5', color: '#10B981' }}>
            <Award size={16} /> <span style={{ fontSize: 14, fontWeight: 600 }}>Great Performance</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-text-2)', marginTop: 12 }}>Technical Interview — Google SWE • Mar 28, 2026</p>
        </motion.div>

        {/* Score Rings */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 48, flexWrap: 'wrap' }}>
          {scores.map((s, i) => <Ring key={s.label} {...s} delay={0.4 + i * 0.1} />)}
        </motion.div>

        {/* Radar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ ...card, padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-1)', margin: '0 0 16px' }}>Skill Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: dk ? '#A1A1AA' : '#6B7280' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: dk ? '#71717A' : '#9CA3AF' }} />
              <Radar name="Score" dataKey="score" stroke={dk ? '#3B82F6' : '#0066FF'} fill={dk ? '#3B82F6' : '#0066FF'} fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Q&A */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-1)', margin: '0 0 8px' }}>Question Breakdown</h3>
          {qaItems.map((item, i) => (
            <div key={i} style={{ ...card, overflow: 'hidden' }}>
              <button onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', padding: '2px 8px', borderRadius: 4, background: 'var(--color-surface-3)', color: 'var(--color-text-2)', flexShrink: 0 }}>Q{i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.q}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, marginLeft: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 8,
                    background: item.score >= 85 ? (dk ? '#064E3B' : '#D1FAE5') : item.score >= 70 ? (dk ? '#78350F' : '#FEF3C7') : (dk ? '#7F1D1D' : '#FEE2E2'),
                    color: item.score >= 85 ? '#10B981' : item.score >= 70 ? '#F59E0B' : '#EF4444' }}>{item.score}%</span>
                  {expanded === i ? <ChevronUp size={16} color="var(--color-text-3)" /> : <ChevronDown size={16} color="var(--color-text-3)" />}
                </div>
              </button>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--color-border)' }}>
                      <div style={{ paddingTop: 16, marginBottom: 12 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-3)', marginBottom: 6 }}>Your Answer</div>
                        <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-1)' }}>{item.a}</div>
                      </div>
                      <div style={{ padding: 14, borderRadius: 12, background: dk ? '#422006' : '#FFFBEB', border: `1px solid ${dk ? '#78350F' : '#FDE68A'}` }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: '#F59E0B', marginBottom: 4 }}>AI Feedback</div>
                        <div style={{ fontSize: 14, lineHeight: 1.6, color: dk ? '#FDE68A' : '#92400E' }}>{item.fb}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 500, border: '1px solid var(--color-border)', background: 'var(--color-surface-2)', color: 'var(--color-text-1)', cursor: 'pointer' }}>
            <Download size={16} /> Download Report PDF
          </button>
          <button onClick={() => navigate('/interview')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 500, border: 'none', background: 'var(--color-accent)', color: '#fff', cursor: 'pointer' }}>
            Start New Interview <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
