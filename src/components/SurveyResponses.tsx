
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Search } from "lucide-react";

interface SurveyResponse {
  id: string;
  date: string;
  satisfaction: number;
  improvement: string;
  recommendation: number;
  comments: string;
}

interface SurveyResponsesProps {
  responses: SurveyResponse[] | undefined;
  isLoading: boolean;
}

// Helper function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Map improvement codes to readable text
const improvementMap: Record<string, string> = {
  product_quality: "Product Quality",
  pricing: "Pricing",
  shipping: "Shipping",
  website_ux: "Website Experience",
  customer_service: "Customer Service"
};

const SurveyResponses = ({ responses, isLoading }: SurveyResponsesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  
  // Mock responses for preview
  const mockResponses: SurveyResponse[] = [
    {
      id: "resp-001",
      date: "2023-07-15T14:35:00Z",
      satisfaction: 5,
      improvement: "shipping",
      recommendation: 9,
      comments: "Great products, but shipping took longer than expected."
    },
    {
      id: "resp-002",
      date: "2023-07-14T10:20:00Z",
      satisfaction: 4,
      improvement: "pricing",
      recommendation: 7,
      comments: "Love the quality, but prices are a bit high compared to competitors."
    },
    {
      id: "resp-003",
      date: "2023-07-14T09:15:00Z",
      satisfaction: 3,
      improvement: "website_ux",
      recommendation: 5,
      comments: "The checkout process was confusing."
    },
    {
      id: "resp-004",
      date: "2023-07-13T16:42:00Z",
      satisfaction: 5,
      improvement: "product_quality",
      recommendation: 10,
      comments: "Absolutely love everything about your store!"
    },
    {
      id: "resp-005",
      date: "2023-07-13T12:05:00Z",
      satisfaction: 2,
      improvement: "customer_service",
      recommendation: 3,
      comments: "Had trouble reaching customer service about my order status."
    },
    {
      id: "resp-006",
      date: "2023-07-12T08:30:00Z",
      satisfaction: 4,
      improvement: "shipping",
      recommendation: 8,
      comments: ""
    }
  ];

  const dataToUse = responses || mockResponses;
  
  // Filter responses based on search query and filter option
  const filteredResponses = dataToUse.filter(response => {
    // First apply the satisfaction filter
    if (filterOption !== "all" && response.satisfaction.toString() !== filterOption) {
      return false;
    }
    
    // Then apply the search query to comments
    if (searchQuery && !response.comments.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleExport = () => {
    // In a real app, this would export the data to CSV or Excel
    console.log("Exporting data...");
    
    // Mock export - we'd normally use a library like 'csv-stringify' or similar
    const headers = ["Date", "Satisfaction", "Area for Improvement", "Recommendation Score", "Comments"];
    const csvData = filteredResponses.map(response => [
      formatDate(response.date),
      response.satisfaction,
      improvementMap[response.improvement] || response.improvement,
      response.recommendation,
      `"${response.comments.replace(/"/g, '""')}"`
    ]);
    
    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `survey_responses_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Survey Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-10 w-full max-w-sm" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Responses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-4">
            <Select value={filterOption} onValueChange={setFilterOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by satisfaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">★★★★★ (5)</SelectItem>
                <SelectItem value="4">★★★★☆ (4)</SelectItem>
                <SelectItem value="3">★★★☆☆ (3)</SelectItem>
                <SelectItem value="2">★★☆☆☆ (2)</SelectItem>
                <SelectItem value="1">★☆☆☆☆ (1)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Satisfaction</TableHead>
                <TableHead>Area for Improvement</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead className="w-[300px]">Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResponses.length > 0 ? (
                filteredResponses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell className="font-medium">{formatDate(response.date)}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={index} className="text-yellow-500">
                            {index < response.satisfaction ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{improvementMap[response.improvement] || response.improvement}</TableCell>
                    <TableCell>{response.recommendation}/10</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {response.comments || <span className="text-muted-foreground italic">No comments</span>}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyResponses;
