'use client';

import { useParams } from 'next/navigation';
import { useState, useRef, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Upload,
    Camera,
    MapPin,
    Calendar,
    Award,
    BookOpen,
    Trophy,
    Star,
    Edit3,
    Save,
    X,
    Mail,
    Link as LinkIcon,
    Github,
    Twitter,
    Linkedin,
    Globe,
    ChevronLeft,
    MessageCircleCode
} from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { mockCourses } from '@/lib/data/mock-courses';

interface UserProfile {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    location?: string;
    website?: string;
    email?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
    reputation: number;
    level: number;
    badges: any[];
    stats: any;
    joinedAt: string;
    lastActive: string;
    isOnline: boolean;
    enrolledCourses: string[];
    completedCourses: string[];
}

export default function UserProfilePage() {
    const params = useParams();
    const userId = params.id as string;
    const { publicKey, connected } = useWallet();

    // Use connected wallet address if available, otherwise use URL param
    const walletAddress = publicKey?.toBase58() || userId;

    // Generate random avatar based on wallet address (same as other components)
    const randomAvatar = useMemo(() => {
        if (!walletAddress) return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face';
        // Use wallet address to generate consistent random seed
        const seed = walletAddress.slice(-8);
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    }, [walletAddress]);

    const userProfile: UserProfile = useMemo(() => ({
        id: walletAddress,
        username: walletAddress,
        displayName: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
        avatar: randomAvatar,
        bio: 'Passionate developer building the future of Web3 and decentralized applications.',
        location: 'San Francisco, CA',
        website: 'https://example.com',
        email: 'user@example.com',
        github: 'githubuser',
        twitter: 'twitteruser',
        linkedin: 'linkedinuser',
        reputation: Math.floor(Math.random() * 500) + 100, // Random reputation between 100-600
        level: Math.floor(Math.random() * 20) + 5, // Random level between 5-25
        badges: [],
        stats: {
            questionsAsked: Math.floor(Math.random() * 100) + 10,
            answersGiven: Math.floor(Math.random() * 300) + 50,
            questionsSolved: Math.floor(Math.random() * 200) + 30,
            coursesCompleted: Math.floor(Math.random() * 10) + 1,
            challengesCompleted: Math.floor(Math.random() * 20) + 5,
            certificatesEarned: Math.floor(Math.random() * 8) + 1,
            followers: Math.floor(Math.random() * 200) + 20,
            following: Math.floor(Math.random() * 100) + 10,
        },
        joinedAt: '2023-01-15T00:00:00Z',
        lastActive: new Date().toISOString(),
        isOnline: true,
        enrolledCourses: ['1', '2', '3'],
        completedCourses: ['1', '2'],
    }), [walletAddress, randomAvatar, connected]);

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(userProfile);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // In real app, save to backend
        setProfileData(prev => ({
            ...prev,
            ...profileData,
            avatar: imagePreview || profileData.avatar
        }));
        setIsEditing(false);
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleCancel = () => {
        setProfileData(userProfile);
        setIsEditing(false);
        setSelectedImage(null);
        setImagePreview(null);
    };

    const enrolledCourses = mockCourses.filter(course =>
        userProfile.enrolledCourses.includes(course.id)
    );

    const completedCourses = mockCourses.filter(course =>
        userProfile.completedCourses.includes(course.id)
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Back Navigation */}
            <div className="bg-muted/30 border-b border-border">
                <div className="container mx-auto px-4 py-3">
                    <Link href="/users" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Community
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <Card className="p-6">
                            <div className="text-center">
                                {/* Avatar with Upload */}
                                <div className="relative inline-block mb-4">
                                    <Avatar className="w-24 h-24 mx-auto">
                                        <AvatarImage
                                            src={imagePreview || profileData.avatar}
                                            alt={profileData.displayName}
                                        />
                                        <AvatarFallback className="text-2xl">
                                            {profileData.displayName.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    {isEditing && (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>

                                <h1 className="text-2xl font-bold mb-2">{profileData.displayName}</h1>
                                <p className="text-muted-foreground mb-4 font-mono text-sm">{profileData.username}</p>

                                {/* Online Status */}
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${profileData.isOnline
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                                        }`}>
                                        <span className={`w-2 h-2 rounded-full mr-1 ${profileData.isOnline ? 'bg-green-500' : 'bg-gray-500'
                                            }`} />
                                        {profileData.isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>

                                {/* Reputation & Level */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">{profileData.reputation}</div>
                                        <div className="text-sm text-muted-foreground">Reputation</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">{profileData.level}</div>
                                        <div className="text-sm text-muted-foreground">Level</div>
                                    </div>
                                </div>

                                {/* Edit/Save Buttons */}
                                {isEditing ? (
                                    <div className="flex gap-2 justify-center">
                                        <Button onClick={handleSave} size="sm">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save
                                        </Button>
                                        <Button onClick={handleCancel} variant="outline" size="sm">
                                            <X className="h-4 w-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)} variant="outline">
                                        <Edit3 className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </Card>

                        {/* Contact Information */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                {isEditing ? (
                                    <>
                                        <div>
                                            <Label htmlFor="displayName">Wallet Address</Label>
                                            <Input
                                                id="displayName"
                                                value={profileData.displayName}
                                                disabled
                                                className="bg-muted/50 cursor-not-allowed"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">Wallet address cannot be changed</p>
                                        </div>
                                        <div>
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={profileData.location || ''}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="website">Website</Label>
                                            <Input
                                                id="website"
                                                value={profileData.website || ''}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {profileData.bio && (
                                            <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                                        )}
                                        {profileData.location && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span>{profileData.location}</span>
                                            </div>
                                        )}
                                        {profileData.website && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Globe className="h-4 w-4 text-muted-foreground" />
                                                <a href={profileData.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                                    {profileData.website}
                                                </a>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>Joined {new Date(profileData.joinedAt).toLocaleDateString()}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Card>

                        {/* Stats Card */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Activity Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-primary">{profileData.stats.questionsAsked}</div>
                                    <div className="text-xs text-muted-foreground">Questions</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-primary">{profileData.stats.answersGiven}</div>
                                    <div className="text-xs text-muted-foreground">Answers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-primary">{profileData.stats.coursesCompleted}</div>
                                    <div className="text-xs text-muted-foreground">Courses</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-primary">{profileData.stats.challengesCompleted}</div>
                                    <div className="text-xs text-muted-foreground">Challenges</div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="courses" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                                <TabsTrigger value="activity">Activity</TabsTrigger>
                                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                                <TabsTrigger value="badges">Badges</TabsTrigger>
                            </TabsList>

                            <TabsContent value="courses" className="space-y-6">
                                {/* Enrolled Courses */}
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        Enrolled Courses ({enrolledCourses.length})
                                    </h3>
                                    <div className="grid gap-4">
                                        {enrolledCourses.map((course) => (
                                            <div key={course.id} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                    <img
                                                        src={course.thumbnail}
                                                        alt={course.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold line-clamp-1">{course.title}</h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            {Math.floor(course.duration / 60)}h {course.duration % 60}m
                                                        </span>
                                                    </div>
                                                </div>
                                                <Link href={`/elearning/${course.id}`}>
                                                    <Button variant="outline" size="sm">View Course</Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                {/* Completed Courses */}
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Trophy className="h-5 w-5 text-yellow-500" />
                                        Completed Courses ({completedCourses.length})
                                    </h3>
                                    <div className="grid gap-4">
                                        {completedCourses.map((course) => (
                                            <div key={course.id} className="flex gap-4 p-4 border rounded-lg bg-green-50/50 dark:bg-green-950/20">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                    <img
                                                        src={course.thumbnail}
                                                        alt={course.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold line-clamp-1">{course.title}</h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs">
                                                            Completed
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            {Math.floor(course.duration / 60)}h {course.duration % 60}m
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="text-right">
                                                        <div className="text-sm font-medium text-green-600">Certificate Earned</div>
                                                        <div className="text-xs text-muted-foreground">Dec 15, 2024</div>
                                                    </div>
                                                    <Link href={`/elearning/${course.id}`}>
                                                        <Button variant="outline" size="sm">View Certificate</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="activity" className="space-y-6">
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                                <MessageCircleCode className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm">
                                                    Answered a question about <span className="font-medium">React hooks</span>
                                                </p>
                                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm">
                                                    Completed <span className="font-medium">Advanced React Patterns</span> course
                                                </p>
                                                <p className="text-xs text-muted-foreground">1 day ago</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-3 border rounded-lg">
                                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm">
                                                    Earned <span className="font-medium">Problem Solver</span> badge
                                                </p>
                                                <p className="text-xs text-muted-foreground">3 days ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="achievements" className="space-y-6">
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Achievements</h3>
                                    <div className="grid gap-4">
                                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                                                <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Course Master</h4>
                                                <p className="text-sm text-muted-foreground">Completed 5 courses</p>
                                                <p className="text-xs text-muted-foreground">Earned on Dec 10, 2024</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                                <MessageCircleCode className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Helpful Contributor</h4>
                                                <p className="text-sm text-muted-foreground">Provided 100 helpful answers</p>
                                                <p className="text-xs text-muted-foreground">Earned on Nov 25, 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="badges" className="space-y-6">
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Badges Earned</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                            </div>
                                            <h4 className="font-semibold text-sm">First Answer</h4>
                                            <p className="text-xs text-muted-foreground">Answered first question</p>
                                        </div>

                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            </div>
                                            <h4 className="font-semibold text-sm">Course Completer</h4>
                                            <p className="text-xs text-muted-foreground">Completed first course</p>
                                        </div>

                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <h4 className="font-semibold text-sm">Top Contributor</h4>
                                            <p className="text-xs text-muted-foreground">High reputation score</p>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
