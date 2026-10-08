# GDG VITM Recruitment Portal

A modern, interactive recruitment portal built with cutting-edge web technologies to streamline the GDG VITM recruitment process.

## 🚀 Features

- **Interactive 3D Elements**: Built with Three.js and React Three Fiber
- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **Supabase Backend**: Secure, scalable database with real-time capabilities
- **Type Safety**: Full TypeScript support
- **Fast Development**: Powered by Vite
- **Form Handling**: Robust form management with React Hook Form
- **State Management**: Efficient state management with React Query
- **Admin Dashboard**: Built-in application management interface

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Backend**: Supabase (PostgreSQL database)
- **Styling**: Tailwind CSS with shadcn/ui components
- **3D Rendering**: Three.js, @react-three/fiber, @react-three/drei
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query
- **Build Tool**: Vite
- **Type Safety**: TypeScript
- **Animation**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (Recommended: Latest LTS version)
- npm
- git
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GDGVITM/GDG_Recruit_new.git
   cd GDG_Recruit_new
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [Supabase](https://supabase.com)
   - Run the SQL schema from `supabase-schema.sql` in your SQL editor
   - Copy your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   The application will be available at [http://localhost:5173](http://localhost:5173)

## � Documentation

- **[Supabase Setup Guide](SUPABASE_SETUP.md)** - Detailed setup instructions
- **[Migration Summary](SUPABASE_MIGRATION_SUMMARY.md)** - What changed in the migration

## 🧪 Testing

### Form Testing
Open browser console and use the built-in debug utilities:
```javascript
// Test form submission
testSupabaseSubmission()

// View all applications
getAllApplications()

// Check if email exists
checkEmailExists("test@example.com")
```

### Unit Tests
```bash
npm test
```

## �📦 Build for Production

```bash
npm run build
```

This will create a `dist` folder with the production build.

## 🛡️ Database Schema

The application uses a PostgreSQL database with the following main table:

### Applications Table
- `id` - Unique UUID
- `name` - Applicant's full name
- `email` - Applicant's email (unique)
- `university` - University/Institution
- `year` - Academic year
- `position` - Applied position
- `skills` - Technical skills
- `experience` - Previous experience
- `motivation` - Motivation to join GDG
- `created_at` - Submission timestamp
- `updated_at` - Last update timestamp

## 🔧 Admin Features

The portal includes an optional admin dashboard (`ApplicationsAdmin` component) with:
- View all applications
- Search and filter capabilities
- Export to CSV
- Real-time statistics
- Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)

## 📧 Contact

For any queries, please contact `gdgoncampus.vit@gmail.com` or open an issue in the repository.


## Frontend integration
The public recruitment page now uses the Diven recruitment UI while preserving the existing Supabase application flow and `/admin` dashboard.
