"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function EmailGenerator() {
  const router = useRouter();
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    emailType: "marketing",
    tone: "professional",
    content: "",
    instructions: "",
  });

  useEffect(() => {
    const draft = localStorage.getItem("email-draft");
    if (draft) {
      setFormData(JSON.parse(draft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("email-draft", JSON.stringify(formData));
  }, [formData]);

  const handleGoBack = () => {
    const confirmLeave = confirm(
      "Your email will not be saved if you go back. Are you sure?"
    );
    if (confirmLeave) {
      localStorage.removeItem("email-draft");
      router.push("/dashboard");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateEmail = async () => {
    if (!formData.instructions) {
      toast.error("Instructions required", {
        description:
          "Please provide instructions for the AI to generate your email",
      });
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: formData.emailType,
          instructions: formData.instructions,
          tone: formData.tone,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate email");

      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        subject: data.subject || prev.subject,
        content: data.content || prev.content,
      }));

      toast.success("Email generated", {
        description: "Your email has been generated successfully",
      });
    } catch (error) {
      console.error("Error generating email:", error);
      toast.error("Generation failed", {
        description: "Check your API key or network connection.",
      });
    } finally {
      setGenerating(false);
    }
  };

  const goTemplate = async () => {
    router.push("/dashboard/savedTemplate");
  };
  const handleClick = async () => {
    if (saved) {
      toast.info("Template Already Saved");
      return;
    }

    setIsSaving(true);
    toast.info("Please wait", {
      description: "Saving your template...",
    });

    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,
          name: formData.subject || "Untitled",
          category: formData.emailType,
          description: formData.instructions || "",
          content: formData.content,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Template saved successfully");
      setSaved(true);
    } catch (err) {
      toast.error("Error saving template");
    } finally {
      setIsSaving(false);
    }
  };

  const CreateAnother = async () => {
    setFormData({
      recipient: "",
      subject: "",
      emailType: "marketing",
      tone: "professional",
      instructions: "",
      content: "",
    });
    setSaved(false);
    localStorage.removeItem("email-draft");
  };

  return (
    <div className="max-w-7xl mx-2 px-4 py-8 mt-16">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            AI Email Generator
          </h1>
        </div>
        <p className="text-gray-500">
          Create perfectly crafted emails in seconds with AI assistance
        </p>
      <div className="relative">
      <Button
      onClick={goTemplate}
       className="absolute right-[-230px] bottom-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
       >
       Go To Templates
                </Button>
      </div>
      </div>

      <div className="flex w-screen gap-6">
        <Card className="w-[60vw] bg-white border border-gray-400 rounded-xl p-6 shadow-sm ">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-gray-950 font-bold">
                Recipient
              </Label>
              <Input
                id="recipient"
                name="recipient"
                placeholder="recipient@example.com"
                value={formData.recipient}
                onChange={handleChange}
                className="bg-white text-gray-700 hover:border-green-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-950 font-bold">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Email subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-white text-gray-700 hover:border-green-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-950 font-bold">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Generated email content here..."
                rows={12}
                value={formData.content}
                onChange={handleChange}
                className="bg-white text-gray-700 hover:border-green-400"
              />
            </div>
          </div>
        </Card>
        <Card className="w-[30vw] bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="space-y-5">
         
            <div className="space-y-2">
              <Label htmlFor="emailType" className="text-gray-700 font-medium">
                Email Type
              </Label>
              <Select
                value={formData.emailType}
                onValueChange={(value) =>
                  handleSelectChange("emailType", value)
                }
              >
                <SelectTrigger className="bg-white text-gray-700 hover:border-green-400">
                  <SelectValue placeholder="Select email type" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-700 hover:border-green-400">
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="thank-you">Thank You</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone" className="text-gray-700 font-bold">
                Tone
              </Label>
              <Select
                value={formData.tone}
                onValueChange={(value) => handleSelectChange("tone", value)}
              >
                <SelectTrigger className="bg-white text-gray-700 hover:border-green-400">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-700 hover:border-green-400">
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions" className="text-gray-900 font-bold">
                Instructions
              </Label>
              <Textarea
                id="instructions"
                name="instructions"
                placeholder="What should the AI write?"
                rows={5}
                value={formData.instructions}
                onChange={handleChange}
                className="bg-white text-gray-700 hover:border-green-400"
              />
            </div>

            <Button
              onClick={generateEmail}
              disabled={generating || !formData.instructions}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating
                  From Ai
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Email
                </>
              )}
            </Button>

            {formData.subject && formData.content && (
              <div className="flex justify-between">
                <Button
                  onClick={handleGoBack}
                  className="bg-red-500 hover:bg-red-600 text-white p-5"
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleClick}
                  disabled={isSaving}
                  className={`${
                    isSaving || saved
                      ? "bg-green-900 hover:bg-green-900"
                      : "bg-green-500 hover:bg-green-800"
                  } text-white transition`}
                >
                  {saved ? (
                    "Template Saved"
                  ) : isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Save Template"
                  )}
                </Button>

                <Button
                  onClick={CreateAnother}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  Create Another
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
