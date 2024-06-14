import { Button } from "@/components/ui/button";
import React from "react";

const ExpiredPage = () => {
  return (
    <div className="text-4xl text-destructive mb-4">
      <h1>Download link expired</h1>
      <Button asChild size="lg">
        <a href="/orders">Get new link</a>
      </Button>
    </div>
  );
};

export default ExpiredPage;
