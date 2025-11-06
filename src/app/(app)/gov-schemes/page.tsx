import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark } from "lucide-react";

const schemes = [
  {
    title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
    description: "A flagship scheme of the Government of India to provide free access to healthcare for low-income earners in the country. Beneficiaries get a health insurance cover of up to Rs. 5 lakh per family per year.",
  },
  {
    title: "e-Sanjeevani",
    description: "A national telemedicine service that offers tele-consultations, enabling patient-to-doctor consultations from the comfort of their homes.",
  },
  {
    title: "Nikshay Poshan Yojana (NPY)",
    description: "A direct benefit transfer (DBT) scheme under the National TB Elimination Programme (NTEP) which provides nutritional support to TB patients.",
  },
];

export default function GovSchemesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Government Health Schemes
        </h1>
        <p className="mt-2 text-muted-foreground">
          Learn about and connect with public health initiatives.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {schemes.map((scheme) => (
          <Card key={scheme.title}>
            <CardHeader>
              <CardTitle className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <Landmark className="h-6 w-6 text-primary" />
                </div>
                <span>{scheme.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{scheme.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button disabled>
                Connect (Coming Soon)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
