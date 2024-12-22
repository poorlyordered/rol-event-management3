export type RiotRegion =
    | 'BR'
    | 'EUN'
    | 'EUW'
    | 'LAN'
    | 'LAS'
    | 'NA'
    | 'OCE'
    | 'RU'
    | 'TR'
    | 'JP'
    | 'KR'
    | 'PH'
    | 'SG'
    | 'TH'
    | 'TW'
    | 'VN';

export type StaffRole =
    | 'owner'              // ROL platform owner
    | 'platform_admin'     // ROL platform administrator
    | 'customer_service'   // ROL customer support
    | 'tournament_director'// ROL tournament management
    | 'tournament_coordinator'
    | 'league_director'    // ROL league management
    | 'league_coordinator';

export type OrgRole =
    | 'org_owner'         // Esports organization owner
    | 'org_manager'       // Esports organization manager
    | 'org_staff';        // Esports organization staff

export interface Profile {
    id: string;
    username: string;
    full_name?: string;
    avatar_url?: string;
    summoner_name?: string;
    region?: RiotRegion;
    PUUID?: string;
    bio?: string;
    discord_username?: string;
    twitter_username?: string;
    twitch_username?: string;
    created_at: string;
    updated_at: string;
}

export interface Organization {
    id: string;
    name: string;
    description?: string;
    website?: string;
    contact_email?: string;
    logo_url?: string;
    created_at: string;
    updated_at: string;
}

export interface Team {
    id: string;
    name: string;
    tag: string;
    logo_url?: string;
    captain_id: string;
    organization_id?: string;
    region: RiotRegion;
    created_at: string;
    updated_at: string;
}

export interface Player {
    id: string;
    profile_id: string;
    team_id?: string;
    summoner_name: string;
    rank?: string;
    role: string;
    region: RiotRegion;
    created_at: string;
    updated_at: string;
}

export interface Tournament {
    id: string;
    name: string;
    description?: string;
    start_date: string;
    end_date: string;
    max_teams: number;
    current_teams: number;
    organizer_id: string;
    region: RiotRegion;
    status: 'draft' | 'registration' | 'in_progress' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export interface League {
    id: string;
    name: string;
    description?: string;
    start_date: string;
    end_date: string;
    max_teams: number;
    current_teams: number;
    organizer_id: string;
    region: RiotRegion;
    status: 'draft' | 'registration' | 'in_progress' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export interface Match {
    id: string;
    tournament_id: string;
    round: number;
    team1_id: string;
    team2_id: string;
    winner_id?: string;
    start_time: string;
    end_time?: string;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export interface StaffMember {
    id: string;
    user_id: string;
    role: StaffRole;
    organization_id?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}
