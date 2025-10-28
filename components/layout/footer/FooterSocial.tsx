"use client"

import { Button } from '@/components/ui/button'
import { Github, Twitter } from 'lucide-react'

const socials = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },

]

export function FooterSocial() {
    return (
        <div className="flex gap-2">
            {socials.map((social) => (
                <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    asChild
                >
                    <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                    >
                        <social.icon className="h-5 w-5" />
                    </a>
                </Button>
            ))}
        </div>
    )
}