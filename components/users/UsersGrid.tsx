'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReputationBadge } from '@/components/features/ReputationBadge';
import Link from 'next/link';

export function UsersGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="p-6">
          <div className="text-center mb-4">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{user.title}</p>
            <ReputationBadge points={user.reputation} className="mx-auto" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {user.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div>
              <p className="font-semibold">{user.answers}</p>
              <p className="text-sm text-muted-foreground">Answers</p>
            </div>
            <div>
              <p className="font-semibold">{user.solutions}</p>
              <p className="text-sm text-muted-foreground">Solutions</p>
            </div>
          </div>

          <Button asChild className="w-full">
            <Link href={`/users/${user.id}`}>View Profile</Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}

const users = [
  {
    id: '1',
    name: 'Crypto Master',
    title: 'Blockchain Developer & DeFi Expert',
    reputation: 580,
    answers: 234,
    solutions: 156,
    tags: ['Blockchain', 'Smart Contracts', 'DeFi'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'React Queen',
    title: 'Frontend Architect & React Expert',
    reputation: 520,
    answers: 198,
    solutions: 134,
    tags: ['React', 'Frontend', 'JavaScript'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Data Sage',
    title: 'Data Scientist & ML Engineer',
    reputation: 480,
    answers: 171,
    solutions: 127,
    tags: ['Data Science', 'Machine Learning', 'Python'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Cyber Ninja',
    title: 'Cybersecurity Expert & Ethical Hacker',
    reputation: 420,
    answers: 145,
    solutions: 98,
    tags: ['Cybersecurity', 'Ethical Hacking', 'Security'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '5',
    name: 'DevOps Wizard',
    title: 'DevOps Engineer & Cloud Architect',
    reputation: 380,
    answers: 123,
    solutions: 89,
    tags: ['DevOps', 'AWS', 'Kubernetes'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '6',
    name: 'Mobile Master',
    title: 'Mobile App Developer & Flutter Expert',
    reputation: 340,
    answers: 98,
    solutions: 67,
    tags: ['Mobile', 'Flutter', 'iOS', 'Android'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  },
];
