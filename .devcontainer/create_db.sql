--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-10 04:42:44 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 220 (class 1255 OID 16431)
-- Name: update_last_change(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_last_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        BEGIN
        NEW.updated_date = now();
        RETURN NEW;
        END;
    $$;


ALTER FUNCTION public.update_last_change() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16415)
-- Name: invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoices (
    id uuid NOT NULL,
    fk_user_id uuid NOT NULL,
    items jsonb,
    invoice_date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.invoices OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16403)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    name text NOT NULL,
    price text DEFAULT '0.00' NOT NULL,
    description text,
    qty smallint DEFAULT 0 NOT NULL,
    upsells_to text[],
    active boolean DEFAULT false NOT NULL,
    created_date timestamp with time zone DEFAULT now() NOT NULL,
    updated_date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    surname text,
    role text DEFAULT 'user'::text NOT NULL,
    active boolean DEFAULT false NOT NULL,
    created_date timestamp with time zone DEFAULT now() NOT NULL,
    updated_date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3236 (class 2606 OID 16422)
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 16414)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 16398)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3234 (class 1259 OID 16428)
-- Name: invoices_idx_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX invoices_idx_id ON public.invoices USING btree (id);


--
-- TOC entry 3231 (class 1259 OID 16429)
-- Name: products_idx_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX products_idx_id ON public.products USING btree (id);


--
-- TOC entry 3228 (class 1259 OID 16430)
-- Name: users_idx_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_idx_id ON public.users USING btree (id);


--
-- TOC entry 3240 (class 2620 OID 16432)
-- Name: invoices update_last_change; Type: TRIGGER; Schema: public; Owner: postgres
--

-- CREATE TRIGGER update_last_change BEFORE INSERT OR UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_last_change();


--
-- TOC entry 3239 (class 2620 OID 16433)
-- Name: products update_last_change; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_last_change BEFORE INSERT OR UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_last_change();


--
-- TOC entry 3238 (class 2620 OID 16434)
-- Name: users update_last_change; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_last_change BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_last_change();


--
-- TOC entry 3237 (class 2606 OID 16423)
-- Name: invoices link_invoice_id_to_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT link_invoice_id_to_user_id FOREIGN KEY (fk_user_id) REFERENCES public.users(id);


-- Completed on 2025-02-10 04:42:44 UTC

--
-- PostgreSQL database dump complete
--