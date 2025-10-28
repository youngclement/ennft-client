'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Code2, Database, Shield, Cpu } from 'lucide-react';

export function TechnologyStack() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-foreground/90 mb-12">
        Our Technology Stack
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full flex flex-col items-center text-center border border-border rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <tech.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {tech.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tech.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const technologies = [
  {
    name: 'Next.js & React',
    description: 'Modern frontend framework for optimal performance and SEO',
    icon: Code2,
  },
  {
    name: 'Supabase',
    description: 'Scalable database with real-time capabilities',
    icon: Database,
  },
  {
    name: 'Smart Contracts',
    description: 'Secure token distribution and rewards system',
    icon: Shield,
  },
  {
    name: 'AI Integration',
    description: 'Advanced answer quality validation',
    icon: Cpu,
  },
];
