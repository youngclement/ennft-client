'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Award, Zap, Target, ArrowRight } from "lucide-react"
import Link from "next/link"

export function NFTShowcase() {
    const nftRewards = [
        {
            id: "course-completion",
            title: "Course Master",
            description: "Complete any course successfully",
            icon: Trophy,
            rarity: "Common",
            color: "from-blue-500 to-blue-600",
            benefits: ["Certificate of Completion", "Achievement Badge", "Portfolio Showcase"]
        },
        {
            id: "challenge-victor",
            title: "Challenge Victor",
            description: "Solve coding challenges with perfect scores",
            icon: Award,
            rarity: "Rare",
            color: "from-purple-500 to-purple-600",
            benefits: ["Exclusive Developer Badge", "Priority Support", "Mentorship Access"]
        },
        {
            id: "speed-demon",
            title: "Speed Demon",
            description: "Complete challenges in record time",
            icon: Zap,
            rarity: "Epic",
            color: "from-orange-500 to-red-500",
            benefits: ["Lightning Badge", "Speed Records", "Community Recognition"]
        },
        {
            id: "mentor-elite",
            title: "Mentor Elite",
            description: "Help 100+ learners successfully",
            icon: Target,
            rarity: "Legendary",
            color: "from-yellow-400 to-yellow-600",
            benefits: ["Mentor NFT", "Revenue Share", "Exclusive Community Access"]
        }
    ]

    return (
        <section className="py-24 bg-gradient-to-b from-secondary/5 to-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Earn <span className="text-primary">NFT Rewards</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Showcase your Solana development skills with exclusive NFTs. Complete courses, solve challenges, and help others to earn unique digital collectibles.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {nftRewards.map((nft) => {
                        const IconComponent = nft.icon
                        return (
                            <Card key={nft.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg relative">
                                <div className="absolute top-4 right-4">
                                    <Badge className={`bg-gradient-to-r ${nft.color} text-white text-xs font-medium`}>
                                        {nft.rarity}
                                    </Badge>
                                </div>

                                <CardContent className="p-6 text-center">
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${nft.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="h-8 w-8 text-white" />
                                    </div>

                                    <h3 className="font-semibold text-lg mb-2">{nft.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        {nft.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        {nft.benefits.map((benefit, index) => (
                                            <div key={index} className="text-xs text-muted-foreground flex items-center justify-center">
                                                <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                                                {benefit}
                                            </div>
                                        ))}
                                    </div>

                                    <Link href="/elearning/challenges" className="w-full">
                                        <Button size="sm" className="w-full group-hover:bg-primary/90 transition-colors">
                                            Start Earning
                                            <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <div className="bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Join thousands of developers learning Solana. Start with our beginner courses, tackle coding challenges, and earn NFTs that showcase your expertise.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/elearning">
                            <Button size="lg" className="group">
                                Browse Courses
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/elearning/challenges">
                            <Button size="lg" variant="outline" className="group">
                                Try Challenges
                                <Target className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
