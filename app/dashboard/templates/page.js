"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Loader2, Wand2, Save } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

export default function TemplatesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    category: "marketing",
    description: "",
    content: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateTemplate = async () => {
    if (!formData.instructions) {
      toast({
        title: "Instructions required",
        description: "Please provide instructions for the AI to generate your template",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/generate-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: formData.category,
          instructions: formData.instructions,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("API error response:", errorText);
        throw new Error(`Failed to generate template: ${response.status}`);
      }

      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        name: data.name || prev.name,
        content: data.content || prev.content,
      }));

      toast({
        title: "Template generated",
        description: "Your template has been generated successfully",
      });
    } catch (error) {
      console.log("Error generating template:", error.message);
      toast({
        title: "Generation failed",
        description: "Failed to generate template. Please check your API key or try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const saveTemplate = async () => {
    const userId = user?.id;
  
    if (!formData.name || !formData.content || !userId) {
      toast({
        title: "Missing Fields",
        description: "Template name, content, and user ID are required!",
        variant: "destructive",
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          name: formData.name,
          category: formData.category || "General",
          description: formData.description || "",
          content: formData.content,
        }),
      });
  
      const data = await response.json();
  
      console.log("Server Response:", data);
      if (!response.ok) {
        throw new Error(data.error || "Failed to save template");
      }
  
      toast({
        title: "Template Saved",
        description: "Your template has been saved successfully!",
      });
  
      router.refresh();
    } catch (error) {
      console.error("Save Error:", error.message);
      toast({
        title: "Save Failed",
        description: error.message || "Could not save template",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pt-6 px-6">
      <div className=" relative flex justify-end top-20">
        <Button
          onClick={() => router.back()}
          variant="destructive"
          className="mb-4"
        >
          Go Back
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-400">AI Template Creator</h1>
        <p className="text-muted-foreground">Create reusable email templates with AI assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 col-span-1 bg-gradient-to-r from-white to-gray-100 shadow-lg border border-gray-200">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700">Template Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="outreach">Outreach</SelectItem>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions" className="text-gray-700">Instructions</Label>
              <Textarea
                id="instructions"
                name="instructions"
                placeholder="Describe what you want in your template..."
                rows={5}
                value={formData.instructions}
                onChange={handleChange}
                className="bg-white text-gray-700"
              />
            </div>

            <Button
              onClick={generateTemplate}
              disabled={generating || !formData.instructions}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white"
            >
              {generating ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Wand2 className="mr-2 h-4 w-4" /> Generate Template</>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6 col-span-1 lg:col-span-2 bg-gradient-to-r from-white to-gray-100 shadow-lg border border-gray-200">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Template Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter a name for your template"
                value={formData.name}
                onChange={handleChange}
                className="bg-white text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700">Description (Optional)</Label>
              <Input
                id="description"
                name="description"
                placeholder="Brief description of this template"
                value={formData.description}
                onChange={handleChange}
                className="bg-white text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-700">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Your template content will appear here after generation..."
                rows={12}
                value={formData.content}
                onChange={handleChange}
                className="bg-white text-gray-700"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={saveTemplate}
                disabled={loading || !formData.name || !formData.content}
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="mr-2 h-4 w-4" /> Save Template</>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
