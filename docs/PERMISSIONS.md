# Frontend Permission System

This document outlines the frontend permission system used in the Ranking of Legends (ROL) Event Management Platform.

## Organizational Structure

The platform serves two distinct organizational structures:

1. **ROL Platform Staff**: Employees and staff members of the Ranking of Legends platform itself
2. **Esports Organizations**: External organizations that use the platform for their teams and events

## Role Types

### ROL Staff Roles
Staff members who work for the Ranking of Legends platform:

```
owner
├── platform_admin
│   ├── customer_service
│   ├── tournament_director
│   │   └── tournament_coordinator
│   └── league_director
│       └── league_coordinator
```

### Esports Organization Roles
Staff members of external esports organizations:

```
org_owner
├── org_manager
└── org_staff
```

## Permission Types

### Resource Permissions
Resource permissions control CRUD (Create, Read, Update, Delete) operations on specific resources:

| Resource      | Description                              |
|--------------|------------------------------------------|
| rol_staff    | ROL platform staff management            |
| tournaments  | Tournament creation and management        |
| leagues      | League creation and management           |
| teams        | Team roster and management               |
| esports_orgs | Esports organization management          |

### Feature Permissions
Feature permissions control access to specific platform features:

| Feature        | Description                           |
|---------------|---------------------------------------|
| viewAnalytics | Access to platform analytics           |
| manageSettings| Access to platform-wide settings       |

## Role-Based Permissions

### ROL Staff Permissions

#### Owner
- **Resources**: Full CRUD access to all resources
- **Features**: Access to all features
- **Can Manage**: All ROL staff roles except other owners

#### Platform Admin
- **Resources**:
  - ROL Staff: Create, Read, Update
  - Tournaments/Leagues: Full CRUD
  - Teams: Read, Update
  - Esports Orgs: Read
- **Features**: All features
- **Can Manage**: All ROL staff roles except owner

#### Tournament Director
- **Resources**: 
  - Tournaments: Create, Read, Update
- **Features**: Analytics
- **Can Manage**: Tournament coordinators

#### League Director
- **Resources**:
  - Leagues: Create, Read, Update
- **Features**: Analytics
- **Can Manage**: League coordinators

#### Customer Service
- **Resources**:
  - Teams/Tournaments/Leagues/Esports Orgs: Read only
- **Features**: None
- **Can Manage**: None

#### Tournament/League Coordinator
- **Resources**:
  - Respective resource (Tournament/League): Read, Update
- **Features**: None
- **Can Manage**: None

### Esports Organization Permissions

#### Org Owner
- **Resources**:
  - Teams: Full CRUD
- **Features**: Analytics for their organization
- **Can Manage**: Their organization's staff

#### Org Manager
- **Resources**:
  - Teams: Create, Read, Update
- **Features**: Analytics for their organization
- **Can Manage**: Their organization's staff

#### Org Staff
- **Resources**:
  - Teams: Read only
- **Features**: None
- **Can Manage**: None

## Implementation Details

### Permission Checks
```typescript
// Check if user is ROL staff
isRolStaff('platform_admin') // true
isRolStaff('org_manager') // false

// Check resource permissions
hasResourcePermission('owner', 'tournaments', 'create') // true
hasResourcePermission('org_staff', 'teams', 'update') // false

// Check feature access
hasFeaturePermission('platform_admin', 'viewAnalytics') // true
hasFeaturePermission('org_staff', 'manageSettings') // false
```

## Security Considerations

1. Frontend permissions are for UX purposes only
2. All operations are validated on the backend through Supabase
3. Esports organization staff cannot access ROL platform management features
4. ROL staff permissions are completely separate from esports organization permissions

## Best Practices

1. Always verify organization context when checking permissions
2. Keep ROL staff and esports organization permissions separate
3. Use the provided utility functions for permission checks
4. Implement appropriate route guards
5. Handle unauthorized access gracefully

## Backend Permissions System

The backend permissions system is implemented through Supabase Row Level Security (RLS) policies. While the frontend handles detailed permission logic, the backend focuses on fundamental access control and data isolation.

