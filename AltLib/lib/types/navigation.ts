import type { StaffRole, OrgRole } from './enums';
import type { ComponentProps } from './index';

export type UserRole = StaffRole | OrgRole | 'user';

export interface MenuItem {
    label: string;
    icon: string;
    href?: string;
    roles?: UserRole[];
    children?: MenuItem[];
    external?: boolean;
}

export interface TouchPoint {
    clientX: number;
    clientY: number;
}

export interface SidebarProps extends ComponentProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export interface UserWithRoles {
    id: string;
    email: string;
    username: string;
    avatar_url?: string;
    role: UserRole;
    roles?: UserRole[];
}

// Custom touch event handlers for our specific needs
export interface TouchHandlers {
    onTouchStart?: (event: TouchEvent) => void;
    onTouchMove?: (event: TouchEvent) => void;
    onTouchEnd?: (event: TouchEvent) => void;
}

export interface TouchState {
    startX: number;
    currentX: number;
    isDragging: boolean;
}

export interface TouchConfig {
    threshold: number;  // minimum distance for swipe
    direction: 'left' | 'right' | 'both';
}

// Type guard for touch events
export function isTouchEvent(event: Event): event is TouchEvent {
    return 'touches' in event;
}
