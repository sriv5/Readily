import '../styles/Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const buttonClass = `btn btn--${variant} btn--${size} ${className}`.trim()

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
