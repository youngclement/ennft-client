"use client"

import Link from 'next/link'
import { MessageSquare, Tag, Trophy, Users, Info, Shield } from 'lucide-react'

const links = [
    {
        title: 'Platform',
        items: [
            { label: 'Questions', href: '/questions', icon: MessageSquare },
            { label: 'Tags', href: '/tags', icon: Tag },
            { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
            { label: 'Users', href: '/users', icon: Users },
        ]
    },
    {
        title: 'Company',
        items: [
            { label: 'About', href: '/about', icon: Info },
            { label: 'Privacy Policy', href: '/privacy', icon: Shield },
            { label: 'Terms of Service', href: '/terms', icon: Shield },
        ]
    }
]

export function FooterLinks() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {links.map((group) => (
                <div key={group.title}>
                    <h3 className="font-semibold mb-3">{group.title}</h3>
                    <ul className="space-y-2">
                        {group.items.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <item.icon className="h-4 w-4 mr-2" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}