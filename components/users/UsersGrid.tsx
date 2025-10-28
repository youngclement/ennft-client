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
    name: 'Kaitou',
    title: 'Blockchain Architect & Founder',
    reputation: 20000,
    answers: 412,
    solutions: 360,
    tags: ['Blockchain', 'Architecture', 'Leadership'],
    avatar:
      'https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/480569149_2307681339613484_2584926306904048632_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHrq2nd14qSrb-UfXFoWNIlDszkwEMGFoAOzOTAQwYWgGJiWlA2Nioi6uxewmsNDAvhBJTR6xwFPAh1oKRE5ZAB&_nc_ohc=xui9o3R0ZwYQ7kNvgHRQ0bo&_nc_oc=AdgdwCofP8tuYFQYLppBE7LgIh0xf8S7_10ASZ5rgi8O1hMwGgQE3livlC8Aob2QLcQ&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=ABXT8flu7ErN9nMb1zjKn7J&oh=00_AYAG69PzvgrIDUWaM24jKY8S8sWjnGLm3xGqRZ-sNzBVeQ&oe=67CF2819',
  },
  {
    id: '2',
    name: 'Young Clément',
    title: 'Frontend Architect & UI/UX Expert',
    reputation: 17500,
    answers: 290,
    solutions: 245,
    tags: ['Frontend', 'UI/UX', 'Creative'],
    avatar:
      'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-1/456714820_1059790055754047_4820507436651044929_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHI3shsCuoTHaPW9xOdjN7_ePGIqUQ-jst48YipRD6Oy_pWo49IfbONG5k4lWfW08od0tMCwzyiMeuiMr7Bfy4o&_nc_ohc=E4LhksQNmRUQ7kNvgGcKoLV&_nc_oc=AdhigtPLYp2zbIUgYa8Y0O5OGjIAjFemtQAwjgpzSMHaOpQ9ACb8_PBuY6ESOSoiZm8&_nc_zt=24&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=Afos0Wpfemmgf1ZSEYPecsU&oh=00_AYBRNDnrIfUo70ih1kqegV-hebNlLCeCJqxWdnRctXYo1w&oe=67CF1AF5',
  },
];
