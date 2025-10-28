"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function FooterNewsletter() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle newsletter subscription
        console.log('Subscribe:', email)
        setEmail('')
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-muted-foreground">
                Get the latest updates on new features and community highlights
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="max-w-[240px]"
                    required
                />
                <Button type="submit">Subscribe</Button>
            </form>
        </div>
    )
}