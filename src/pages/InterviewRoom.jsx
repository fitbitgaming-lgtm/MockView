import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, X, Mic, MicOff, Send, Play, Lightbulb, Code2, MessageCircle } from 'lucide-react'

const chatMessages = [
  { role: 'ai', text: "Welcome to your Technical Interview for Google SWE. Let's begin with a data structures question." },
  { role: 'ai', text: 'Given an array of integers, find two numbers that add up to a specific target. What approach would you use?' },
  { role: 'user', text: 'I would use a hash map to store complements as I iterate through the array.' },
  { role: 'ai', text: 'Good thinking! Can you walk me through the time and space complexity of that approach?' },
]

function Waveform() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, height: 60 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          style={{ width: 3, borderRadius: 2, background: 'var(--color-accent)' }}
          animate={{ height: [4, Math.random() * 28 + 6, 4] }}
          transition={{ duration: 1 + Math.random() * 0.8, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}

function Timer({ timeLeft, total }) {
  const r = 36, c = 2 * Math.PI * r, p = (timeLeft / total) * c
  return (
    <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto' }}>
      <svg width="96" height="96" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-border)" strokeWidth="4" />
        <motion.circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray={c} animate={{ strokeDashoffset: c - p }} transition={{ duration: 0.5 }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-1)' }}>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
        <span style={{ fontSize: 10, color: 'var(--color-text-3)' }}>remaining</span>
      </div>
    </div>
  )
}

