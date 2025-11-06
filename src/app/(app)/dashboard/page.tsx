import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Leaf,
  Landmark,
  Siren,
  Smile,
  Stethoscope,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    title: 'AI Symptom Checker',
    description: 'Get a preliminary analysis of your symptoms with our AI, cross-referenced with AYUSH guidelines.',
    link: '/symptom-checker',
    icon: Stethoscope,
    imageId: 'symptom-checker',
  },
  {
    title: 'Personalized Wellness Plans',
    description: 'Receive custom Yoga and Ayurveda wellness plans based on your age, condition, and location.',
    link: '/wellness-plan',
    icon: Leaf,
    imageId: 'wellness-plan',
  },
  {
    title: 'Mental Health Support',
    description: 'Our AI analyzes your mood to provide stress-relief tips and compassionate support.',
    link: '/mental-health',
    icon: Smile,
    imageId: 'mental-health',
  },
  {
    title: 'Drug Interaction Alerts',
    description: 'Check for potential conflicts between Allopathic and Ayurvedic medicines.',
    link: '/drug-interactions',
    icon: Stethoscope,
    imageId: 'drug-interaction',
  },
  {
    title: 'Emergency Triage',
    description: 'Detects critical symptoms and provides guidance to the nearest medical facility.',
    link: '/emergency-triage',
    icon: Siren,
    imageId: 'emergency-triage',
  },
  {
    title: 'Government Schemes',
    description: 'Learn about and connect with health initiatives like Ayushman Bharat.',
    link: '/gov-schemes',
    icon: Landmark,
    imageId: 'gov-schemes',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          Welcome to Swasthya AI
        </h1>
        <p className="text-muted-foreground">
          Your intelligent health partner for a balanced life.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const placeholder = PlaceHolderImages.find(
            (p) => p.id === feature.imageId
          );
          return (
            <Card
              key={feature.title}
              className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <CardHeader className="flex-row items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {feature.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                {placeholder && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={placeholder.imageUrl}
                      alt={placeholder.description}
                      fill
                      className="object-cover"
                      data-ai-hint={placeholder.imageHint}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="secondary">
                  <Link href={feature.link}>
                    Get Started <ArrowRight className="ml-2 inline h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
