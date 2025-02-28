
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

// Define the form schema
const formSchema = z.object({
  satisfaction: z.string().min(1, { message: "Please select your satisfaction level" }),
  improvements: z.string().min(1, { message: "Please select an area for improvement" }),
  likelyToRecommend: z.string().min(1, { message: "Please select how likely you are to recommend" }),
  comments: z.string().optional(),
});

type SurveyFormValues = z.infer<typeof formSchema>;

interface SurveyFormProps {
  preview?: boolean;
}

export default function SurveyForm({ preview = false }: SurveyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Define your form
  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      satisfaction: "",
      improvements: "",
      likelyToRecommend: "",
      comments: "",
    },
  });

  // Define your submit handler
  function onSubmit(values: SurveyFormValues) {
    if (preview) {
      toast({
        title: "Preview Mode",
        description: "In preview mode, survey submissions are not processed.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Survey submitted:", values);
      toast({
        title: "Survey submitted",
        description: "Thank you for your feedback!",
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium">Thank you for your feedback!</h3>
        <p className="text-muted-foreground">Your responses help us improve our products and services.</p>
        {!preview && (
          <Button variant="outline" onClick={() => {
            form.reset();
            setIsSubmitted(false);
          }}>
            Submit another response
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`p-2 ${preview ? '' : 'bg-white rounded-xl shadow-sm border'}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className={preview ? "" : "px-4 py-2"}>
            <h3 className="text-lg font-medium mb-1">We value your feedback!</h3>
            <p className="text-sm text-muted-foreground mb-4">Please take a moment to complete this quick survey about your shopping experience.</p>
            
            <FormField
              control={form.control}
              name="satisfaction"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How satisfied are you with your shopping experience today?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="5" />
                        </FormControl>
                        <FormLabel className="font-normal">Very Satisfied</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="4" />
                        </FormControl>
                        <FormLabel className="font-normal">Satisfied</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="3" />
                        </FormControl>
                        <FormLabel className="font-normal">Neutral</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="2" />
                        </FormControl>
                        <FormLabel className="font-normal">Dissatisfied</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">Very Dissatisfied</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="improvements"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>What area do you think we could improve the most?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="product_quality">Product Quality</SelectItem>
                      <SelectItem value="pricing">Pricing</SelectItem>
                      <SelectItem value="shipping">Shipping</SelectItem>
                      <SelectItem value="website_ux">Website Experience</SelectItem>
                      <SelectItem value="customer_service">Customer Service</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="likelyToRecommend"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>How likely are you to recommend us to a friend?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex justify-between"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <FormItem key={value} className="flex flex-col items-center space-y-2">
                          <FormControl>
                            <RadioGroupItem value={value.toString()} className="sr-only peer" />
                          </FormControl>
                          <div className="peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground h-9 w-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border border-input hover:bg-muted">
                            {value}
                          </div>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription className="flex justify-between mt-1">
                    <span>Not likely</span>
                    <span>Very likely</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Any additional comments or suggestions?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what you think..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end px-4 py-3 bg-gray-50 border-t rounded-b-xl">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                "Submit Survey"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
