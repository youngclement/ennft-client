"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/lib/data/mock-courses";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "featured";
}

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatPrice = (_price: number) => {
    return "Free";
  };

  if (variant === "featured") {
    return (
      <Card className="group overflow-hidden transition-all duration-300 bg-background hover:bg-accent/50 shadow-lg hover:shadow-2xl rounded-xl border border-border hover:border-primary/30 hover:-translate-y-2 h-full flex flex-col">
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-white/80 text-sm line-clamp-1">
                {course.instructor.name}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-muted-foreground">({course.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && (
                <span className="text-muted-foreground line-through">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>
            <Button asChild>
              <Link href={`/elearning/${course.id}`}>View Course</Link>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 bg-background hover:bg-accent/50 shadow-sm hover:shadow-lg rounded-lg border border-border hover:border-primary/20 hover:-translate-y-1 h-full flex flex-col">
      <Link href={`/elearning/${course.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-background/80 backdrop-blur-sm border-border">
              {course.level}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-2">
            {course.instructor.name}
          </p>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {course.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} className="text-xs border-border">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">Free</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
