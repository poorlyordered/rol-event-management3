# Database Authentication & Permissions

This document outlines the database schema and policies related to authentication and permissions in the Supabase database.

## Schema Overview

### Staff Members Table
```sql
CREATE TABLE staff_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    role staff_role NOT NULL,
    organization_id UUID REFERENCES organizations,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, organization_id)
);
```

### Organization Members Table
```sql
CREATE TABLE org_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    organization_id UUID REFERENCES organizations NOT NULL,
    role org_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, organization_id)
);
```

## Role Enums

### Staff Roles
```sql
CREATE TYPE staff_role AS ENUM (
    'owner',                 -- ROL platform owner
    'platform_admin',        -- ROL platform administrator
    'customer_service',      -- ROL customer support
    'tournament_director',   -- ROL tournament management
    'tournament_coordinator',
    'league_director',       -- ROL league management
    'league_coordinator'
);
```

### Organization Roles
```sql
CREATE TYPE org_role AS ENUM (
    'org_owner',            -- Esports organization owner
    'org_manager',          -- Esports organization manager
    'org_staff'             -- Esports organization staff
);
```

## Row Level Security (RLS) Policies

### Staff Members Policies

```sql
-- Viewing staff members
CREATE POLICY "Staff members viewable by authenticated users"
    ON staff_members FOR SELECT
    USING (auth.role() = 'authenticated');

-- Managing staff members
CREATE POLICY "Staff managed by owner"
    ON staff_members FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM staff_members
            WHERE user_id = auth.uid()
            AND role = 'owner'
        )
    );
```

### Organization Members Policies

```sql
-- Viewing org members
CREATE POLICY "Org members viewable by authenticated users"
    ON org_members FOR SELECT
    USING (auth.role() = 'authenticated');

-- Managing org members
CREATE POLICY "Org members managed by org owners"
    ON org_members FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM org_members
            WHERE user_id = auth.uid()
            AND organization_id = org_members.organization_id
            AND role = 'org_owner'
        )
        OR
        EXISTS (
            SELECT 1 FROM staff_members
            WHERE user_id = auth.uid()
            AND role IN ('owner', 'platform_admin')
        )
    );
```

### Organization Policies

```sql
-- Viewing organizations
CREATE POLICY "Organizations viewable by everyone"
    ON organizations FOR SELECT
    USING (true);

-- Managing organizations
CREATE POLICY "Organizations managed by ROL staff or org owners"
    ON organizations FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM staff_members
            WHERE user_id = auth.uid()
            AND role IN ('owner', 'platform_admin')
        )
        OR
        EXISTS (
            SELECT 1 FROM org_members
            WHERE user_id = auth.uid()
            AND organization_id = organizations.id
            AND role = 'org_owner'
        )
    );
```

## Helper Functions

### Role Checking Functions

```sql
-- Check if user is owner
CREATE OR REPLACE FUNCTION is_owner(user_id uuid)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM staff_members
        WHERE user_id = $1
        AND role = 'owner'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is platform admin
CREATE OR REPLACE FUNCTION is_platform_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM staff_members
        WHERE user_id = $1
        AND (role = 'platform_admin' OR role = 'owner')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user can manage team
CREATE OR REPLACE FUNCTION can_manage_team(team_id uuid, user_id uuid)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM teams t
        WHERE t.id = $1
        AND (
            -- User is team captain
            t.captain_id = $2
            OR
            -- User is org admin
            EXISTS (
                SELECT 1 FROM staff_members sm
                WHERE sm.user_id = $2
                AND (
                    -- Platform-wide admin
                    sm.role IN ('owner', 'platform_admin')
                    OR
                    -- Org manager for team's organization
                    (sm.role = 'org_manager' AND sm.organization_id = t.organization_id)
                )
            )
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Access Control Matrix

### Staff Roles Access

| Role | Staff Management | Organizations | Tournaments | Leagues |
|------|-----------------|---------------|-------------|---------|
| owner | Full Access | Full Access | Full Access | Full Access |
| platform_admin | Manage non-owners | Full Access | Full Access | Full Access |
| tournament_director | None | View Only | Full Access | View Only |
| tournament_coordinator | None | View Only | Update Only | View Only |
| league_director | None | View Only | View Only | Full Access |
| league_coordinator | None | View Only | View Only | Update Only |
| customer_service | None | View Only | View Only | View Only |

### Organization Roles Access

| Role | Organization | Teams | Players |
|------|--------------|-------|---------|
| org_owner | Manage | Full Access | View Only |
| org_manager | View | Full Access | View Only |
| org_staff | View | View Only | View Only |

## Security Considerations

1. **Row Level Security**
   - All tables have RLS enabled
   - Policies enforce role-based access control
   - Public data is explicitly allowed through SELECT policies

2. **Security Definer Functions**
   - Helper functions use SECURITY DEFINER
   - Encapsulate complex permission checks
   - Provide consistent access control

3. **Role Hierarchy**
   - Clear separation between staff and organization roles
   - Hierarchical permissions structure
   - Granular access control at each level

4. **Policy Design**
   - Policies are role-specific
   - Separate policies for viewing vs. managing
   - Organization-specific access controls

## Best Practices

1. **Always use RLS policies**
   - Never disable RLS
   - Define explicit policies for each operation
   - Use helper functions for complex checks

2. **Role-based access control**
   - Use appropriate role for the task
   - Follow principle of least privilege
   - Separate staff and organization permissions

3. **Security Functions**
   - Use helper functions for common checks
   - Keep functions focused and simple
   - Document function purposes clearly

4. **Policy Management**
   - Regular policy audits
   - Test policy combinations
   - Document policy changes
