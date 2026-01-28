export const jeopardy = {
  title: "Jeopardy! Winning Strategy Guide",
  subtitle: "Advanced Tactics Used by Champions",
  gameShow: "Jeopardy!",
  chapters: [
    {
      chapterTitle: "Core Game Philosophy",
      sections: [
        {
          sectionType: "standard",
          header: "Jeopardy Is a Strategy Game Disguised as Trivia",
          content:
            "While Jeopardy! rewards broad knowledge, long-term success is driven by strategy: clue selection, wagering math, buzzer timing, and psychological pressure. Champions win not because they know everything, but because they maximize high-leverage moments.",
        },
      ],
    },
    {
      chapterTitle: "Board Control & Clue Selection",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "Bottom-Up Board Control",
          content:
            "<p>Elite players typically start with high-value clues ($800–$2000) instead of moving top-down.</p><ul><li>High-value clues build money faster</li><li>They increase the chance of uncovering Daily Doubles early</li><li>They disrupt opponents who rely on category warm-up</li></ul><p>This approach turns Jeopardy into a tempo-based game rather than a polite trivia exchange.</p>",
          mediaType: "image",
          mediaUrl:
            "https://upload.wikimedia.org/wikipedia/commons/8/8b/Jeopardy_game_board.jpg",
        },
        {
          sectionType: "strategy-real-example",
          header: "James Holzhauer’s Category Jumping",
          content:
            "<p>James Holzhauer aggressively jumped between categories, targeting statistically likely Daily Double locations.</p><p>This prevented opponents from settling into categories and forced them into reactive play.</p>",
          mediaType: "external",
          mediaUrl:
            "https://www.jeopardy.com/jbuzz/contestants/james-holzhauers-winning-strategy-explained",
        },
      ],
    },
    {
      chapterTitle: "Daily Double Mastery",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "Why Daily Doubles Decide Games",
          content:
            "<p>Daily Doubles are the highest-leverage events in Jeopardy.</p><ul><li>You control the wager</li><li>No buzzer race</li><li>They can swing the lead instantly</li></ul><p>Strong players treat them as scoring weapons, not survival tests.</p>",
        },
        {
          sectionType: "strategy-real-example",
          header: "Aggressive vs Conservative Wagering",
          content:
            "<p>Champions often wager aggressively when:</p><ul><li>The category aligns with strengths</li><li>They are early in the round</li><li>They want to build an unreachable lead</li></ul><p>Conservative wagers are more common late in games when protecting a lock.</p>",
          mediaType: "video",
          mediaUrl: "https://www.youtube.com/watch?v=0Wi5kJXq1Jg",
        },
      ],
    },
    {
      chapterTitle: "Buzzer Strategy",
      sections: [
        {
          sectionType: "standard",
          header: "The Buzzer Is Half the Game",
          content:
            "Many contestants lose not due to lack of knowledge, but because of poor buzzer timing. The signaling device activates only after the host finishes reading the clue.",
        },
        {
          sectionType: "strategy-real-example",
          header: "Anticipation Timing",
          content:
            "<p>Top players buzz in by anticipating the end of the clue, not reacting after it finishes.</p><p>This is a learned rhythm skill developed through repetition and audio-based practice.</p>",
        },
      ],
    },
    {
      chapterTitle: "Final Jeopardy Wagering Math",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "Cover Bets Explained",
          content:
            "<p>A cover bet ensures you win if the second-place contestant answers correctly.</p><p>Standard rule:</p><pre>Wager = (Second Place Score × 2) − Your Score + 1</pre><p>Failing to cover is one of the most common strategic errors.</p>",
        },
        {
          sectionType: "strategy-real-example",
          header: "When Not to Cover",
          content:
            "<p>Advanced players sometimes avoid cover bets when:</p><ul><li>Second place is likely to wager incorrectly</li><li>The category is extremely volatile</li><li>They anticipate a triple-stumper</li></ul><p>This is high-risk, high-reward play.</p>",
        },
      ],
    },
    {
      chapterTitle: "Psychological & Meta Strategy",
      sections: [
        {
          sectionType: "strategy-real-example",
          header: "Applying Pressure",
          content:
            "<p>Fast clue selection, confident wagering, and constant board control create psychological pressure.</p><p>Opponents may second-guess, hesitate on the buzzer, or wager conservatively as a result.</p>",
        },
        {
          sectionType: "standard",
          header: "Thinking Like a Champion",
          content:
            "Jeopardy champions treat each game as an optimization problem. They minimize opponent opportunities, maximize expected value, and stay emotionally neutral regardless of outcome.",
        },
      ],
    },
  ],
};
