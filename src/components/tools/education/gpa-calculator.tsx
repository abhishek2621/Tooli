"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Calculator, GraduationCap, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Course {
    id: string;
    name: string;
    credits: number;
    grade: number;
}

const GRADE_POINTS: Record<string, number> = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
};

export function GpaCalculator() {
    const [courses, setCourses] = useState<Course[]>([
        { id: "1", name: "Course 1", credits: 3, grade: 4.0 },
        { id: "2", name: "Course 2", credits: 3, grade: 3.0 },
        { id: "3", name: "Course 3", credits: 4, grade: 3.7 },
        { id: "4", name: "Course 4", credits: 2, grade: 4.0 },
    ]);
    const [gpa, setGpa] = useState<number>(0);
    const [totalCredits, setTotalCredits] = useState<number>(0);

    const calculateGPA = () => {
        let totalPoints = 0;
        let credits = 0;

        courses.forEach(course => {
            if (course.credits > 0) {
                totalPoints += course.grade * course.credits;
                credits += course.credits;
            }
        });

        setTotalCredits(credits);
        setGpa(credits > 0 ? totalPoints / credits : 0);
    };

    useEffect(() => {
        calculateGPA();
    }, [courses]);

    const addCourse = () => {
        setCourses([...courses, {
            id: Math.random().toString(36).substr(2, 9),
            name: `Course ${courses.length + 1}`,
            credits: 3,
            grade: 4.0
        }]);
    };

    const removeCourse = (id: string) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id: string, field: keyof Course, value: any) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const reset = () => {
        setCourses([
            { id: "1", name: "Course 1", credits: 3, grade: 4.0 },
            { id: "2", name: "Course 2", credits: 3, grade: 3.0 },
            { id: "3", name: "Course 3", credits: 4, grade: 3.7 },
        ]);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden border-none shadow-md">
                    <CardHeader className="bg-primary/5 pb-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                Course Details
                            </CardTitle>
                            <Button variant="ghost" size="sm" onClick={reset}>
                                <RefreshCcw className="w-4 h-4 mr-2" /> Reset
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="p-4 grid grid-cols-12 gap-4 bg-muted/30 font-medium text-sm text-muted-foreground border-b">
                            <div className="col-span-5 md:col-span-6 pl-2">Course Name</div>
                            <div className="col-span-3 md:col-span-2 text-center">Grade</div>
                            <div className="col-span-3 md:col-span-3 text-center">Credits</div>
                            <div className="col-span-1"></div>
                        </div>

                        <div className="divide-y">
                            {courses.map((course) => (
                                <div key={course.id} className="grid grid-cols-12 gap-4 p-4 items-center animate-in fade-in">
                                    <div className="col-span-5 md:col-span-6">
                                        <Input
                                            value={course.name}
                                            onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                                            placeholder="Subject name"
                                            className="border-transparent hover:border-input focus:border-input transition-colors"
                                        />
                                    </div>
                                    <div className="col-span-3 md:col-span-2">
                                        <Select
                                            value={course.grade.toString()}
                                            onValueChange={(v) => updateCourse(course.id, "grade", parseFloat(v))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(GRADE_POINTS).map(([label, point]) => (
                                                    <SelectItem key={label} value={point.toString()}>
                                                        {label} ({point})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-3 md:col-span-3">
                                        <Input
                                            type="number"
                                            min="0"
                                            max="20"
                                            value={course.credits}
                                            onChange={(e) => updateCourse(course.id, "credits", parseFloat(e.target.value) || 0)}
                                            className="text-center"
                                        />
                                    </div>
                                    <div className="col-span-1 text-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeCourse(course.id)}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t">
                            <Button onClick={addCourse} variant="secondary" className="w-full border-dashed border-2 bg-transparent hover:bg-primary/5 border-muted-foreground/20">
                                <Plus className="w-4 h-4 mr-2" /> Add Course
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Result Section */}
            <div>
                <Card className="sticky top-24 shadow-lg border-primary/20">
                    <CardHeader className="bg-primary text-primary-foreground rounded-t-xl">
                        <CardTitle className="text-center flex items-center justify-center gap-2">
                            <Calculator className="w-5 h-5" /> GPA Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 text-center space-y-6">
                        <div>
                            <div className="text-6xl font-black tracking-tighter text-primary">
                                {gpa.toFixed(2)}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">
                                Cumulative GPA
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                            <div className="space-y-1">
                                <div className="text-2xl font-bold">{totalCredits}</div>
                                <div className="text-xs text-muted-foreground">Total Credits</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold">{courses.length}</div>
                                <div className="text-xs text-muted-foreground">Total Courses</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
