"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Leaf,
    ChevronDown,
    Globe,
    Landmark,
    Menu,
    Siren,
    Smile,
    Stethoscope,
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { SwasthyaAiLogo } from "@/components/icons";

const navItems = [
    { href: "/dashboard", icon: Stethoscope, label: "Dashboard" },
    { href: "/symptom-checker", icon: Stethoscope, label: "Symptom Checker" },
    { href: "/wellness-plan", icon: Leaf, label: "Wellness Plans" },
    { href: "/mental-health", icon: Smile, label: "Mental Health" },
    { href: "/drug-interactions", icon: Stethoscope, label: "Drug Interactions" },
    { href: "/emergency-triage", icon: Siren, label: "Emergency Triage" },
    { href: "/gov-schemes", icon: Landmark, label: "Govt. Schemes" },
];

export const LanguageContext = React.createContext<{
    language: string;
    setLanguage: (lang: string) => void;
  }>({
    language: 'English',
    setLanguage: () => {},
  });
  

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [language, setLanguage] = useState('English');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center gap-2">
                            <SwasthyaAiLogo className="size-8" />
                            <span className="text-lg font-semibold">Swasthya AI</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        tooltip={item.label}
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <SidebarInset>
                    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-16 sm:px-6">
                        <SidebarTrigger className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </SidebarTrigger>

                        <div className="flex w-full items-center justify-end gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Globe className="mr-2 h-4 w-4" />
                                        {language}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setLanguage('English')}>English</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLanguage('हिन्दी (Hindi)')}>हिन्दी (Hindi)</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLanguage('বাংলা (Bengali)')}>বাংলা (Bengali)</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLanguage('தமிழ் (Tamil)')}>தமிழ் (Tamil)</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main className="flex-1 overflow-auto p-4 sm:p-6">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </LanguageContext.Provider>
    );
}
