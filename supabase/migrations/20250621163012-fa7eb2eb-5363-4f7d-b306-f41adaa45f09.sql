
-- Create products table for centralized product management
CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount_percentage INTEGER DEFAULT 0,
  image TEXT,
  rating DECIMAL(2,1) DEFAULT 4.0,
  rating_count INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  description TEXT,
  stock INTEGER DEFAULT 0,
  sku TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read, admin write)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert products" ON public.products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update products" ON public.products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete products" ON public.products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for admin users (only admins can manage)
CREATE POLICY "Only authenticated users can view admin users" ON public.admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can manage admin users" ON public.admin_users
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert some initial products from your existing data
INSERT INTO public.products (title, price, original_price, discount_percentage, image, rating, rating_count, category, description, stock, sku) VALUES
('Classic White T-Shirt', 299, 599, 50, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 4.2, 150, 'tshirts', 'High quality cotton blend white t-shirt perfect for casual wear', 25, 'TSH-001'),
('Denim Blue Jeans', 1299, 1999, 35, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', 4.5, 200, 'jeans', 'Premium denim jeans with comfortable fit and modern styling', 30, 'JNS-001'),
('Black Hoodie', 899, 1499, 40, 'https://images.unsplash.com/photo-1556821840-3a9fac6f21b5?w=500', 4.3, 180, 'hoodies', 'Cozy black hoodie made from soft cotton blend material', 20, 'HOD-001'),
('Summer Floral Dress', 1599, 2499, 36, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', 4.4, 120, 'dresses', 'Beautiful floral print dress perfect for summer occasions', 15, 'DRS-001'),
('Kids Rainbow T-Shirt', 399, 699, 43, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500', 4.1, 90, 'kids', 'Colorful rainbow design t-shirt for kids, made from soft cotton', 40, 'KDS-001');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