### Design Philosophy

1. **Simplified RLS Policies**
   - Focus on basic authentication and ownership checks
   - Avoid complex role-based logic at the database level
   - Prevent recursion issues in policy checks

2. **Data Isolation**
   - ROL staff data is completely separate from esports organization data
   - Each organization's data is isolated from other organizations
   - Clear boundaries between platform management and organization management

### Table Access Patterns

#### ROL Staff Tables
```sql
-- Example: staff_members table policy
CREATE POLICY "Staff members are viewable by authenticated users"
    ON staff_members FOR SELECT
    USING (auth.role() = 'authenticated');

-- Simplified management policy
CREATE POLICY "Only super admin can manage staff"
    ON staff_members FOR ALL
    USING (auth.uid() IN (
        SELECT user_id FROM staff_members 
        WHERE role = 'owner'
    ));
```

#### Esports Organization Tables
```sql
-- Example: organizations table policy
CREATE POLICY "Organizations are viewable by everyone"
    ON organizations FOR SELECT
    USING (true);

CREATE POLICY "Organizations managed by their staff"
    ON organizations FOR UPDATE
    USING (
        auth.uid() IN (
            SELECT user_id FROM org_members 
            WHERE organization_id = id 
            AND role IN ('org_owner', 'org_manager')
        )
    );
```

#### Tournament and League Tables
```sql
-- Example: tournaments table policy
CREATE POLICY "Tournaments are viewable by everyone"
    ON tournaments FOR SELECT
    USING (true);

CREATE POLICY "Tournaments managed by ROL staff"
    ON tournaments FOR INSERT
    USING (
        auth.uid() IN (
            SELECT user_id FROM staff_members
            WHERE role IN ('owner', 'platform_admin', 'tournament_director')
        )
    );
```

### Security Principles

1. **Authentication First**
   - All sensitive operations require authentication
   - Use `auth.role() = 'authenticated'` for basic checks

2. **Ownership Verification**
   - ROL staff ownership through `staff_members` table
   - Organization ownership through `org_members` table
   - Team ownership through direct relationship

3. **Simplified Role Checks**
   - Avoid complex role hierarchies in policies
   - Use simple IN clauses for role checks
   - Maintain role lists in application code

4. **Data Segregation**
   ```sql
   -- Example: Team isolation policy
   CREATE POLICY "Teams are managed by their organization"
       ON teams FOR ALL
       USING (
           auth.uid() IN (
               SELECT user_id FROM org_members 
               WHERE organization_id = teams.organization_id
           )
           OR
           auth.uid() IN (
               SELECT user_id FROM staff_members
               WHERE role IN ('owner', 'platform_admin')
           )
       );
   ```

### Implementation Strategy

1. **Base Policies**
   - READ: Generally permissive for authenticated users
   - CREATE/UPDATE/DELETE: Strict ownership checks

2. **ROL Staff Access**
   - Simple role checks for platform staff
   - No recursive permission checks
   - Direct table queries for role verification

3. **Organization Access**
   - Organization-based isolation
   - Role checks within organization context
   - Clear separation from ROL staff permissions

4. **Cross-Cutting Concerns**
   - Audit logging at database level
   - Consistent timestamp management
   - Error handling and constraints

### Best Practices

1. **Policy Design**
   - Keep policies simple and focused
   - Avoid complex joins in policies
   - Use security definer functions for complex checks

2. **Performance**
   - Index commonly used columns in policies
   - Minimize policy complexity
   - Cache role checks where possible

3. **Maintenance**
   - Document policy changes
   - Test policies thoroughly
   - Monitor policy performance

4. **Security**
   - Regular security audits
   - Principle of least privilege
   - Clear separation of concerns

### Migration Plan

1. **Current to Target State**
   - Identify complex policies
   - Simplify role-based checks
   - Move complex logic to application layer

2. **Testing Strategy**
   - Unit tests for policies
   - Integration tests for permissions
   - Security penetration testing

3. **Rollout Strategy**
   - Gradual policy updates
   - Monitoring and validation
   - Rollback procedures
