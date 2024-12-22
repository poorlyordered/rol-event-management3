export enum RiotRegion {
    BR = 'BR',
    EUN = 'EUN',
    EUW = 'EUW',
    LAN = 'LAN',
    LAS = 'LAS',
    NA = 'NA',
    OCE = 'OCE',
    RU = 'RU',
    TR = 'TR',
    JP = 'JP',
    KR = 'KR',
    PH = 'PH',
    SG = 'SG',
    TH = 'TH',
    TW = 'TW',
    VN = 'VN'
}

export enum StaffRole {
    Owner = 'owner',
    PlatformAdmin = 'platform_admin',
    CustomerService = 'customer_service',
    TournamentDirector = 'tournament_director',
    TournamentCoordinator = 'tournament_coordinator',
    LeagueDirector = 'league_director',
    LeagueCoordinator = 'league_coordinator'
}

export enum OrgRole {
    Owner = 'org_owner',
    Manager = 'org_manager',
    Staff = 'org_staff'
}

export enum TournamentStatus {
    Draft = 'draft',
    Registration = 'registration',
    InProgress = 'in_progress',
    Completed = 'completed',
    Cancelled = 'cancelled'
}

export enum MatchStatus {
    Scheduled = 'scheduled',
    InProgress = 'in_progress',
    Completed = 'completed',
    Cancelled = 'cancelled'
}
