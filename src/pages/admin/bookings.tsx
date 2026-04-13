import { useEffect, useState, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RefreshCw, Mail, Phone, Building2, Calendar } from "lucide-react";
import { bookingService } from "@/services/bookingService";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-300 border-green-500/30",
  in_progress: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  completed: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function AdminBookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bookingService.getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleStatusChange = async (id: string, status: Booking["status"]) => {
    try {
      await bookingService.updateBookingStatus(id, status);
      toast({
        title: "Status Updated",
        description: "Booking status has been updated successfully",
      });
      loadBookings();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      await bookingService.deleteBooking(id);
      toast({
        title: "Booking Deleted",
        description: "The booking has been removed",
      });
      loadBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Admin - Bookings Dashboard - 13 Media Works"
        description="Manage client bookings and project requests"
        url="https://13mediaworks.com/admin/bookings"
      />
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">Bookings Dashboard</h1>
              <p className="text-muted-foreground">{bookings.length} total bookings</p>
            </div>
            <Button onClick={loadBookings} variant="outline" className="border-accent/30 hover:border-accent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6 bg-card border-border">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead>Client</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No bookings yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        bookings.map((booking) => (
                          <TableRow 
                            key={booking.id} 
                            className="border-border cursor-pointer hover:bg-secondary/50"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <TableCell className="font-medium">
                              <div>
                                <div>{booking.client_name}</div>
                                <div className="text-xs text-muted-foreground">{booking.client_email}</div>
                              </div>
                            </TableCell>
                            <TableCell className="capitalize">
                              {booking.service_type.replace("_", " ")}
                            </TableCell>
                            <TableCell>
                              {booking.preferred_start_date 
                                ? format(new Date(booking.preferred_start_date), "MMM dd, yyyy")
                                : "Not specified"}
                            </TableCell>
                            <TableCell>
                              <Badge className={statusColors[booking.status]}>
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <Select
                                value={booking.status}
                                onValueChange={(value) => handleStatusChange(booking.id, value as Booking["status"])}
                              >
                                <SelectTrigger className="w-32 border-border">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

            <div>
              {selectedBooking ? (
                <Card className="p-6 bg-card border-border sticky top-32">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-bold">Booking Details</h3>
                      <Badge className={statusColors[selectedBooking.status]}>
                        {selectedBooking.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Reference ID</div>
                        <div className="font-medium">{selectedBooking.id.slice(0, 8)}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground mb-1">Service Type</div>
                        <div className="font-medium capitalize">
                          {selectedBooking.service_type.replace("_", " ")}
                        </div>
                      </div>

                      {selectedBooking.project_title && (
                        <div>
                          <div className="text-muted-foreground mb-1">Project Title</div>
                          <div className="font-medium">{selectedBooking.project_title}</div>
                        </div>
                      )}

                      {selectedBooking.project_description && (
                        <div>
                          <div className="text-muted-foreground mb-1">Project Description</div>
                          <div className="text-foreground/90 leading-relaxed">
                            {selectedBooking.project_description}
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="h-4 w-4 text-accent" />
                          <a href={`mailto:${selectedBooking.client_email}`} className="hover:text-accent">
                            {selectedBooking.client_email}
                          </a>
                        </div>
                        {selectedBooking.client_phone && (
                          <div className="flex items-center gap-2 mb-2">
                            <Phone className="h-4 w-4 text-accent" />
                            <a href={`tel:${selectedBooking.client_phone}`} className="hover:text-accent">
                              {selectedBooking.client_phone}
                            </a>
                          </div>
                        )}
                        {selectedBooking.company_name && (
                          <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-4 w-4 text-accent" />
                            <span>{selectedBooking.company_name}</span>
                          </div>
                        )}
                        {selectedBooking.preferred_start_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-accent" />
                            <span>{format(new Date(selectedBooking.preferred_start_date), "MMMM dd, yyyy")}</span>
                          </div>
                        )}
                      </div>

                      {selectedBooking.budget_range && (
                        <div>
                          <div className="text-muted-foreground mb-1">Budget Range</div>
                          <div className="font-medium">{selectedBooking.budget_range}</div>
                        </div>
                      )}

                      <div className="pt-4">
                        <div className="text-muted-foreground mb-1">Submitted</div>
                        <div className="text-sm">
                          {format(new Date(selectedBooking.created_at), "PPpp")}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button
                        onClick={() => handleDelete(selectedBooking.id)}
                        variant="outline"
                        className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive"
                      >
                        Delete Booking
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 bg-card border-border sticky top-32 text-center text-muted-foreground">
                  Select a booking to view details
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}