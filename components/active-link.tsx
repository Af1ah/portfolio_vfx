"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface ActiveLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

export default function ActiveLink({
  href,
  children,
  className = "",
  activeClassName = "text-primary font-medium",
  onClick,
}: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn("transition-colors hover:text-primary", isActive ? activeClassName : "", className)}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

