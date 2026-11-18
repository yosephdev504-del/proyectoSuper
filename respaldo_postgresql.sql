--
-- PostgreSQL database dump
--

\restrict uTN44UaTIgETJmU9WG5kyekdmtqE9g7tiYm0dVGe4UPvDMVQYr3naaL4CKeewiQ

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-12-19 15:24:14

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 16415)
-- Name: detalle_ventas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.detalle_ventas (
    id integer NOT NULL,
    venta_id integer,
    producto_id integer,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    subtotal numeric(10,2) GENERATED ALWAYS AS (((cantidad)::numeric * precio_unitario)) STORED
);


--
-- TOC entry 223 (class 1259 OID 16414)
-- Name: detalle_ventas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.detalle_ventas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 223
-- Name: detalle_ventas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.detalle_ventas_id_seq OWNED BY public.detalle_ventas.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: productos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    codigo character varying(50) NOT NULL,
    nombre character varying(255) NOT NULL,
    precio numeric(10,2) NOT NULL,
    stock_actual integer DEFAULT 100,
    stock_minimo integer DEFAULT 10
);


--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 219
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- TOC entry 222 (class 1259 OID 16405)
-- Name: ventas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ventas (
    id integer NOT NULL,
    fecha_venta timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total numeric(10,2) DEFAULT 0
);


--
-- TOC entry 221 (class 1259 OID 16404)
-- Name: ventas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ventas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 221
-- Name: ventas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ventas_id_seq OWNED BY public.ventas.id;


--
-- TOC entry 4872 (class 2604 OID 16418)
-- Name: detalle_ventas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detalle_ventas ALTER COLUMN id SET DEFAULT nextval('public.detalle_ventas_id_seq'::regclass);


--
-- TOC entry 4866 (class 2604 OID 16393)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 4869 (class 2604 OID 16408)
-- Name: ventas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ventas ALTER COLUMN id SET DEFAULT nextval('public.ventas_id_seq'::regclass);


--
-- TOC entry 5037 (class 0 OID 16415)
-- Dependencies: 224
-- Data for Name: detalle_ventas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.detalle_ventas (id, venta_id, producto_id, cantidad, precio_unitario) FROM stdin;
\.


--
-- TOC entry 5033 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.productos (id, codigo, nombre, precio, stock_actual, stock_minimo) FROM stdin;
1	8410077000070	Aceite de Olivo Bote Pequeño	125.00	100	10
2	279	Aceite Mazola (400ml)	48.00	100	10
3	7413100005074	Aceite de Olivo en Bolsa	48.00	100	10
4	1670	Aceite Libra	22.00	100	10
5	1128	Aceite Wesson Canola	525.00	100	10
6	803275305005	Avena Molida	36.00	100	10
7	67	Avena Mosch	32.00	100	10
8	020	Azucar Morena	15.00	100	10
9	1661	Azucar El Cañal 2L	26.00	100	10
10	68	Cafe de Palo	120.00	100	10
11	7891000300602	Cafe Instantaneo	198.00	100	10
12	65	Cafe Oro Libra	9.00	100	10
13	86	Manteca Clover (Libra)	24.00	100	10
14	90	Manteca Clover (Quilo)	49.00	100	10
15	680	Espagueti Mi Pasta	9.00	100	10
16	7441000714147	Maseca para Pastelitos	22.00	100	10
17	7401004220617	Mayonesa Doypack	55.00	100	10
18	7411000329702	Salsa Naturas	48.00	100	10
19	76	Sopa Maggi Pollo	15.00	100	10
20	7420000410402	Vinagre Rico	40.00	100	10
21	4	Carne de Res (Tajo Libra)	95.00	100	10
22	5	Carne Molida de Res	88.00	100	10
23	9	Chuleta de Cerdo	49.00	100	10
24	13	Costilla de Cerdo	49.00	100	10
25	18	Pollo Mixto (Libra)	28.00	100	10
26	17	Alitas de Pollo	62.00	100	10
27	7421000904168	Chorizo Barbacoa Delicia	65.00	100	10
28	328	Jamon Bavaria	32.00	100	10
29	7424101100569	Hot Dog Pollo	65.00	100	10
30	1820	Mortadela Europea	33.00	100	10
31	233	Pasta Colgate Grande	52.00	100	10
32	637	Jabon Palmolive	22.00	100	10
33	02	Papel Higienico Scott (4 rollos)	80.00	100	10
34	1838	Detergente en Libra	15.00	100	10
35	223	Suavitel (800ml)	68.00	100	10
36	227	Cloro Magia Blanca	6.00	100	10
37	7422110100556	Coca Cola 3 Litros	68.00	100	10
38	409	Coca Cola 1.1L	35.00	100	10
39	7421600303835	Adrenalina Rush	35.00	100	10
40	09	Jugo de Naranja Leyde	17.00	100	10
41	7421600308700	Agua Azul 500ml	15.00	100	10
42	2015	Papas (Libra)	20.00	100	10
43	1792	Cebolla Blanca	22.00	100	10
44	1822	Tomates	25.00	100	10
45	11163	Platano Maduro	10.00	100	10
46	1895	Chile Dulce	12.00	100	10
\.


--
-- TOC entry 5035 (class 0 OID 16405)
-- Dependencies: 222
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ventas (id, fecha_venta, total) FROM stdin;
\.


--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 223
-- Name: detalle_ventas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.detalle_ventas_id_seq', 1, false);


--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 219
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.productos_id_seq', 46, true);


--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 221
-- Name: ventas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ventas_id_seq', 1, false);


--
-- TOC entry 4882 (class 2606 OID 16424)
-- Name: detalle_ventas detalle_ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT detalle_ventas_pkey PRIMARY KEY (id);


--
-- TOC entry 4876 (class 2606 OID 16403)
-- Name: productos productos_codigo_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_codigo_key UNIQUE (codigo);


--
-- TOC entry 4878 (class 2606 OID 16401)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 4880 (class 2606 OID 16413)
-- Name: ventas ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (id);


--
-- TOC entry 4874 (class 1259 OID 16435)
-- Name: idx_codigo_producto; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_codigo_producto ON public.productos USING btree (codigo);


--
-- TOC entry 4883 (class 2606 OID 16430)
-- Name: detalle_ventas detalle_ventas_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT detalle_ventas_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id);


--
-- TOC entry 4884 (class 2606 OID 16425)
-- Name: detalle_ventas detalle_ventas_venta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detalle_ventas
    ADD CONSTRAINT detalle_ventas_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id);


-- Completed on 2025-12-19 15:24:15

--
-- PostgreSQL database dump complete
--

\unrestrict uTN44UaTIgETJmU9WG5kyekdmtqE9g7tiYm0dVGe4UPvDMVQYr3naaL4CKeewiQ

