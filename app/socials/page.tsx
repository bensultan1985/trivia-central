export default async function SocialsPage() {
  const socialLinks = [
    // {
    //   name: "Instagram",
    //   url: "https://www.instagram.com",
    //   icon: "📷",
    //   description:
    //     "Follow us on Instagram for behind-the-scenes content and trivia tips",
    //   color: "from-purple-500 to-pink-500",
    // },
    {
      name: "X (Twitter)",
      url: "https://www.x.com",
      // icon: "𝕏",
      description: "Join the conversation and get daily trivia challenges.",
      color: "from-slate-700 to-slate-100",
    },
    {
      name: "Patreon",
      url: "https://www.instagram.com",
      icon: "",
      description:
        "Want to keep Trivia Central growing? Support us on Patreon.",
      color: "from-amber-500 to-amber-100",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com",
      // icon: "▶️",
      description:
        "Coming soon: Watch trivia strategy videos. Or, watch our flagship series, Made In.",
      color: "from-red-500 to-red-100",
    },
    {
      name: "Rumble",
      url: "https://www.youtube.com",
      // icon: "▶️",
      description:
        "Coming soon: Watch trivia strategy videos. Or, watch our flagship series, Made In.",
      color: "from-green-400 to-green-100",
    },
    {
      name: "Truth Social",
      url: "https://www.youtube.com",
      // icon: "▶️",
      description: "Follow us on Truth Social.",
      color: "from-blue-400 to-blue-100",
    },
  ];

  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-50">
          Connect With Us
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-300">
          Trivia Central is brought to you by VeriContent Studios. Follow us on
          social media for tips, updates, and community content.
        </p>
        <div className="space-y-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-slate-900"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-6 w-6 items-center justify-center
                     rounded-sm
                     bg-gradient-to-br ${social.color} text-3xl text-white shadow-md`}
                >
                  {social.icon}
                </div>
                <div className="flex-1">
                  <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {social.name}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    {social.description}
                  </p>
                </div>
                <div className="text-slate-400 dark:text-slate-500">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
