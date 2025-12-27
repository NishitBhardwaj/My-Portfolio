"use client";

import { useState } from "react";
import { MissionHeader, MissionSidebar } from "@/components/mission/MissionLayout";
import SystemsOnline from "@/components/mission/SystemsOnline";
import SkillTelemetry from "@/components/mission/SkillTelemetry";
import ArchitectureMap from "@/components/mission/ArchitectureMap";
import EngineeringLogs from "@/components/mission/EngineeringLogs";
import MissionObjectives from "@/components/mission/MissionObjectives";
import ProjectMissions from "@/components/mission/ProjectMissions";
import ContactControlRoom from "@/components/mission/ContactControlRoom";
import GalaxyBackground from "@/components/GalaxyBackground";

export default function MissionPage() {
    const [activeSection, setActiveSection] = useState("services");

    return (
        <div className="min-h-screen flex flex-col">
            {/* Background */}
            <GalaxyBackground />

            {/* Header */}
            <MissionHeader />

            {/* Main Layout */}
            <div className="flex flex-1 relative z-10">
                {/* Sidebar - Hidden on mobile */}
                <div className="hidden lg:block">
                    <MissionSidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        {/* Section 1: Systems Online */}
                        <SystemsOnline />

                        {/* Section 2: Tech Telemetry */}
                        <SkillTelemetry />

                        {/* Section 3: Architecture Map */}
                        <ArchitectureMap />

                        {/* Section 4: Engineering Logs */}
                        <EngineeringLogs />

                        {/* Section 5: Mission Objectives */}
                        <MissionObjectives />

                        {/* Section 6: Project Missions */}
                        <ProjectMissions />

                        {/* Section 7: Contact Control Room */}
                        <ContactControlRoom />
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-cosmic-dark/90 backdrop-blur-md border-t border-terminal-border p-2 flex justify-around z-50">
                <a href="/" className="flex flex-col items-center text-gray-400 hover:text-neon-cyan">
                    <span className="text-xl">🏠</span>
                    <span className="text-xs font-mono">Home</span>
                </a>
                <a href="/story" className="flex flex-col items-center text-gray-400 hover:text-neon-cyan">
                    <span className="text-xl">📖</span>
                    <span className="text-xs font-mono">Story</span>
                </a>
                <a href="/game" className="flex flex-col items-center text-gray-400 hover:text-neon-cyan">
                    <span className="text-xl">🎮</span>
                    <span className="text-xs font-mono">Game</span>
                </a>
                <a href="/map" className="flex flex-col items-center text-gray-400 hover:text-neon-cyan">
                    <span className="text-xl">🗺️</span>
                    <span className="text-xs font-mono">Map</span>
                </a>
            </nav>
        </div>
    );
}
