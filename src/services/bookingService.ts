import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];

export const bookingService = {
  async createBooking(booking: Omit<BookingInsert, "id" | "created_at" | "status">) {
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        ...booking,
        status: "pending"
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating booking:", error);
      throw error;
    }

    return data;
  },

  async getAllBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }

    return data || [];
  },

  async getBookingById(id: string) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }

    return data;
  },

  async updateBookingStatus(id: string, status: Booking["status"]) {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }

    return data;
  },

  async deleteBooking(id: string) {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }

    return true;
  }
};