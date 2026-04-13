import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { booking, type } = req.body;

    if (!booking) {
      return res.status(400).json({ error: "Missing booking data" });
    }

    // Format date for display
    const formattedDate = new Date(booking.preferred_start_date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Client confirmation email
    if (type === "client" || !type) {
      const clientEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Raleway', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1E1E2E; background: #F5F5F0; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #1E1E2E 0%, #2A2A3E 100%); padding: 40px 30px; text-align: center; }
              .logo { font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 700; color: #00D4FF; margin: 0; letter-spacing: 1px; }
              .tagline { color: #F5F5F0; font-size: 14px; margin: 8px 0 0 0; opacity: 0.9; }
              .content { padding: 40px 30px; }
              .title { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #1E1E2E; margin: 0 0 20px 0; }
              .message { color: #4A4A4A; font-size: 16px; margin-bottom: 30px; }
              .details { background: #F8F8F8; border-left: 4px solid #00D4FF; padding: 20px; margin: 30px 0; border-radius: 4px; }
              .detail-row { margin: 12px 0; }
              .detail-label { font-weight: 600; color: #1E1E2E; display: inline-block; min-width: 140px; }
              .detail-value { color: #4A4A4A; }
              .cta { text-align: center; margin: 40px 0; }
              .button { display: inline-block; padding: 14px 32px; background: #00D4FF; color: #1E1E2E; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; transition: background 0.3s; }
              .button:hover { background: #00B8E6; }
              .footer { background: #F8F8F8; padding: 30px; text-align: center; color: #7A7A7A; font-size: 14px; border-top: 1px solid #E5E5E5; }
              .footer-links { margin: 20px 0 0 0; }
              .footer-link { color: #00D4FF; text-decoration: none; margin: 0 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 class="logo">13 MEDIA WORKS</h1>
                <p class="tagline">Cinematic Excellence, Anywhere</p>
              </div>
              
              <div class="content">
                <h2 class="title">Booking Confirmation</h2>
                
                <p class="message">
                  Hi ${booking.client_name},<br><br>
                  Thank you for choosing 13 Media Works! We've received your booking request and are excited to bring your vision to life.
                </p>

                <div class="details">
                  <div class="detail-row">
                    <span class="detail-label">Service:</span>
                    <span class="detail-value">${booking.service_type}</span>
                  </div>
                  ${booking.project_title ? `
                  <div class="detail-row">
                    <span class="detail-label">Project:</span>
                    <span class="detail-value">${booking.project_title}</span>
                  </div>
                  ` : ''}
                  <div class="detail-row">
                    <span class="detail-label">Preferred Start:</span>
                    <span class="detail-value">${formattedDate}</span>
                  </div>
                  ${booking.budget_range ? `
                  <div class="detail-row">
                    <span class="detail-label">Budget Range:</span>
                    <span class="detail-value">${booking.budget_range}</span>
                  </div>
                  ` : ''}
                  <div class="detail-row">
                    <span class="detail-label">Booking ID:</span>
                    <span class="detail-value">#${booking.id.slice(0, 8).toUpperCase()}</span>
                  </div>
                </div>

                <p class="message">
                  <strong>What happens next?</strong><br>
                  I'll review your project details and get back to you within 24 hours to discuss your vision, timeline, and next steps.
                </p>

                <div class="cta">
                  <a href="https://13mediaworks.com/booking/confirmation?id=${booking.id}" class="button">View Booking Details</a>
                </div>

                <p class="message" style="margin-top: 30px; font-size: 14px; color: #7A7A7A;">
                  Questions? Reply directly to this email or call me to discuss your project.
                </p>
              </div>

              <div class="footer">
                <p style="margin: 0 0 10px 0; font-weight: 600; color: #1E1E2E;">13 Media Works</p>
                <p style="margin: 0 0 20px 0;">Professional Video Production & Editing Services</p>
                <div class="footer-links">
                  <a href="https://13mediaworks.com" class="footer-link">Website</a>
                  <a href="https://13mediaworks.com/booking" class="footer-link">Book a Project</a>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      await resend.emails.send({
        from: "13 Media Works <onboarding@resend.dev>",
        to: [booking.client_email],
        subject: "Booking Confirmation - 13 Media Works",
        html: clientEmailHtml,
      });
    }

    // Admin notification email
    if (type === "admin" || !type) {
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1E1E2E; }
              .container { max-width: 600px; margin: 20px auto; padding: 30px; background: #ffffff; border-radius: 8px; }
              .title { font-size: 24px; margin-bottom: 20px; color: #1E1E2E; }
              .details { background: #F8F8F8; padding: 20px; border-radius: 4px; margin: 20px 0; }
              .detail-row { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #E5E5E5; }
              .label { font-weight: 600; color: #1E1E2E; }
              .value { color: #4A4A4A; margin-top: 4px; }
              .button { display: inline-block; padding: 12px 24px; background: #00D4FF; color: #1E1E2E; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2 class="title">🎬 New Booking Request</h2>
              
              <div class="details">
                <div class="detail-row">
                  <div class="label">Client Name</div>
                  <div class="value">${booking.client_name}</div>
                </div>
                <div class="detail-row">
                  <div class="label">Email</div>
                  <div class="value">${booking.client_email}</div>
                </div>
                ${booking.client_phone ? `
                <div class="detail-row">
                  <div class="label">Phone</div>
                  <div class="value">${booking.client_phone}</div>
                </div>
                ` : ''}
                ${booking.company_name ? `
                <div class="detail-row">
                  <div class="label">Company</div>
                  <div class="value">${booking.company_name}</div>
                </div>
                ` : ''}
                <div class="detail-row">
                  <div class="label">Service Type</div>
                  <div class="value">${booking.service_type}</div>
                </div>
                ${booking.project_title ? `
                <div class="detail-row">
                  <div class="label">Project Title</div>
                  <div class="value">${booking.project_title}</div>
                </div>
                ` : ''}
                <div class="detail-row">
                  <div class="label">Preferred Start Date</div>
                  <div class="value">${formattedDate}</div>
                </div>
                ${booking.budget_range ? `
                <div class="detail-row">
                  <div class="label">Budget Range</div>
                  <div class="value">${booking.budget_range}</div>
                </div>
                ` : ''}
                ${booking.project_description ? `
                <div class="detail-row">
                  <div class="label">Project Description</div>
                  <div class="value">${booking.project_description}</div>
                </div>
                ` : ''}
              </div>

              <a href="https://13mediaworks.com/admin/bookings" class="button">View in Dashboard</a>
            </div>
          </body>
        </html>
      `;

      // Send to your admin email
      await resend.emails.send({
        from: "13 Media Works <onboarding@resend.dev>",
        to: ["info@13mediaworks.com"],
        subject: `New Booking Request from ${booking.client_name}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">New Booking Request</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="color: #374151; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${booking.client_name}</p>
            <p><strong>Email:</strong> ${booking.client_email}</p>
            ${booking.client_phone ? `<p><strong>Phone:</strong> ${booking.client_phone}</p>` : ""}
            ${booking.company_name ? `<p><strong>Company:</strong> ${booking.company_name}</p>` : ""}
            
            <h3 style="color: #374151; margin-top: 20px;">Project Details</h3>
            <p><strong>Service:</strong> ${booking.service_type}</p>
            <p><strong>Preferred Date:</strong> ${formattedDate}</p>
            ${booking.budget_range ? `<p><strong>Budget:</strong> ${booking.budget_range}</p>` : ""}
            
            <h3 style="color: #374151; margin-top: 20px;">Project Description</h3>
            <p style="white-space: pre-wrap;">${booking.project_description}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px; text-align: center;">
            This is an automated notification from your booking system.
          </p>
        </div>
      `,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ 
      error: "Failed to send email",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}