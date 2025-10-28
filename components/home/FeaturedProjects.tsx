"use client"

import BentoGrid from '@/components/kokonutui/bento-grid'
import { motion } from 'framer-motion'
import { Github, Code, Globe, Heart, Ship, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function FeaturedProjects() {
  const projectItems = projects.map(project => ({
    title: project.title,
    description: project.description,
    icon: getProjectIcon(project.technologies[0]),
    status: project.featured ? "Featured" : undefined,
    tags: project.technologies,
    meta: getProjectMeta(project),
    cta: project.url ? (
      <Link href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
        View Project <ExternalLink className="ml-1 h-3 w-3" />
      </Link>
    ) : null,
    colSpan: project.featured ? 2 : 1,
    hasPersistentHover: project.featured,
    image: project.image ? (
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl opacity-10 transition-opacity group-hover:opacity-15">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    ) : null
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <p className="text-muted-foreground">Discover projects built by our community</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <BentoGrid items={projectItems} />
      </motion.div>

      <div className="mt-6 flex justify-end">
        <Link href="/projects" className="text-sm text-primary hover:underline">
          View all projects
        </Link>
      </div>
    </div>
  )
}

// Helper function to determine icon based on technology
function getProjectIcon(technology: string) {
  switch (technology.toLowerCase()) {
    case 'nft':
    case 'gacha':
      return <Code className="w-4 h-4 text-purple-500" />;
    case 'crowdfunding':
      return <Heart className="w-4 h-4 text-red-500" />;
    case 'blockchain':
    case 'maritime':
      return <Ship className="w-4 h-4 text-blue-500" />;
    case 'next.js':
      return <Code className="w-4 h-4 text-black dark:text-white" />;
    default:
      return <Globe className="w-4 h-4 text-sky-500" />;
  }
}

// Helper function to create meta text
function getProjectMeta(project: typeof projects[0]) {
  return project.url ? "Live Demo" : "";
}

const projects = [
  {
    title: "Mysteria",
    description: "Experience the thrill of NFT gacha with Mysteria. Summon rare artifacts, upgrade your collection, and discover legendary treasures in our mystical realm.",
    technologies: ["NFT", "Gacha", "Next.js"],
    url: "https://wt-mysteria.vercel.app/",
    featured: true,
    image: "https://i.ibb.co/zVwJkYym/image.png"
  },
  {
    title: "Heart Give",
    description: "Online Crowdfunding Platform for fundraising projects from verified organizations.",
    technologies: ["Crowdfunding", "Next.js", "Payments"],
    url: "https://heart-give.vercel.app/",
    featured: false,
    image: "https://i.ibb.co/F4GwMrqt/image.png"
  },
  {
    title: "Transocean",
    description: "The experts in maritime logistics. Blockchain-powered vessel tracking and verification. Moving 12 million containers every year with complete transparency.",
    technologies: ["Blockchain", "Maritime", "Logistics"],
    url: "https://transocean.vercel.app/",
    featured: false,
    image: "https://i.ibb.co/4gtRpCPJ/image.png"
  }
]