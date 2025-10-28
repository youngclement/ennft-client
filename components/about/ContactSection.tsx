'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Mail,
  MessageSquare,
  Github,
  Twitter,
  ArrowRight,
  CheckCircle,
  Youtube,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[40%] h-[60%] rounded-full bg-zinc-200/50 dark:bg-zinc-800/30 blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-zinc-200/50 dark:bg-zinc-800/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Our team
              is always ready to assist.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full"
            >
              <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg h-full flex flex-col">
                <div className="bg-white dark:bg-zinc-950 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-xl font-semibold">Send Us a Message</h3>
                </div>
                <div className="p-6 flex-grow">
                  {!isSubmitted ? (
                    <form
                      className="space-y-5 h-full flex flex-col"
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="border-zinc-300 dark:border-zinc-700 focus-visible:ring-zinc-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          className="border-zinc-300 dark:border-zinc-700 focus-visible:ring-zinc-500"
                          required
                        />
                      </div>
                      <div className="space-y-2 flex-grow flex flex-col">
                        <Label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us what you need..."
                          className="flex-grow min-h-[150px] h-full border-zinc-300 dark:border-zinc-700 focus-visible:ring-zinc-500"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Send Message
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 h-full flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-zinc-900 dark:text-white" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        Thank you for reaching out. We'll get back to you
                        shortly.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                        className="border-zinc-300 dark:border-zinc-700"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-full"
            >
              <Card className="border border-zinc-200 dark:border-zinc-800 shadow-lg h-full">
                <div className="bg-white dark:bg-zinc-950 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-xl font-semibold">Connect With Us</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {contactLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                          {React.cloneElement(link.icon, {
                            className:
                              'h-5 w-5 text-zinc-700 dark:text-zinc-300',
                          })}
                        </div>
                        <div>
                          <div className="font-medium">{link.label}</div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            {link.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Additional content to balance height */}
                  <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-4">
                      <h4 className="font-medium mb-2">Office Hours</h4>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                        <p>Monday - Friday: 9AM - 6PM EST</p>
                        <p>Saturday: 10AM - 2PM EST</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

const contactLinks = [
  {
    icon: <Mail />,
    label: 'Email Us',
    value: 'support@devforum.com',
    href: 'mailto:support@devforum.com',
  },
  {
    icon: <MessageSquare />,
    label: 'Discord',
    value: 'Join our server',
    href: '#',
  },
  {
    icon: <Github />,
    label: 'GitHub',
    value: 'Follow our projects',
    href: '#',
  },
  {
    icon: <Twitter />,
    label: 'Twitter',
    value: 'Stay updated',
    href: '#',
  },
  {
    icon: <Youtube />,
    label: 'YouTube',
    value: 'Watch tutorials',
    href: '#',
  },
];
