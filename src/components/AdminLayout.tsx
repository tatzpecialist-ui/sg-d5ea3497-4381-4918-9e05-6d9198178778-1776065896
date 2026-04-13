import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Calendar, Package, LogOut, User } from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-serif text-xl font-bold text-accent">
                13 Media Works
              </Link>
              
              <div className="hidden md:flex items-center gap-1">
                <Link href="/admin/bookings">
                  <Button
                    variant={isActive("/admin/bookings") ? "default" : "ghost"}
                    size="sm"
                    className={isActive("/admin/bookings") ? "bg-accent hover:bg-accent/90" : ""}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Bookings
                  </Button>
                </Link>
                
                <Link href="/admin/portfolio">
                  <Button
                    variant={isActive("/admin/portfolio") ? "default" : "ghost"}
                    size="sm"
                    className={isActive("/admin/portfolio") ? "bg-accent hover:bg-accent/90" : ""}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Portfolio
                  </Button>
                </Link>

                <Link href="/admin/profile">
                  <Button
                    variant={isActive("/admin/profile") ? "default" : "ghost"}
                    size="sm"
                    className={isActive("/admin/profile") ? "bg-accent hover:bg-accent/90" : ""}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              </div>
            </div>

            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}