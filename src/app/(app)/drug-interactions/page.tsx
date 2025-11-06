"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info, Loader2 } from "lucide-react";

export default function DrugInteractionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Drug Interaction Alerts</CardTitle>
          <CardDescription>
            Check for potential interactions between Allopathic and Ayurvedic medicines.
            <br />
            <strong>Disclaimer:</strong> Always consult a healthcare professional before making any changes to your medication.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="allopathic">Allopathic Medicines</Label>
              <Textarea
                id="allopathic"
                placeholder="e.g., 'Aspirin, Metformin'"
                rows={3}
              />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="ayurvedic">Ayurvedic Medicines</Label>
              <Textarea
                id="ayurvedic"
                placeholder="e.g., 'Ashwagandha, Giloy'"
                rows={3}
              />
            </div>

            {showResult && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Feature Coming Soon!</AlertTitle>
                <AlertDescription>
                  Our AI-powered drug interaction analysis is currently under development. Please check back later. For now, always consult with your doctor or pharmacist about potential interactions.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardContent>
             <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Check for Interactions"
              )}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
