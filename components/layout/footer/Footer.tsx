"use client"

import { CircleDollarSign } from 'lucide-react'
import { FooterLinks } from './FooterLinks'
import { FooterNewsletter } from './FooterNewsletter'
import { FooterSocial } from './FooterSocial'
import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                    <div className="space-y-8">
                        <div>
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <CircleDollarSign className="h-6 w-6 text-primary" />
                                <span className="font-bold text-xl">InquireA</span>
                            </Link>
                            <p className="text-muted-foreground max-w-md">
                                A blockchain-powered Q&A platform where knowledge meets rewards.
                                Ask questions, provide valuable answers, and earn tokens.
                            </p>
                        </div>
                        <FooterLinks />
                    </div>

                    <div className="space-y-8">
                        <FooterNewsletter />
                        <div className="space-y-4">
                            <h3 className="font-semibold">Connect With Us</h3>
                            <FooterSocial />
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} InquireA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}