import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

import Home from "@/pages/Home";
import RealEstate from "@/pages/RealEstate";
import PropertyDetails from "@/pages/PropertyDetails";
import PropertyManagement from "@/pages/PropertyManagement";
import CompanyFormation from "@/pages/CompanyFormation";
import DigitalMarketing from "@/pages/DigitalMarketing";
import CarRentals from "@/pages/CarRentals";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/real-estate" component={RealEstate} />
        <Route path="/real-estate/:id" component={PropertyDetails} />
        <Route path="/property-management" component={PropertyManagement} />
        <Route path="/company-formation" component={CompanyFormation} />
        <Route path="/digital-marketing" component={DigitalMarketing} />
        <Route path="/car-rentals" component={CarRentals} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