export default function InterviewRoom({ theme }) {
  const navigate = useNavigate()
  const dk = theme === 'dark'
  const [mic, setMic] = useState(true)
  const [time, setTime] = useState(2340)
  const [code, setCode] = useState(`def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Example
print(two_sum([2, 7, 11, 15], 9))`)

  useEffect(() => {
    const t = setInterval(() => setTime(p => p > 0 ? p - 1 : 0), 1000)
    return () => clearInterval(t)
  }, [])

  const bd = '1px solid var(--color-border)'

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-surface)' }}>
      {/* Top Bar */}
      <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: bd, background: 'var(--color-surface-2)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-text-1)' }}>MockView</span>
          <div style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 8px' }} />
          <span style={{ fontSize: 14, color: 'var(--color-text-2)' }}>Technical Interview — Google SWE</span>
        </div>
        <button onClick={() => navigate('/results')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: '#fff', background: '#EF4444', border: 'none', cursor: 'pointer' }}>
          <X size={16} /> End Session
        </button>
      </div>

      {/* 3 Columns */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT 20% */}
        <div style={{ width: '20%', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, borderRight: bd, flexShrink: 0, overflowY: 'auto' }}>
          {/* Webcam */}
          <div style={{ width: '100%', maxWidth: 160, aspectRatio: '1', borderRadius: 16, border: `3px solid var(--color-accent)`, background: dk ? '#1a1a2e' : '#f0f0f5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>A</div>
            <div style={{ position: 'absolute', bottom: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: mic ? '#10B981' : '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {mic ? <Mic size={12} color="#fff" /> : <MicOff size={12} color="#fff" />}
            </div>
          </div>

          {/* AI Avatar */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 8px', background: `linear-gradient(135deg, ${dk ? '#3B82F6' : '#0066FF'}, ${dk ? '#8B5CF6' : '#6366F1'})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={28} color="#fff" />
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-1)' }}>AI Interviewer</div>
            <div style={{ fontSize: 10, color: 'var(--color-accent)' }}>● Speaking</div>
          </div>

          <Waveform />

          <button onClick={() => setMic(!mic)}
            style={{ width: 48, height: 48, borderRadius: '50%', border: 'none', cursor: 'pointer', background: mic ? 'var(--color-accent)' : '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {mic ? <Mic size={20} color="#fff" /> : <MicOff size={20} color="#fff" />}
          </button>
          <span style={{ fontSize: 10, color: 'var(--color-text-3)' }}>{mic ? 'Mic On' : 'Mic Off'}</span>
        </div>

        {/* CENTER 55% */}
        <div style={{ width: '55%', padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Question */}
          <div style={{ background: 'var(--color-surface-2)', border: bd, borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, fontWeight: 500, background: dk ? '#1E3A5F' : '#E6F0FF', color: 'var(--color-accent)' }}>Data Structures</span>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, fontWeight: 500, background: dk ? '#7F1D1D' : '#FEE2E2', color: '#EF4444' }}>Hard</span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-1)', margin: '0 0 8px' }}>Two Sum Problem</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-2)', margin: 0 }}>
              Given an array of integers <code style={{ padding: '2px 6px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace', background: 'var(--color-surface-3)' }}>nums</code> and
              an integer <code style={{ padding: '2px 6px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace', background: 'var(--color-surface-3)' }}>target</code>, return
              indices of the two numbers such that they add up to target.
            </p>
          </div>

          {/* Textarea */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)', display: 'block', marginBottom: 8 }}>Your Explanation</label>
            <textarea rows={4} placeholder="Explain your approach here..."
              style={{ width: '100%', borderRadius: 12, padding: 16, fontSize: 14, resize: 'none', border: bd, background: 'var(--color-surface-2)', color: 'var(--color-text-1)', outline: 'none', fontFamily: 'inherit' }} />
          </div>

          {/* Code Editor */}
          <div style={{ borderRadius: 16, border: bd, overflow: 'hidden', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'var(--color-surface-3)', borderBottom: bd }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Code2 size={16} color="var(--color-accent)" />
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-1)' }}>Code Editor</span>
              </div>
              <select style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: bd, background: 'var(--color-surface-2)', color: 'var(--color-text-1)', outline: 'none' }}>
                <option>Python</option><option>JavaScript</option><option>Java</option><option>C++</option>
              </select>
            </div>
            <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false}
              style={{ width: '100%', height: 200, padding: 16, fontSize: 13, fontFamily: '"Fira Code", "Cascadia Code", monospace', resize: 'none', border: 'none', background: dk ? '#0D0D0D' : '#FAFAFA', color: dk ? '#E4E4E7' : '#18181B', outline: 'none' }} />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 500, border: bd, background: 'var(--color-surface-3)', color: 'var(--color-text-1)', cursor: 'pointer' }}>
              <Play size={16} /> Run Code
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 500, border: 'none', background: 'var(--color-accent)', color: '#fff', cursor: 'pointer' }}>
              <Send size={16} /> Submit Answer
            </button>
          </div>
        </div>

        {/* RIGHT 25% */}
        <div style={{ width: '25%', display: 'flex', flexDirection: 'column', borderLeft: bd, flexShrink: 0 }}>
          {/* Chat */}
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <MessageCircle size={14} color="var(--color-text-2)" />
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)' }}>Conversation</span>
            </div>
            {chatMessages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  maxWidth: '90%', padding: '10px 14px', borderRadius: 16, fontSize: 12, lineHeight: 1.5,
                  alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end',
                  background: m.role === 'ai' ? 'var(--color-surface-3)' : 'var(--color-accent)',
                  color: m.role === 'ai' ? 'var(--color-text-1)' : '#fff',
                  borderBottomLeftRadius: m.role === 'ai' ? 4 : 16,
                  borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                }}>
                {m.text}
              </motion.div>
            ))}
          </div>

          {/* Timer + Progress */}
          <div style={{ padding: 16, borderTop: bd, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Timer timeLeft={time} total={2700} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-accent)' }}>Q3</span>
                <span style={{ fontSize: 14, color: 'var(--color-text-3)' }}>/ 10</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                <motion.div style={{ height: '100%', borderRadius: 3, background: 'var(--color-accent)' }} initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ duration: 1 }} />
              </div>
            </div>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0', borderRadius: 12, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', background: dk ? '#78350F' : '#FEF3C7', color: '#F59E0B' }}>
              <Lightbulb size={16} /> Get Hint
            </button>
          </div>
        </div>
      </div>

      {/* Live Strip */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, borderTop: bd, background: 'var(--color-surface-2)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="live-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#EF4444' }}>LIVE</span>
        </div>
        <div style={{ width: 1, height: 16, background: 'var(--color-border)' }} />
        <p style={{ fontSize: 12, color: 'var(--color-text-2)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          I would approach this problem by using a hash map to store the complement of each number...
        </p>
      </div>
    </div>
  )
}
