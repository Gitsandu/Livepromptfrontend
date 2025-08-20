// Mock API service for transcript processing
export const transcriptService = {
  async processTranscript(data) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock response based on the JSON structure provided
    const mockResponse = {
      summary: "The team discussed the weekly project status, reviewed Q3 planning objectives, and addressed several technical challenges. Key decisions were made regarding resource allocation and timeline adjustments.",
      keyPoints: [
        "The quarterly revenue increased by 23% compared to the previous quarter, reaching $2.4 million in total sales.",
        "Customer acquisition costs decreased by 15% due to improved marketing efficiency and better targeting strategies implemented this quarter.",
        "The product development team successfully launched three new features that received overwhelmingly positive user feedback and adoption rates.",
        "Employee satisfaction scores improved significantly to 8.2/10, with particular improvements noted in work-life balance and remote work flexibility metrics.",
        "Market expansion into the European region showed promising initial results with 340 new enterprise customers onboarded."
      ],
      action_items: [
        {
          text: "Send the weekly report to the team",
          owner: "Alice",
          due: "Next Monday"
        },
        {
          text: "Schedule the follow-up meeting",
          owner: "Bob", 
          due: "End of week"
        },
        {
          text: "Review technical specifications",
          owner: "Charlie",
          due: "Wednesday"
        },
        {
          text: "Schedule follow-up meeting with product team for Q2 roadmap planning and feature prioritization",
          owner: "Sarah",
          due: "Friday"
        },
        {
          text: "Review and optimize current marketing campaigns based on recent performance data and ROI analysis",
          owner: "Mike",
          due: "Next Tuesday"
        },
        {
          text: "Implement comprehensive customer feedback system for new feature releases and product iterations",
          owner: "Lisa",
          due: "End of month"
        },
        {
          text: "Prepare detailed European market expansion report for board presentation next month",
          owner: "David",
          due: "Next Friday"
        }
      ],
      keyInsights: [
        "Strong correlation between employee satisfaction improvements and customer retention rates",
        "European market shows 40% higher conversion rates compared to initial North American launch",
        "New product features driving 60% of quarterly revenue growth"
      ],
      topics: [
        "Weekly Report",
        "Project X", 
        "Q3 Planning",
        "Technical Review",
        "Resource Allocation",
        "Revenue Growth",
        "Customer Acquisition",
        "Product Development",
        "Employee Satisfaction",
        "Market Expansion"
      ],
      processingStats: {
        wordsProcessed: 2847,
        keyPoints: 12,
        actionItems: 7,
        compressionRate: 85,
        processingTime: "2.3s"
      }
    };

    return mockResponse;
  }
};

export default transcriptService;
