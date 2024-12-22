import type { RiotRegion } from './enums';
import type { TournamentStatus, MatchStatus } from './enums';
import type { StaffRole } from './enums';

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
    created_at: Date;
    updated_at: Date;
}

export interface Organization {
    id: string;
    name: string;
    description?: string;
    website?: string;
    contact_email?: string;
    logo_url?: string;
    created_at: Date;
    updated_at: Date;
}

export interface Team {
    id: string;
    name: string;
    tag: string;
    logo_url?: string;
    captain_id: string;
    organization_id?: string;
    region: RiotRegion;
    created_at: Date;
    updated_at: Date;
}

export interface Player {
    id: string;
    profile_id: string;
    team_id?: string;
    summoner_name: string;
    rank?: string;
    role: string;
    region: RiotRegion;
    created_at: Date;
    updated_at: Date;
}

export interface Tournament {
    id: string;
    name: string;
    description?: string;
    start_date: Date;
    end_date: Date;
    max_teams: number;
    current_teams: number;
    organizer_id: string;
    region: RiotRegion;
    status: TournamentStatus;
    created_at: Date;
    updated_at: Date;
}

export interface League {
    id: string;
    name: string;
    description?: string;
    start_date: Date;
    end_date: Date;
    region: RiotRegion;
    status: TournamentStatus;
    created_at: Date;
    updated_at: Date;
}

export interface Match {
    id: string;
    tournament_id: string;
    round: number;
    team1_id: string;
    team2_id: string;
    winner_id?: string;
    start_time: Date;
    end_time?: Date;
    status: MatchStatus;
    created_at: Date;
    updated_at: Date;
}

export interface StaffMember {
    id: string;
    user_id: string;
    role: StaffRole;
    organization_id?: string;
    notes?: string;
    created_at: Date;
    updated_at: Date;
}
