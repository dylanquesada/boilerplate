# Next.js Boilerplate

A modern, production-ready boilerplate for side projects built with Next.js, NextAuth, PostgreSQL, and Docker.

## 🚀 Features

- **Next.js 14** - Latest version with App Router and Server Components
- **TypeScript** - Full type safety throughout the application
- **NextAuth.js** - Complete authentication solution with multiple providers
- **PostgreSQL** - Robust database with Drizzle ORM for type safety
- **Docker** - Containerized for easy deployment and development
- **Tailwind CSS** - Modern styling with utility-first approach
- **Drizzle ORM** - Type-safe database operations
- **Zod** - Runtime type validation
- **ESLint & Prettier** - Code quality and formatting

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── providers.tsx   # Context providers
│   ├── components/         # Reusable components
│   ├── db/                 # Database schema and connection
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── .cursor/                # Cursor IDE rules
├── docker-compose.yml      # Production Docker setup
├── docker-compose.dev.yml  # Development Docker setup
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
└── drizzle.config.ts       # Drizzle ORM configuration
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Git

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd boilerplate
```

### 2. Set up environment variables

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://postgres:password@db:5432/boilerplate"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-very-long-random-secret-key-at-least-32-characters-long"

# Google OAuth Credentials (get these from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### 3. Start with Docker (Recommended)

For development:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

For production:
```bash
docker-compose up -d
```

### 4. Local Development (Alternative)

Install dependencies:
```bash
npm install
```

Start PostgreSQL (using Docker):
```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=boilerplate -p 5432:5432 -d postgres:15
```

Generate and run database migrations:
```bash
npm run db:generate
npm run db:migrate
```

Start the development server:
```bash
npm run dev
```

## 🗄️ Database

This boilerplate uses PostgreSQL with Drizzle ORM for type-safe database operations.

### Available Scripts

- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)

### Schema

The database includes:
- **Users** - User accounts (NextAuth)
- **Accounts** - OAuth provider accounts (NextAuth)
- **Sessions** - User sessions (NextAuth)
- **Posts** - Example CRUD entity

## 🔐 Authentication

### Google OAuth Setup

NextAuth.js is pre-configured with Google OAuth. Follow these steps to enable it:

#### 1. Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or Select Project**:
   - Create a new project or select an existing one
   - Note the project name for reference

3. **Enable Required APIs**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and click "Enable"
   - Alternatively, search for "Google Identity" and enable related APIs

4. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" for user type
   - Fill in required fields:
     - App name: Your app name
     - User support email: Your email
     - Developer contact: Your email
   - Add scopes: `../auth/userinfo.email` and `../auth/userinfo.profile`
   - Add test users if in development

5. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: Your app name
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

6. **Copy Credentials**:
   - Copy the "Client ID" and "Client Secret"
   - Add them to your `.env` file

#### 2. Environment Variables

Update your `.env` file with the Google credentials:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-google-client-secret"
```

#### 3. NextAuth Secret

Generate a secure random secret for NextAuth:

```bash
# Using OpenSSL (recommended)
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add the generated secret to your `.env` file:

```env
NEXTAUTH_SECRET="your-generated-secret-here"
```

#### 4. Restart Services

After updating your `.env` file, restart the Docker services:

```bash
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up -d
```

#### 5. Test Authentication

1. Open http://localhost:3000
2. Click "Sign In"
3. You should see Google as an authentication option
4. Test the login flow

### Additional OAuth Providers

The boilerplate also supports GitHub OAuth. To enable it:

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Add the credentials to your `.env` file:

```env
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Troubleshooting Authentication

**Common Issues:**

1. **"OAuth Error"**: Check that redirect URIs match exactly
2. **"Scope Error"**: Ensure required scopes are configured in OAuth consent screen
3. **"Client ID Error"**: Verify GOOGLE_CLIENT_ID is correct and complete
4. **"Database Connection Error"**: Ensure DATABASE_URL uses correct host (`db` for Docker, `localhost` for local)

**Debug Mode:**

Enable debug logging by adding to your `.env`:

```env
NEXTAUTH_DEBUG=true
```

## 🐳 Docker

### Development
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Production
```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services

- **app** - Next.js application (port 3000)
- **db** - PostgreSQL database (port 5432)
- **adminer** - Database admin interface (port 8080)

## 📝 API Routes

### Posts API

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post (requires authentication)

Example usage:
```javascript
// Get posts
const response = await fetch('/api/posts');
const posts = await response.json();

// Create post (authenticated)
const response = await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Post',
    content: 'Post content...',
    published: true
  })
});
```

## 🎨 Styling

This project uses Tailwind CSS with a custom design system. The color palette and spacing are defined in:
- `tailwind.config.js` - Tailwind configuration
- `src/app/globals.css` - CSS custom properties

## 🧪 Development

### Code Quality

- **ESLint** - Linting with Next.js recommended rules
- **TypeScript** - Strict type checking
- **Cursor Rules** - IDE-specific development guidelines in `.cursor/rules`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🚀 Deployment

### Docker Deployment

1. Build the production image:
```bash
docker-compose build
```

2. Deploy with your preferred container orchestration platform (Docker Swarm, Kubernetes, etc.)

### Environment Variables for Production

Make sure to set these in your production environment:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your domain URL (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET` - A secure random string (use `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- OAuth provider credentials (if using additional providers)

**Production Redirect URIs:**
- Google: `https://yourdomain.com/api/auth/callback/google`
- GitHub: `https://yourdomain.com/api/auth/callback/github`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you have any questions or run into issues:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

**Happy coding! 🎉**
