"use client";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Mail, Sparkles, Clock, Zap, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in?redirect_url=/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12 space-y-6 mb-12 md:mb-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm mb-4">
            <Sparkles className="mr-2 h-5 w-5" />
            <span>Next Generation Email Experience</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            AI-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Email Creation
            </span>
          </h1>

          <p className="text-xl text-gray-600">
            Create perfectly crafted emails in seconds. Our AI understands
            context, tone, and purpose to help you communicate effectively.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 rounded-lg text-lg shadow-md"
              onClick={handleClick}
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            
          </div>

          <div className="pt-8 flex items-center space-x-8">
            <div className="flex -space-x-2 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-600"
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="text-gray-900 font-bold">4,000+</span>{" "}
              professionals use our platform daily
            </div>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <div className="bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-500">AI Email Generator</div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-2">Subject</div>
                <div className="text-gray-900 font-medium">
                  Project Update: Q2 Goals Achieved
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-2">Body</div>
                <div className="text-gray-700 space-y-3">
                  <p>Hi Team,</p>
                  <p>
                    I'm pleased to announce that we've successfully achieved our
                    Q2 goals. Thanks to everyone's hard work and dedication.
                  </p>
                  <p>Key highlights include...</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500 mb-2">Tone</div>
                <div className="flex space-x-2 mt-2">
                  {["Professional", "Friendly", "Concise"].map((tone) => (
                    <div
                      key={tone}
                      className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs"
                    >
                      {tone}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md cursor-not-allowed">
                Generate Email
              </Button>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 bg-blue-500 rounded-lg p-2 rotate-6 shadow-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-pink-500 rounded-lg p-2 -rotate-6 shadow-lg">
            <Clock className="h-5 w-5 text-white" />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 container mx-auto px-4 py-24 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Supercharge Your Communication
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered tools adapt to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Email",
              description:
                "Save hours with AI-generated Email for any scenario",
              icon: <Mail className="h-6 w-6" />,
              color: "from-purple-400 to-blue-400",
            },
            {
              title: "Tone Adjustment",
              description:
                "Perfect communication for any audience with dynamic tone control",
              icon: <Sparkles className="h-6 w-6" />,
              color: "from-pink-400 to-purple-400",
            },
            {
              title: "Quick Generation",
              description: "Create professional emails in seconds, not minutes",
              icon: <Zap className="h-6 w-6" />,
              color: "from-blue-400 to-cyan-400",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden group rounded-xl bg-white border border-gray-200 p-8 hover:border-purple-200 transition-all shadow-sm hover:shadow-md"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} mb-6 text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-16 mb-16">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-purple-200/50 rounded-full filter blur-3xl"></div>
            <div className="absolute left-0 top-0 w-64 h-64 bg-blue-200/30 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Ready to transform your emails?
              </h2>
              <p className="text-gray-700 max-w-xl">
                Join thousands of professionals using AI to communicate
                effectively.
              </p>
            </div>
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-6 rounded-lg text-lg shadow-md transition-all"
              onClick={handleClick}
              >
                Start Creating Emails
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Mail className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-gray-900">MailMind</span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} MailMind. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
