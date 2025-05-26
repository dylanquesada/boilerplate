-- This file is used to initialize the PostgreSQL database
-- It will be executed when the database container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The actual tables will be created by Drizzle migrations
-- This file is mainly for any initial setup or seed data

-- Example: Insert some initial data if needed
-- INSERT INTO "user" (id, name, email) VALUES 
--   ('1', 'Admin User', 'admin@example.com'); 