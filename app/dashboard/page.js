"use client"

import { useState, useEffect } from "react"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { PlusCircle, Mail, FileText, Loader2, Sparkles, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Toaster } from "sonner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("emails")
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const showSuccessToast = () => {
    toast.success("Feature activated successfully!", {
      description: "Your new email creation experience awaits",
      duration: 3000,
    })
  }
  const Saved = async()=>{
    router.push('/dashboard/savedTemplate')
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 mt-18"> 
      <motion.div 
        className="container mx-auto p-4 md:p-6 max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6 p-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
           
            
          </motion.div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
          </motion.div>
        </div>

        <motion.div 
          className="bg-white rounded-xl p-8 mb-8 border border-gray-200 shadow-lg relative overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-full blur-3xl z-0"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
            <div>
              <motion.div 
                className="flex items-center gap-2 mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium">
                  Next Generation Email Experience
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl font-bold tracking-tight mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-gray-900">AI-Powered</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 ml-2">
                  Email Creation
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-gray-600 max-w-xl"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Create perfectly crafted emails in seconds. Our AI understands context, tone, and purpose 
                to help you communicate effectively with minimal effort.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link href={"/dashboard/emails"}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Email
              </Button>
              </Link>
              <Link href={"/dashboard/emails"}>
              <Button
                size="lg"
                className="border-purple-200 text-white bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="mr-2 h-4 w-4" />
                Create Template
              </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <Tabs 
          defaultValue="emails" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md max-auto bg-white rounded-full border border-gray-200 shadow-sm mt-11">
              <TabsTrigger 
                value="emails" 
                className="rounded-full py-2.5 mb-11 mt-[-5px] mx-[-5px] w-full text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-4" />
                Emails
              </TabsTrigger>
              <TabsTrigger 
                value="templates" 
                className="rounded-full py-2.5 mb-11 mt-[-5px] mx-[-5px] text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
              >
                <FileText className="mr-2 h-4 w-4" />
                Templates
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <TabsContent value="emails">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                <EmptyState
                  title="Create Your First Email"
                  description="Get started with AI-powered email creation in seconds"
                  buttonText="New Email"
                  buttonHref="/dashboard/emails"
                  icon={<Mail className="h-12 w-12 text-purple-500" />}
                  variants={itemVariants}
                />
                
                <motion.div variants={itemVariants}>
                  <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
                    <div className="p-6 flex flex-col h-full">
                      <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">
                        Meeting Follow-up
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow">
                        Professional follow-up emails after important meetings with actionable next steps.
                      </p>
                      <Button variant="ghost" className="justify-start p-0 mt-4 text-purple-600 hover:text-purple-800 hover:bg-transparent">
                        Try template <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
                    <div className="p-6 flex flex-col h-full">
                      <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">
                        Cold Outreach
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow">
                        Personalized cold emails that grab attention and generate responses.
                      </p>
                      <Button variant="ghost" className="justify-start p-0 mt-4 text-pink-600 hover:text-pink-800 hover:bg-transparent">
                        Try template <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="templates">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                <EmptyState
                  title="Create Your First Template"
                  description="Build reusable templates with AI to speed up your workflow"
                  buttonText="New Template"
                  buttonHref="/dashboard/templates"
                  icon={<FileText className="h-12 w-12 text-pink-500" />}
                  variants={itemVariants}
                />
                
                <motion.div variants={itemVariants}>
                  <Card className="h-full bg-gradient-to-br from-pink-50 to-purple-50 border-gray-200 hover:border-pink-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
                    <div className="p-6 flex flex-col h-full">
                      <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">
                        Thank You Note
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow">
                        Express gratitude with warmth and authenticity while maintaining professionalism.
                      </p>
                      <Button variant="ghost" className="justify-start p-0 mt-4 text-pink-600 hover:text-pink-800 hover:bg-transparent">
                        Try template <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card className="h-full bg-gradient-to-br from-pink-50 to-purple-50 border-gray-200 hover:border-pink-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
                    <div className="p-6 flex flex-col h-full">
                      <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">
                        Project Update
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow">
                        Keep stakeholders informed with clear, concise project status updates.
                      </p>
                      <Button variant="ghost" className="justify-start p-0 mt-4 text-purple-600 hover:text-purple-800 hover:bg-transparent">
                        Try template <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>

        <motion.div 
          className="mt-16 bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="ml-4 font-bold">
                <span className="font-bold text-gray-900"></span>               
                Unlimited Storage Of Templates  
              </div>
            </div>
            
            <Button 
            onClick={Saved}
            variant="outline" 
            className="border-purple-200 text-white hover:bg-green-700 bg-gradient-to-r from-purple-500 to-pink-500">
                Go To Templates
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function EmptyState({ title, description, buttonText, buttonHref, icon, variants }) {
  return (
    <motion.div variants={variants}>
      <Card className="h-full flex flex-col items-center justify-center py-12 px-6 bg-white rounded-lg border border-dashed border-gray-300 shadow-sm hover:border-purple-300 hover:shadow-md transition-all duration-300">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6 text-center max-w-xs">{description}</p>
        <Link href={buttonHref}>
          <Button className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-sm transform transition-transform duration-300 hover:scale-105">
            <PlusCircle className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
        </Link>
      </Card>
    </motion.div>
  )
}