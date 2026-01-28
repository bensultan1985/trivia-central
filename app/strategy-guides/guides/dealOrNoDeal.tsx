export const dealOrNoDeal = {
  title: "Deal or No Deal",
  guideCoverUrl:
    "https://upload.wikimedia.org/wikipedia/commons/f/f3/Deal_or_No_Deal_Logo_2024.jpg",
  subtitle: "Expected Value, Banker Psychology, and Case Management",
  gameShow: "Deal or No Deal",
  chapters: [
    {
      chapterTitle: "Understanding the Core Game",
      sections: [
        {
          sectionType: "standard",
          header: "Deal or No Deal Is a Math Game",
          content:
            "Despite its dramatic presentation, Deal or No Deal is fundamentally a game of probability and expected value. Every decision reduces to whether the Banker’s offer is better or worse than the statistical value of the remaining cases.",
        },
        {
          sectionType: "standard",
          header: "What the Banker Wants",
          content:
            "The Banker’s goal is to pay you less than the expected value of the remaining cases while keeping you emotionally engaged. Offers are influenced by game progression, risk tolerance signals, and audience psychology.",
        },
      ],
    },
    {
      chapterTitle: "Expected Value (EV)",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "Calculating Expected Value",
          content:
            "<p>Expected Value (EV) is the average payout if the game continued many times.</p><p><b>Formula:</b></p><pre>EV = (Sum of remaining case values) ÷ (Number of remaining cases)</pre><p>Any Banker offer below EV is mathematically unfavorable unless you have strong risk aversion.</p>",
        },
        {
          sectionType: "strategy-real-example",
          header: "Early Rounds: Almost Always No Deal",
          content:
            "<p>Early Banker offers are typically far below EV.</p><ul><li>Few cases removed</li><li>High volatility remains</li><li>Banker testing risk tolerance</li></ul><p>From a strategy standpoint, early deals are almost always incorrect.</p>",
        },
      ],
    },
    {
      chapterTitle: "Case Management Strategy",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "Choosing Your Initial Case",
          content:
            "<p>From a mathematical standpoint, the initial case choice does not affect expected value.</p><p>However, players should choose a case they will not emotionally fixate on. Emotional attachment increases the chance of rejecting correct deals later.</p>",
          mediaType: "image",
          mediaUrl:
            "https://upload.wikimedia.org/wikipedia/commons/5/5a/Deal_or_No_Deal_stage.jpg",
        },
        {
          sectionType: "strategy-real-example",
          header: "Avoid the Sunk Cost Fallacy",
          content:
            "<p>Past losses do not make future outcomes more likely.</p><p>Eliminating large amounts early does <b>not</b> mean a big case is “due.” Each unopened case has equal probability regardless of what has already happened.</p>",
        },
      ],
    },
    {
      chapterTitle: "Banker Offer Patterns",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "How Banker Offers Evolve",
          content:
            "<p>Banker offers typically increase as:</p><ul><li>The number of remaining cases decreases</li><li>Variance decreases</li><li>The game reaches television-friendly moments</li></ul><p>Late-game offers may exceed EV to induce a dramatic acceptance.</p>",
        },
        {
          sectionType: "strategy-real-example",
          header: "Reading the Banker’s Signals",
          content:
            "<p>The Banker reacts to contestant behavior.</p><ul><li>Calm, analytical players often receive better offers</li><li>Emotional reactions may suppress offers</li><li>Repeated refusals can escalate offers—but not guaranteed</li></ul><p>This is psychological leverage, not proof of future generosity.</p>",
        },
      ],
    },
    {
      chapterTitle: "Risk Profiles & Decision Points",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "When Taking a Deal Is Correct",
          content:
            "<p>Accepting a deal is strategically sound when:</p><ul><li>The offer exceeds EV</li><li>The remaining distribution is highly skewed downward</li><li>The offer meaningfully improves your real-life utility</li></ul>",
        },
        {
          sectionType: "strategy-real-example",
          header: "High Variance Endgames",
          content:
            "<p>Late stages often reduce to two or three cases.</p><p>At this point, EV becomes less informative than <b>utility</b>. A rational player may take a slightly negative-EV deal to avoid catastrophic downside.</p>",
        },
      ],
    },
    {
      chapterTitle: "Common Mistakes",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "Chasing the Big Number",
          content:
            "<p>Players often fixate on the largest remaining value.</p><p>This causes rejection of favorable deals even when the probability of hitting the top case is extremely low.</p>",
        },
        {
          sectionType: "strategy-real-example",
          header: "Confusing Emotion with Information",
          content:
            "<p>Audience reactions, family advice, and dramatic pauses do not change probabilities.</p><p>Only remaining case values and counts matter.</p>",
        },
      ],
    },
    {
      chapterTitle: "Advanced Meta Strategy",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "Projecting Banker Incentives",
          content:
            "<p>The Banker balances expected payout against television value.</p><p>Near the finale, the Banker may overpay to end the game on a dramatic note—especially if the contestant is likable and composed.</p>",
        },
        {
          sectionType: "standard",
          header: "Think Like a Statistician, Act Like a Human",
          content:
            "The strongest players understand the math perfectly but still decide based on life impact. Optimal play balances expected value with personal risk tolerance.",
        },
      ],
    },
  ],
};
