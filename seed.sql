USE hussain_furniture;

INSERT INTO users (name, email, password_hash)
VALUES ('Admin User', 'admin@hussainfurniture.com', '$2b$10$dnk2k2m1MJzVvzoB7LOJROixVSmx/XmAoE6QfRmr18bODsPwhj/K6');

INSERT INTO products (name, category, price) VALUES
('Classic Sofa', 'Sofas', 2500.00),
('Royal Curtain Set', 'Curtains', 900.00),
('Premium Carpet', 'Carpets', 1200.00),
('Wood Flooring Panel', 'Flooring', 350.00),
('Bed Paint Finish', 'Bed Paint', 450.00),
('Modern Gypsum Decor', 'Gypsum Decor', 1500.00);

INSERT INTO customers (name, phone, email) VALUES
('Ali Hassan', '+97450000001', 'ali@example.com'),
('Fatima Noor', '+97450000002', 'fatima@example.com');

INSERT INTO invoices (invoice_number, customer_id, date, total, advance_payment, balance, status)
VALUES ('HF-20260414-1001', 1, CURDATE(), 3400.00, 1000.00, 2400.00, 'Partially Paid');

INSERT INTO invoice_items (invoice_id, product_name, quantity, unit_price, subtotal) VALUES
(1, 'Classic Sofa', 1, 2500.00, 2500.00),
(1, 'Royal Curtain Set', 1, 900.00, 900.00);

INSERT INTO payments (invoice_id, amount, method, transaction_id, status)
VALUES (1, 1000.00, 'debit_card', 'TXN-SEED-1001', 'Success');

INSERT INTO contacts (name, email, message)
VALUES ('Store Visitor', 'visitor@example.com', 'Please share your latest carpet catalog.');
