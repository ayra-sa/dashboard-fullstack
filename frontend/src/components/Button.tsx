import clsx from 'clsx'
import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: "primary" | "secondary"
}

const Button: FC<ButtonProps> = ({children, variant = "primary", ...props}) => {
  const buttonClass = clsx(
    "px-5 py-3 rounded-md transition-all duration-300",
    variant === "primary" && "bg-slate-800 text-white hover:bg-slate-600",
    variant === "secondary" && "bg-transparent border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white",
  )
  return (
    <button className={buttonClass} {...props}>{children}</button>
  )
}

export default Button