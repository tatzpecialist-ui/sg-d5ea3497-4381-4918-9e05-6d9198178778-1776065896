import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { bookingService } from "@/services/bookingService";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const serviceTypes = [
  { value: "video_editing", label: "Video Editing" },
  { value: "live_events", label: "Live Events" },
  { value: "documentary", label: "Documentary Production" },
  { value: "corporate_av", label: "Corporate AV Presentations" },
];

export function BookingForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  
  const [formData, setFormData] = useState({
    service_type: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    company_name: "",
    project_title: "",
    project_description: "",
    budget_range: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.service_type || !formData.client_name || !formData.client_email || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting booking with data:", {
        service_type: formData.service_type,
        client_name: formData.client_name,
        client_email: formData.client_email,
        preferred_start_date: date.toISOString(),
      });

      const booking = await bookingService.createBooking({
        service: formData.service_type,
        name: formData.client_name,
        email: formData.client_email,
        phone: formData.client_phone || null,
        company: formData.company_name || null,
        project_type: formData.project_title || null,
        message: formData.project_description || null,
        budget: formData.budget_range || null,
        timeline: date.toISOString(),
      } as any);

      console.log("Booking created successfully:", booking);

      toast({
        title: "Booking Submitted!",
        description: "We'll be in touch within 24 hours.",
      });

      router.push(`/booking/confirmation?id=${booking.id}`);
    } catch (error) {
      console.error("Booking submission error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-8 bg-card border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold">Project Details</h2>
          
          <div className="space-y-2">
            <Label htmlFor="service_type">Service Type *</Label>
            <Select 
              value={formData.service_type} 
              onValueChange={(value) => handleInputChange("service_type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_date">Preferred Start Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_title">Project Title</Label>
            <Input
              id="project_title"
              value={formData.project_title}
              onChange={(e) => handleInputChange("project_title", e.target.value)}
              placeholder="e.g., Product Launch Video"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_description">Project Description</Label>
            <Textarea
              id="project_description"
              value={formData.project_description}
              onChange={(e) => handleInputChange("project_description", e.target.value)}
              placeholder="Tell us about your vision, goals, and any specific requirements..."
              rows={4}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold">Contact Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Full Name *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => handleInputChange("client_name", e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange("company_name", e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_email">Email *</Label>
              <Input
                id="client_email"
                type="email"
                value={formData.client_email}
                onChange={(e) => handleInputChange("client_email", e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_phone">Phone Number</Label>
              <Input
                id="client_phone"
                type="tel"
                value={formData.client_phone}
                onChange={(e) => handleInputChange("client_phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold">Additional Details</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget_range">Budget Range</Label>
              <Input
                id="budget_range"
                value={formData.budget_range}
                onChange={(e) => handleInputChange("budget_range", e.target.value)}
                placeholder="e.g., $5,000 - $10,000"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Booking Request"
          )}
        </Button>
      </form>
    </Card>
  );
}