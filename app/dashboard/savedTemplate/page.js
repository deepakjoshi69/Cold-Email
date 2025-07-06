"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Loader2, FolderHeart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "components/ui/button";

export default function SavedTemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  function formatDate(dateString) {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    async function fetchTemplates() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("/api/templates");
        const data = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to fetch templates", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FolderHeart className="h-16 w-16 text-purple-300 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No templates found</h3>
      <p className="text-gray-500 max-w-md">
        Try adjusting your search or create a new template to get started.
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-600 font-medium animate-pulse">
          Loading your templates...
        </p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const goTemplate = async () => {
    router.push("/dashboard");
  };
  return (
    <div className="w-full pt-32 pb-16 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Saved Templates
        </h1>
        <p className="text-gray-600">
          Access and manage your collection of templates
        </p>
        <div className="flex justify-start lg:justify-end">
          <Button
            onClick={goTemplate}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            Go Back
          </Button>
        </div>
      </div>

      {templates.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {templates.map((template) => (
            <motion.div key={template.id} variants={item}>
              <Card
                onClick={() =>
                  router.push(`/dashboard/templates/${template.id}`)
                }
                className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-purple-200 transition-all duration-300 h-full shadow-2xl"
              >
                <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {template.name}
                  </CardTitle>
                  <span className="w-fit inline-flex items-center px-2.5 py-0.5 rounded-full text-m font-medium bg-purple-200 text-purple-800">
                    {template.category}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-gray-600">
                    {template.description || "No description provided."}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      Created At: {formatDate(template.createdAt)}
                    </span>
                    <span className="text-purple-600 font-medium">
                      View template →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
