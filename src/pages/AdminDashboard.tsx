import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Power, 
  PowerOff, 
  LogOut,
  Settings,
  BarChart3,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Website {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not admin
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Fetch websites
  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebsites(data || []);
    } catch (error) {
      console.error('Error fetching websites:', error);
      toast.error('Failed to load websites');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWebsiteStatus = async (websiteId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('websites')
        .update({ is_active: !currentStatus })
        .eq('id', websiteId);

      if (error) throw error;

      toast.success(
        !currentStatus 
          ? 'Website activated successfully!' 
          : 'Website deactivated successfully!'
      );
      
      fetchWebsites(); // Refresh the list
    } catch (error) {
      console.error('Error toggling website status:', error);
      toast.error('Failed to update website status');
    }
  };

  const deleteWebsite = async (websiteId: string) => {
    try {
      const { error } = await supabase
        .from('websites')
        .delete()
        .eq('id', websiteId);

      if (error) throw error;

      toast.success('Website deleted successfully!');
      fetchWebsites(); // Refresh the list
    } catch (error) {
      console.error('Error deleting website:', error);
      toast.error('Failed to delete website');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  const activeWebsite = websites.find(w => w.is_active);
  const stats = {
    total: websites.length,
    active: websites.filter(w => w.is_active).length,
    inactive: websites.filter(w => !w.is_active).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-card/80">
        <div className="container-responsive">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Website Manager</h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-responsive py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Websites</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Power className="w-5 h-5 text-success" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <PowerOff className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                  <p className="text-2xl font-bold text-foreground">{stats.inactive}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold text-foreground">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Website Alert */}
        {activeWebsite && (
          <Card className="mb-6 border-success/20 bg-success/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium text-foreground">Currently Active Website</p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{activeWebsite.name}</strong> is live at the root domain
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/" target="_blank">
                    <Eye className="w-4 h-4 mr-2" />
                    View Live
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Websites</h2>
            <p className="text-muted-foreground">Manage your website collection</p>
          </div>
          <Button className="btn-hero" asChild>
            <Link to="/admin/websites/new">
              <Plus className="w-4 h-4 mr-2" />
              Create Website
            </Link>
          </Button>
        </div>

        {/* Websites List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : websites.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No websites yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first website to get started
              </p>
              <Button className="btn-hero" asChild>
                <Link to="/admin/websites/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Website
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {websites.map((website) => (
              <Card key={website.id} className="card-elevated hover:shadow-medium transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{website.name}</CardTitle>
                    <Badge 
                      variant={website.is_active ? "default" : "secondary"}
                      className={website.is_active ? "bg-success text-success-foreground" : ""}
                    >
                      {website.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>/{website.slug}</p>
                    {website.seo_title && (
                      <p className="mt-1">{website.seo_title}</p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Created {new Date(website.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWebsiteStatus(website.id, website.is_active)}
                      >
                        {website.is_active ? (
                          <PowerOff className="w-4 h-4" />
                        ) : (
                          <Power className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/websites/${website.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Website</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{website.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteWebsite(website.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;