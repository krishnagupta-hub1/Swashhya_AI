"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { getWellnessPlan } from "@/app/actions";
import type { WellnessPlanOutput } from "@/ai/flows/personalized-wellness-plans";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Leaf, PersonStanding } from "lucide-react";

const formSchema = z.object({
  age: z.coerce.number().min(1, "Age is required").max(120),
  healthConditions: z.string().min(1, "Please list any health conditions or 'none'."),
  location: z.string().min(1, "Location is required."),
});

export default function WellnessPlanPage() {
  const [plan, setPlan] = useState<WellnessPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      healthConditions: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPlan(null);
    try {
      const response = await getWellnessPlan(values);
      if (response.success && response.data) {
        setPlan(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate wellness plan. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Create Your Wellness Plan</CardTitle>
          <CardDescription>
            Fill in your details to get a personalized Yoga & Ayurveda plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 35" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="healthConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Conditions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Back pain, stress' or 'None'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Uttarakhand, India'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Plan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8 lg:col-span-2">
        {isLoading && (
            <div className="flex h-full min-h-96 items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Generating your personalized plan...</p>
                </div>
            </div>
        )}
        {plan && (
          <>
            <Card>
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <PersonStanding className="h-8 w-8 text-primary" />
                <CardTitle>Your Personalized Yoga Plan</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-card-foreground">
                <p>{plan.yogaPlan}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Sparkles className="h-8 w-8 text-primary" />
                <CardTitle>Ayurveda Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-card-foreground">
                <p>{plan.ayurvedaRecommendations}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Leaf className="h-8 w-8 text-primary" />
                <CardTitle>Recommended Local Herbs</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-card-foreground">
                <p>{plan.localHerbs}</p>
              </CardContent>
            </Card>
          </>
        )}
        {!isLoading && !plan && (
            <div className="flex h-full min-h-96 items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                    <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Your plan will appear here once generated.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
