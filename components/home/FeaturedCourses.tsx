'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { mockCourses } from "@/lib/data/mock-courses"

export function FeaturedCourses() {
    // Get first 3 courses for featured section
    const featuredCourses = mockCourses.slice(0, 3)

    return (
        <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-primary">Courses</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Master Solana development with our comprehensive courses designed for all skill levels
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
                    {featuredCourses.map((course) => (
                        <Card key={course.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg h-full flex flex-col">
                            <div className="relative">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-primary/90 text-primary-foreground">
                                        {course.level}
                                    </Badge>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-background/80 backdrop-blur-sm border-border">
                                        {course.category}
                                    </Badge>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{course.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{course.students.toLocaleString()}</span>
                                    </div>
                                </div>

                                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                    {course.subtitle}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{course.duration}min</span>
                                    </div>
                                    <span className="font-bold text-lg">${course.price}</span>
                                </div>

                                <div className="flex flex-wrap gap-1 mt-3 mb-4">
                                    {course.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} className="text-xs border-border">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <Link href={`/elearning/${course.id}`} className="w-full">
                                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                                        <BookOpen className="h-4 w-4 mr-2" />
                                        View Course
                                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/elearning">
                        <Button className="group px-6 py-3">
                            View All Courses
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
