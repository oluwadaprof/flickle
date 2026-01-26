# 🎬 Flickle

**Flickle** is a daily movie‑guessing and trivia web application for cinema
lovers. Inspired by word‑based daily games, Flickle challenges players with
multiple movie‑themed game modes, one shared daily challenge, and stat tracking
across sessions.

Built with modern web technologies, Flickle focuses on performance, clean UI,
and an engaging daily ritual for movie fans.

---

## ✨ Key Features

### 🎯 Core Gameplay

- 🎥 Daily movie guessing challenge (same puzzle for everyone)
- 🧠 Multiple trivia and guessing game modes
- 🔎 Searchable game modes catalogue
- ⏱️ Countdown timer to the next daily Flickle
- 🎮 Play logged‑in or as a guest

### 📊 Player Stats

- 🔥 Current streak tracking
- 📈 Win rate calculation
- 🧮 Total games played
- 👤 Stats persist for authenticated users

### 🔐 Authentication

- Email / provider‑based authentication
- Guest mode for quick play
- Auth modal with seamless UX

### 🖥️ UI / UX

- Clean hero‑driven landing page
- Responsive layout (mobile & desktop)
- Game mode cards with descriptions
- Search‑as‑you‑type filtering
- Minimal, cinema‑inspired visual language

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom primitives + Radix‑style patterns
- **Icons:** lucide‑react
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Authentication:** Custom auth store + backend integration

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── modules/
│   ├── layout/
│   │   └── components/
│   │       ├── header.tsx
│   │       ├── auth-modal.tsx
│   │       └── countdown-timer.tsx
│   ├── game-modes/
│   │   ├── components/
│   │   │   └── game-mode-card.tsx
│   │   └── types/
│   │       └── game-modes.ts
├── store/
│   └── use-auth-store.ts
├── hooks/
│   └── use-game-stats.ts
└── primitives/
    └── ui/
        ├── button.tsx
        └── input.tsx
```

---

## 🧠 Game Modes

Flickle supports multiple movie‑based game modes, such as:

- Guess the movie from clues
- Scene‑based or description‑based guessing
- Progressive hint challenges

Game modes are searchable and displayed as cards, allowing players to explore
different ways to play.

---

## ⏳ Daily Challenge System

- A new Flickle is released every 24 hours
- All players receive the same challenge
- Countdown timer shows time remaining until the next Flickle
- Encourages shared experience and competition

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_AUTH_KEY=your-auth-key
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Gameplay Flow (High Level)

1. User lands on the Flickle homepage
2. Daily Flickle status and countdown are displayed
3. User selects **Play Today’s Flickle**
4. Authentication is optional (guest or signed‑in)
5. Game progress and stats are tracked
6. Results contribute to streaks and win rate

---

## 📱 Responsive Design

- Mobile‑first layout
- Optimized tap targets
- Adaptive grid for game modes
- Consistent experience across screen sizes

---

## 🔮 Future Enhancements

- [ ] Social sharing of results
- [ ] Leaderboards
- [ ] More game modes
- [ ] Movie trailers & metadata integration
- [ ] Difficulty levels
- [ ] User profiles & avatars
- [ ] PWA support for installable experience

---

## 🧑‍💻 Author

**Adeeko Tobiloba** Frontend Engineer 📧
[adeekotobiloba8@gmail.com](mailto:adeekotobiloba8@gmail.com)

---

## 📄 License

MIT

---

## 📝 Notes

Flickle was built to showcase:

- Clean frontend architecture
- State management with Zustand
- Real‑world UI composition
- Daily‑challenge game logic
- Scalable component design

Perfect as a foundation for a production‑ready casual web game.
