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
  activeClassName = "active",
  onClick,
}: ActiveLinkProps) {
  const pathname = usePathname()

  // Ensure pathname is not null
  const isActive = pathname ? pathname === href || (href !== "/" && pathname.startsWith(href)) : false

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

