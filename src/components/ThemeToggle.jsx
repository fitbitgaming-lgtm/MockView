import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      style={{
        position: 'relative',
        width: 56, height: 28,
        borderRadius: 14,
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface-3)',
        cursor: 'pointer',
        padding: 2,
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        style={{
          width: 24, height: 24, borderRadius: '50%',
          background: 'var(--color-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        animate={{ x: theme === 'dark' ? 26 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? <Moon size={14} color="#fff" /> : <Sun size={14} color="#fff" />}
      </motion.div>
    </button>
  )
}
