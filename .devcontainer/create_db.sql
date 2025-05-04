-- This script will create a new PostgreSQL database named "boilerplate"
-- and enable the necessary extensions for geospatial queries.

CREATE DATABASE boilerplate;

-- Connect to the newly created database
\c boilerplate;

-- Enable the cube extension (required by earthdistance)
CREATE EXTENSION cube;

-- Enable the earthdistance extension for calculating distances on Earth
CREATE EXTENSION earthdistance;

-- Create the sql_history table in the public schema
CREATE TABLE public.sql_history (
    id SERIAL PRIMARY KEY,
    sql_previous_query TEXT,
    sql_now_query TEXT,
    ran_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    query_status TEXT,  -- e.g., 'SUCCESS', 'ERROR', 'ROLLED BACK'
    error_message TEXT, -- Store any error message, if applicable
    user_name TEXT DEFAULT CURRENT_USER, --Add the user name
    application_name TEXT, -- add the application name
    server_hostname TEXT,  -- optional, if you want to track the server
    transaction_id BIGINT,   -- optional, to track which transaction the query was part of
    client_ip INET -- add the client IP
);

-- Add indexes to the sql_history table
CREATE INDEX idx_sql_history_timestamp ON public.sql_history(ran_timestamp);
CREATE INDEX idx_sql_history_user_name ON public.sql_history(user_name);
CREATE INDEX idx_sql_history_query_status ON public.sql_history(query_status);
CREATE INDEX idx_sql_history_transaction_id ON public.sql_history(transaction_id);