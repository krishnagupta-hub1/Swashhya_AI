"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Loader2, Hospital } from "lucide-react";

export default function EmergencyTriagePage() {
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
        <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>This is NOT a substitute for emergency services.</AlertTitle>
            <AlertDescription>
                If you are experiencing a medical emergency, please call your local emergency number (e.g., 112 in India) immediately.
            </AlertDescription>
        </Alert>

        <Card>
            <CardHeader>
            <CardTitle>Emergency Triage Support</CardTitle>
            <CardDescription>
                Briefly describe the critical symptoms to get guidance on immediate steps and nearest facilities.
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <Textarea
                    placeholder="e.g., 'Severe chest pain radiating to left arm', 'Difficulty breathing', 'Uncontrolled bleeding'"
                    rows={4}
                    />

                    {showResult && (
                        <Alert>
                            <Hospital className="h-4 w-4" />
                            <AlertTitle>Immediate Action Required!</AlertTitle>
                            <AlertDescription>
                                The symptoms described may indicate a serious condition. Please do not delay seeking medical help.
                                <ul className="mt-2 list-disc pl-5">
                                    <li><strong>Nearest Hospital:</strong> City General Hospital, 123 Health St. (approx. 5km away)</li>
                                    <li><strong>Contact:</strong> Call emergency services at 112.</li>
                                    <li><strong>Action:</strong> If possible, have someone drive you to the emergency room. Do not attempt to drive yourself.</li>
                                </ul>
                                <p className="mt-2 text-xs">Note: This is a simulated response. Real-time location services are under development.</p>
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardContent>
                    <Button type="submit" variant="destructive" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Symptoms...
                        </>
                    ) : (
                        "Get Emergency Guidance"
                    )}
                    </Button>
                </CardContent>
            </form>
        </Card>
    </div>
  );
}
