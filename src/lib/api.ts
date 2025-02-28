
// This would be replaced with actual API calls to your backend in a production app

export interface SurveyData {
  totalResponses: number;
  completionRate: string;
  averageSatisfaction: number;
  responsesByDay: { day: string; count: number }[];
  satisfactionDistribution: { rating: number; count: number }[];
  improvements: { area: string; count: number }[];
}

export interface SurveyResponse {
  id: string;
  date: string;
  satisfaction: number;
  improvement: string;
  recommendation: number;
  comments: string;
}

export const fetchSurveyData = async (): Promise<SurveyData> => {
  // In a real app, this would be an API call
  // For now, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalResponses: 245,
        completionRate: "78%",
        averageSatisfaction: 4.2,
        responsesByDay: [
          { day: "Mon", count: 32 },
          { day: "Tue", count: 45 },
          { day: "Wed", count: 39 },
          { day: "Thu", count: 50 },
          { day: "Fri", count: 55 },
          { day: "Sat", count: 15 },
          { day: "Sun", count: 9 },
        ],
        satisfactionDistribution: [
          { rating: 5, count: 120 },
          { rating: 4, count: 80 },
          { rating: 3, count: 25 },
          { rating: 2, count: 15 },
          { rating: 1, count: 5 },
        ],
        improvements: [
          { area: "Product Quality", count: 15 },
          { area: "Pricing", count: 85 },
          { area: "Shipping", count: 60 },
          { area: "Website UX", count: 45 },
          { area: "Customer Service", count: 40 },
        ],
      });
    }, 1000);
  });
};

export const fetchSurveyResponses = async (): Promise<SurveyResponse[]> => {
  // In a real app, this would be an API call
  // For now, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
        },
        {
          id: "resp-007",
          date: "2023-07-11T15:20:00Z",
          satisfaction: 5,
          improvement: "product_quality",
          recommendation: 9,
          comments: "The quality of your products exceeded my expectations!"
        },
        {
          id: "resp-008",
          date: "2023-07-10T11:05:00Z",
          satisfaction: 3,
          improvement: "pricing",
          recommendation: 6,
          comments: "Good products, but a bit overpriced for what they are."
        },
        {
          id: "resp-009",
          date: "2023-07-09T13:45:00Z",
          satisfaction: 4,
          improvement: "website_ux",
          recommendation: 8,
          comments: "Overall great experience, but product filters could be improved."
        },
        {
          id: "resp-010",
          date: "2023-07-08T17:30:00Z",
          satisfaction: 1,
          improvement: "shipping",
          recommendation: 2,
          comments: "My order arrived damaged and customer service was unhelpful."
        }
      ]);
    }, 1500);
  });
};

export const submitSurveyResponse = async (data: any) => {
  // In a real app, this would post to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Survey submitted:', data);
      resolve({ success: true });
    }, 1000);
  });
};
