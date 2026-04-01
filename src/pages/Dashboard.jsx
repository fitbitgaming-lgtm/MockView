import { motion } from 'framer-motion'
import { TrendingUp, Target, Flame, Star, Code, Users, Briefcase, Cpu, ChevronRight, Calendar, BarChart3, ExternalLink } from 'lucide-react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import Sidebar from '../components/Sidebar'
import ThemeToggle from '../components/ThemeToggle'

const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  score: Math.floor(55 + Math.random() * 35 + i * 0.5),
}))

const stats = [
  { label: 'Sessions', value: '24', icon: BarChart3, color: '#0066FF', bg: '#E6F0FF', dbg: '#1E3A5F' },
  { label: 'Avg Score', value: '78%', icon: Target, color: '#10B981', bg: '#D1FAE5', dbg: '#064E3B' },
  { label: 'Streak', value: '7d', icon: Flame, color: '#F59E0B', bg: '#FEF3C7', dbg: '#78350F' },
  { label: 'XP', value: '2,400', icon: Star, color: '#8B5CF6', bg: '#EDE9FE', dbg: '#4C1D95' },
]

const quickStart = [
  { label: 'Technical', desc: 'DSA & Coding', icon: Code, color: '#0066FF', bg: '#E6F0FF', dbg: '#1E3A5F', dur: '45 min' },
  { label: 'Behavioral', desc: 'STAR Method', icon: Users, color: '#10B981', bg: '#D1FAE5', dbg: '#064E3B', dur: '30 min' },
  { label: 'HR Round', desc: 'Culture Fit', icon: Briefcase, color: '#F59E0B', bg: '#FEF3C7', dbg: '#78350F', dur: '20 min' },
  { label: 'System Design', desc: 'Architecture', icon: Cpu, color: '#8B5CF6', bg: '#EDE9FE', dbg: '#4C1D95', dur: '60 min' },
]

const sessions = [
  { company: 'Google', role: 'Software Engineer L4', score: 87, date: 'Mar 28, 2026', logo: 'G' },
  { company: 'Meta', role: 'Frontend Engineer E5', score: 72, date: 'Mar 25, 2026', logo: 'M' },
  { company: 'Amazon', role: 'SDE II', score: 91, date: 'Mar 22, 2026', logo: 'A' },
  { company: 'Apple', role: 'iOS Engineer', score: 68, date: 'Mar 20, 2026', logo: 'Ap' },
  { company: 'Microsoft', role: 'SWE II', score: 83, date: 'Mar 18, 2026', logo: 'Ms' },
]

const card = { background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 16 }

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ ...card, padding: '8px 12px', fontSize: 13 }}>
      <div style={{ fontWeight: 600, color: 'var(--color-text-1)' }}>Day {label}</div>
      <div style={{ color: 'var(--color-accent)' }}>Score: {payload[0].value}%</div>
    </div>
  )
}

function scoreBg(s, dark) {
  if (s >= 80) return dark ? '#064E3B' : '#D1FAE5'
  if (s >= 60) return dark ? '#78350F' : '#FEF3C7'
  return dark ? '#7F1D1D' : '#FEE2E2'
}
function scoreColor(s) {
  if (s >= 80) return '#10B981'
  if (s >= 60) return '#F59E0B'
  return '#EF4444'
}

export default function Dashboard({ theme, toggle }) {
  const dk = theme === 'dark'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-surface)' }}>
      <Sidebar />
      <main style={{ marginLeft: 72, flex: 1, padding: 32, maxWidth: 1400 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-1)', margin: 0 }}>Good morning, Arjun 👋</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-2)', marginTop: 4 }}>Ready to crush another interview?</p>
          </div>
          <ThemeToggle theme={theme} toggle={toggle} />
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {stats.map((s) => (
            <motion.div key={s.label} whileHover={{ y: -4 }} style={{ ...card, padding: 20, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: dk ? s.dbg : s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={20} color={s.color} />
                </div>
                <TrendingUp size={16} color="#10B981" />
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-1)' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-2)', marginTop: 2 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart + Quick Start */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 32 }}>
          {/* Chart */}
          <div style={{ ...card, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-1)' }}>Score Trend</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-2)', marginTop: 2 }}>Last 30 days performance</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 500, background: dk ? '#064E3B' : '#D1FAE5', color: '#10B981' }}>
                <TrendingUp size={14} /> +12%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={dk ? '#3B82F6' : '#0066FF'} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={dk ? '#3B82F6' : '#0066FF'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={dk ? '#262626' : '#F0F0F0'} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: dk ? '#71717A' : '#9CA3AF' }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fontSize: 11, fill: dk ? '#71717A' : '#9CA3AF' }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="score" stroke={dk ? '#3B82F6' : '#0066FF'} strokeWidth={2.5} fill="url(#sg)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Start */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-1)', marginBottom: 4 }}>Quick Start</div>
            {quickStart.map((q) => (
              <motion.div key={q.label} whileHover={{ x: 4 }}
                style={{ ...card, padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: dk ? q.dbg : q.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <q.icon size={20} color={q.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-1)' }}>{q.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-2)' }}>{q.desc}</div>
                </div>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: dk ? q.dbg : q.bg, color: q.color }}>{q.dur}</span>
                <ChevronRight size={16} color="var(--color-text-3)" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ ...card, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-1)' }}>Recent Sessions</div>
            <button style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ExternalLink size={13} />
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['Company', 'Role', 'Score', 'Date', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 24px', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-text-3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i} style={{ borderBottom: i < sessions.length - 1 ? '1px solid var(--color-border-light)' : 'none' }}>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: dk ? '#1F1F1F' : '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>{s.logo}</div>
                      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-1)' }}>{s.company}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: 14, color: 'var(--color-text-2)' }}>{s.role}</td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: scoreBg(s.score, dk), color: scoreColor(s.score) }}>{s.score}%</span>
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: 13, color: 'var(--color-text-3)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={13} /> {s.date}</span>
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <button style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, background: dk ? 'var(--color-surface-3)' : 'var(--color-surface)', color: 'var(--color-accent)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  )
}
