import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, MessageSquare, HelpCircle, User, Settings, Zap } from 'lucide-react'

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: MessageSquare, label: 'Interviews', to: '/interview' },
  { icon: HelpCircle, label: 'Questions', to: '#' },
  { icon: User, label: 'Profile', to: '#' },
  { icon: Settings, label: 'Settings', to: '#' },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        width: 72,
        minHeight: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 0',
        background: 'var(--color-surface-2)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* Logo */}
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: 'var(--color-accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 40,
      }}>
        <Zap size={20} color="#fff" />
      </div>

      {/* Nav Items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', padding: '0 12px', flex: 1 }}>
        {nav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 0',
              borderRadius: 12,
              textDecoration: 'none',
              background: isActive ? 'var(--color-accent-light)' : 'transparent',
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-3)',
              transition: 'all 0.2s',
            })}
          >
            <item.icon size={20} />
          </NavLink>
        ))}
      </nav>

      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        background: 'var(--color-accent)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 600,
      }}>
        A
      </div>
    </motion.aside>
  )
}
