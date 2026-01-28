export const jeopardy = {
  title: "Jeopardy!",
  guideCoverUrl:
    "https://upload.wikimedia.org/wikipedia/commons/archive/c/ce/20141115075723%21Jeopardy%21_logo.png",
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
          header: "Daily Double Hunting & The Modern Meta",
          content:
            "<p>Modern elite play prioritizes Daily Doubles because they are the highest-leverage scoring events besides Final Jeopardy.</p><p>Data-driven analyses of games show Daily Doubles tend to appear more often in certain board regions (especially away from the top row), and champions combine fast clue selection with targeted hunting to find them earlier.</p>",
          mediaType: "external",
          mediaUrl:
            "https://fivethirtyeight.com/features/the-man-who-solved-jeopardy/",
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
          header: "Build a Stack, Then Strike",
          content:
            "<p>A common high-level approach:</p><ol><li><b>Build a stack</b> (raise your score enough that a big wager matters)</li><li><b>Hunt</b> (jump to likely Daily Double areas)</li><li><b>Wager with purpose</b> (use the DD to create separation or recover)</li></ol><p>Some champions explicitly avoid finding a Daily Double too early if they can’t yet wager enough to create meaningful advantage.</p>",
          mediaType: "external",
          mediaUrl:
            "https://fivethirtyeight.com/features/the-man-who-solved-jeopardy/",
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
          header: "Timing: Buzz on the Lights, Not the Words",
          content:
            "<p>On set, contestants cannot successfully ring in until the system is armed, which happens when the host finishes reading the clue.</p><ul><li>The board-side indicator lights show the moment the system is live (not visible to TV viewers)</li><li>Buzzing too early triggers a short lockout penalty</li><li>Practice is about rhythm: anticipating the end while syncing to the enable moment</li></ul>",
          mediaType: "external",
          mediaUrl:
            "https://www.jeopardy.com/jbuzz/behind-scenes/how-does-jeopardy-buzzer-work",
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
            "<p>A cover bet ensures you win if the second-place contestant answers correctly.</p><p>Standard idea:</p><pre>To cover 2nd: wager enough so (Your Score + Wager) &gt; 2 × (Second Place Score)</pre><p>Practically, leaders often compute the minimum cover amount and then choose whether to add extra based on 3rd place and other risks.</p>",
          mediaType: "external",
          mediaUrl: "https://thejeopardyfan.com/final-jeopardy-betting",
        },
        {
          sectionType: "strategy-real-example",
          header: "Know the Post-2014 Tiebreaker Reality",
          content:
            "<p>Jeopardy’s approach to ties changed: ties after Final Jeopardy are no longer left as co-champions; they are broken by a tiebreaker clue.</p><p>This affects certain edge-case wagers where “bet to tie” used to be optimal.</p>",
          mediaType: "external",
          mediaUrl: "https://thejeopardyfan.com/final-jeopardy-betting",
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
