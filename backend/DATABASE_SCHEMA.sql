-- Bitcoin Land Bond - PostgreSQL Schema
-- Phase 0: Residents, Properties, Allocations, Outcomes

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users & Access Control
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'case_manager', 'finance', 'viewer')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);
CREATE INDEX idx_users_email ON users(email);

-- Residents
CREATE TABLE residents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dignifi_id_hash VARCHAR(255) UNIQUE NOT NULL, -- Hash of Dignifi ID
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2),
  status VARCHAR(50) NOT NULL CHECK (status IN ('enrolled', 'active', 'completed', 'inactive')),
  enrollment_date DATE NOT NULL,
  program_type VARCHAR(100), -- "Phase 0", "Phase 1", etc.
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_residents_city ON residents(city);
CREATE INDEX idx_residents_status ON residents(status);
CREATE INDEX idx_residents_dignifi_hash ON residents(dignifi_id_hash);

-- Properties
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2),
  zip_code VARCHAR(10),
  property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('single_family', 'multi_family', 'condo')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('available', 'assigned', 'deed_restricted', 'archived')),
  market_value DECIMAL(15,2),
  bitcoin_recovered_amount DECIMAL(15,2),
  registered_date DATE NOT NULL,
  deed_restriction_term INTEGER, -- Years
  assigned_resident_id UUID REFERENCES residents(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_assigned_resident ON properties(assigned_resident_id);

-- Capital Allocations
CREATE TABLE allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  allocation_type VARCHAR(50) NOT NULL CHECK (allocation_type IN ('initial', 'support', 'emergency')),
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'approved', 'disbursed', 'returned')),
  allocated_date DATE NOT NULL,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  disbursed_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_allocations_resident ON allocations(resident_id);
CREATE INDEX idx_allocations_status ON allocations(status);

-- Allocation Transactions
CREATE TABLE allocation_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  allocation_id UUID NOT NULL REFERENCES allocations(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'transfer')),
  amount DECIMAL(15,2) NOT NULL,
  balance DECIMAL(15,2),
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_by UUID REFERENCES users(id),
  reference_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_transactions_allocation ON allocation_transactions(allocation_id);
CREATE INDEX idx_transactions_date ON allocation_transactions(transaction_date);

-- Outcomes & Metrics
CREATE TABLE outcomes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  outcome_type VARCHAR(100) NOT NULL CHECK (outcome_type IN ('housing_stability', 'employment', 'income', 'health', 'education', 'recidivism')),
  metric_value VARCHAR(255),
  measurement_date DATE NOT NULL,
  quarter VARCHAR(10), -- "Q1-2026", "Q2-2026"
  reported_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_outcomes_resident ON outcomes(resident_id);
CREATE INDEX idx_outcomes_type ON outcomes(outcome_type);
CREATE INDEX idx_outcomes_quarter ON outcomes(quarter);

-- Audit Log
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_timestamp ON audit_log(action_timestamp DESC);

-- API Keys for integrations
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  last_used TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_api_keys_user ON api_keys(user_id);

-- Indexes for performance
CREATE INDEX idx_residents_created_at ON residents(created_at DESC);
CREATE INDEX idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX idx_allocations_created_at ON allocations(created_at DESC);
