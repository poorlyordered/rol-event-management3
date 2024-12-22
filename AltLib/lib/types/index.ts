export * from './enums';
export * from './models';

// Component Props
export interface ComponentProps {
    class?: string;
    style?: string;
}

// Form Types
export interface FormField<T = string> {
    value: T;
    error?: string;
    touched: boolean;
    required?: boolean;
    validate?: (value: T) => string | undefined;
}

// API Response Types
export interface ApiResponse<T> {
    data?: T;
    error?: {
        message: string;
        code?: string;
    };
}

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Event Types
export interface EventHandler<T = Event> {
    (event: T): void;
}

// Store Types
export interface StoreState<T> {
    data: T;
    loading: boolean;
    error?: string;
}
