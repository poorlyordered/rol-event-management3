import type { ComponentProps } from './index';

export interface FooterLink {
    label: string;
    href: string;
    icon?: string;
    external?: boolean;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export interface SocialLink extends FooterLink {
    icon: string;
    platform: 'twitter' | 'discord' | 'github' | 'twitch' | 'youtube';
}

export interface FooterProps extends ComponentProps {
    showSocial?: boolean;
    showLegal?: boolean;
    customSections?: FooterSection[];
}
