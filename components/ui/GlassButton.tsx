import React from 'react'

interface GlassButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'outline'
  children: React.ReactNode
  href?: string
}

/**
 * GlassButton Component
 * 
 * A reusable button component with glassmorphism effect.
 * Uses Tailwind CSS for styling with backdrop-blur and semi-transparent backgrounds.
 * 
 * @param variant - 'default' (filled glass) or 'outline' (transparent border)
 * @param children - Button content (icons, text, etc.)
 * @param href - Optional link URL (renders as <a> tag)
 * @param className - Additional CSS classes
 */
export function GlassButton({
  variant = 'default',
  children,
  href,
  className = '',
  ...props
}: GlassButtonProps) {
  // Base styles applied to all variants
  const baseStyles = `
    inline-flex items-center justify-center gap-1.5
    px-3 py-1.5 rounded-full
    font-medium text-xs
    transition-all duration-300
    border border-white/10
    hover:scale-105 hover:shadow-lg
    active:scale-95
    cursor-pointer
  `.trim().replace(/\s+/g, ' ')

  // Variant-specific styles
  const variantStyles = {
    default: `
      bg-black/80 hover:bg-black/90
      text-white shadow-md
    `.trim().replace(/\s+/g, ' '),
    
    outline: `
      bg-black/70 hover:bg-black/80
      text-white/90 hover:text-white
    `.trim().replace(/\s+/g, ' ')
  }

  // Combine all class names
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

  // Render as anchor tag
  return (
    <a
      href={href}
      className={combinedClassName}
      {...props}
    >
      {children}
    </a>
  )
}
