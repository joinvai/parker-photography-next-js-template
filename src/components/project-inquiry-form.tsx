"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { submitProjectInquiry } from "@/actions/submit-project-inquiry";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/utils/toast";
import {
  type ProjectInquirySchema,
  projectInquirySchema,
} from "@/lib/validation/project-inquiry";

export function ProjectInquiryForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ProjectInquirySchema>({
    resolver: zodResolver(projectInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      projectAddress: "",
      projectType: "",
      projectDescription: "",
      referralSource: "",
      ongoingProject: false,
      projectDetails: "",
      projectState: "",
      budget: "No budget",
      projectScopeDetails: "",
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const ongoingProjectValue = watch("ongoingProject");

  async function onSubmit(values: ProjectInquirySchema) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined && value !== null) {
        if (key === "ongoingProject" && typeof value === "boolean") {
          if (value) {
            formData.append(key, "on");
          }
        } else {
          formData.append(key, String(value));
        }
      }
    }

    try {
      const result = await submitProjectInquiry(formData);

      if (result.success) {
        toast(result.message);
        setIsSuccess(true);
      } else {
        if (result.errors) {
          console.error("Server validation errors:", result.errors);
        }
        toast(result.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Error calling server action:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast(errorMessage);
    }
  }

  if (isSuccess) {
    return (
      <div className="p-6 text-center space-y-4">
        <h3 className="text-xl font-header">Inquiry Submitted!</h3>
        <p>
          Thank you for reaching out. We have received your project inquiry and
          will be in touch soon to discuss the next steps.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-h-[75vh] overflow-y-auto p-1 pr-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email *</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Project Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {[
                    "House",
                    "Apartment",
                    "Commercial / Office / Retail / Hospitality",
                    "Furnishing",
                  ].map((type) => (
                    <FormItem
                      key={type}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>
                      <FormLabel className="font-normal">{type}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description *</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referralSource"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Referral Source</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {["Referral", "Instagram", "Google", "Other"].map(
                    (source) => (
                      <FormItem
                        key={source}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={source} />
                        </FormControl>
                        <FormLabel className="font-normal">{source}</FormLabel>
                      </FormItem>
                    ),
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ongoingProject"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Ongoing Project?</FormLabel>
                <FormDescription>
                  Is this an addition or phase of an existing project?
                </FormDescription>
              </div>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        {ongoingProjectValue && (
          <FormField
            control={form.control}
            name="projectDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Details (Ongoing Project)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide more details about the existing project if applicable."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="projectState"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Current Project State</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Planning" />
                    </FormControl>
                    <FormLabel className="font-normal">Planning</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Design" />
                    </FormControl>
                    <FormLabel className="font-normal">Design</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Construction" />
                    </FormControl>
                    <FormLabel className="font-normal">Construction</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Budget</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="min-w-[200px]">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="<500k">Less than $500,000</SelectItem>
                  <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                  <SelectItem value="1m-25m">
                    $1,000,000 - $2,500,000
                  </SelectItem>
                  <SelectItem value="2.5m+">$2,500,000+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectScopeDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Scope Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the desired scope, rooms involved, etc."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white rounded-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </form>
    </Form>
  );
}
