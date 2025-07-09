"use client"

export default function Button({ children, variant = "primary", onClick, className = "", ...props }) {
  const variantClasses = {
    primary: "bg-[#F5B93F] text-black",
    secondary: "bg-[#3a3359] text-white",
    danger: "bg-red-500 text-white",
    cancel: "bg-[#6c7280] text-white",
  }

  return (
    <button
      className={`px-3 py-2 rounded text-sm md:text-base ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
