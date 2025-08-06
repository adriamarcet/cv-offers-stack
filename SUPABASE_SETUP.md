# Supabase Setup Guide

This application now supports Supabase as a persistent database backend. Follow these steps to configure Supabase:

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be ready

## 2. Create the Database Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the technologies table
CREATE TABLE technologies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  count INTEGER DEFAULT 1,
  category TEXT DEFAULT 'required',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for better performance
CREATE INDEX idx_technologies_name ON technologies(name);
CREATE INDEX idx_technologies_created_at ON technologies(created_at);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for demo purposes)
-- In production, you should create more restrictive policies
CREATE POLICY "Allow all operations" ON technologies
  FOR ALL USING (true);
```

## 3. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 4. Configure Environment Variables

### For Local Development

Create a `.env` file in your project root:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### For Netlify Deployment

1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add these variables:
   - `PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

## 5. Test the Setup

1. Start your development server: `npm run dev`
2. Add a new technology
3. Check your Supabase dashboard > Table editor > technologies
4. You should see your data in the database

## 6. Fallback Behavior

If Supabase is not configured:
- The app will use in-memory storage (session-based)
- Data will be lost when the browser tab is closed
- All functionality will still work

## 7. Production Considerations

### Security
- The current setup uses the anon key which is safe for client-side use
- For production, consider implementing user authentication
- Use Row Level Security policies to restrict data access

### Performance
- Supabase provides connection pooling automatically
- The app includes error handling and fallback mechanisms
- Consider implementing caching for better performance

### Monitoring
- Use Supabase dashboard to monitor database usage
- Set up alerts for storage and bandwidth limits
- Monitor API response times

## Troubleshooting

### Common Issues

1. **"Supabase environment variables not found"**
   - Check that your `.env` file exists and has the correct variables
   - Restart your development server after adding environment variables

2. **"Failed to fetch technologies"**
   - Verify your Supabase URL and key are correct
   - Check that the `technologies` table exists in your database
   - Ensure Row Level Security policies allow the operations

3. **"Technology already exists" error**
   - The app prevents duplicate technology names
   - Check if the technology name already exists in the database

### Debug Mode

To see detailed Supabase logs, add this to your browser console:

```javascript
localStorage.setItem('supabase.debug', 'true');
```

## Next Steps

Once Supabase is configured, you can:

1. **Add Authentication**: Implement user accounts and personal technology lists
2. **Real-time Updates**: Use Supabase's real-time subscriptions
3. **Analytics**: Track technology trends over time
4. **Sharing**: Allow users to share their technology lists
5. **Backup**: Set up automated database backups

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Astro Documentation](https://docs.astro.build)
- [Netlify Documentation](https://docs.netlify.com) 