"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Personal Information",
    fields: [
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "dateOfBirth", label: "Date of Birth", type: "date" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone Number", type: "tel" },
    ],
  },
  {
    title: "Medical History",
    fields: [
      { name: "allergies", label: "Allergies", type: "text" },
      { name: "medications", label: "Current Medications", type: "text" },
      { name: "conditions", label: "Existing Medical Conditions", type: "text" },
    ],
  },
  {
    title: "Lifestyle",
    fields: [
      {
        name: "exercise",
        label: "Exercise Frequency",
        type: "select",
        options: ["Never", "1-2 times/week", "3-4 times/week", "5+ times/week"],
      },
      {
        name: "diet",
        label: "Diet Type",
        type: "select",
        options: ["Omnivore", "Vegetarian", "Vegan", "Pescatarian", "Other"],
      },
      {
        name: "smoking",
        label: "Smoking Status",
        type: "select",
        options: ["Non-smoker", "Former smoker", "Current smoker"],
      },
    ],
  },
  {
    title: "Preferences",
    fields: [
      {
        name: "communicationPreference",
        label: "Preferred Communication Method",
        type: "select",
        options: ["Email", "Phone", "SMS"],
      },
      { name: "appointmentReminders", label: "Appointment Reminders", type: "checkbox" },
      { name: "newsletterSubscription", label: "Subscribe to Health Newsletter", type: "checkbox" },
    ],
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Submit the form data
      console.log("Form submitted:", formData)
      // Here you would typically send the data to your backend
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-sequoia-sage flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-sequoia-darkBlue">Welcome to Sequoia Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-1/4 h-2 rounded-full ${index <= currentStep ? "bg-sequoia-green" : "bg-gray-200"}`}
                />
              ))}
            </div>
            <p className="text-center text-sequoia-darkBlue">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-sequoia-darkBlue">{currentStepData.title}</h2>
            <form className="space-y-4">
              {currentStepData.fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select an option</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={formData[field.name] || false}
                        onCheckedChange={(checked) =>
                          handleInputChange({
                            target: { name: field.name, type: "checkbox", checked },
                          })
                        }
                      />
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {field.label}
                      </label>
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
            </form>
          </motion.div>

          <div className="mt-6 flex justify-between items-center">
            <Button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              variant="outline"
            >
              Back
            </Button>
            <Button onClick={handleNext} className="bg-sequoia-green text-white">
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

