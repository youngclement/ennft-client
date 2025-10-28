'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function TeamSection() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-16">Meet Our Team</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <div className="text-center mb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {member.bio}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const team = [
  {
    name: 'Kaitou',
    role: 'Founder',
    avatar:
      'https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/480569149_2307681339613484_2584926306904048632_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHrq2nd14qSrb-UfXFoWNIlDszkwEMGFoAOzOTAQwYWgGJiWlA2Nioi6uxewmsNDAvhBJTR6xwFPAh1oKRE5ZAB&_nc_ohc=xui9o3R0ZwYQ7kNvgHRQ0bo&_nc_oc=AdgdwCofP8tuYFQYLppBE7LgIh0xf8S7_10ASZ5rgi8O1hMwGgQE3livlC8Aob2QLcQ&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=ABXT8flu7ErN9nMb1zjKn7J&oh=00_AYAG69PzvgrIDUWaM24jKY8S8sWjnGLm3xGqRZ-sNzBVeQ&oe=67CF2819',
    skills: ['Blockchain', 'Architecture', 'Leadership'],
    bio: 'Blockchain architect and leader with deep expertise in Web3 systems and decentralized applications.',
  },
  {
    name: 'Young Clément',
    role: 'Founder',
    avatar:
      'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-1/456714820_1059790055754047_4820507436651044929_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHI3shsCuoTHaPW9xOdjN7_ePGIqUQ-jst48YipRD6Oy_pWo49IfbONG5k4lWfW08od0tMCwzyiMeuiMr7Bfy4o&_nc_ohc=E4LhksQNmRUQ7kNvgGcKoLV&_nc_oc=AdhigtPLYp2zbIUgYa8Y0O5OGjIAjFemtQAwjgpzSMHaOpQ9ACb8_PBuY6ESOSoiZm8&_nc_zt=24&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=Afos0Wpfemmgf1ZSEYPecsU&oh=00_AYBRNDnrIfUo70ih1kqegV-hebNlLCeCJqxWdnRctXYo1w&oe=67CF1AF5',
    skills: ['Frontend', 'UI/UX', 'Creative'],
    bio: 'Frontend developer and UI/UX specialist, creating seamless and user-friendly Web3 experiences.',
  },
];
