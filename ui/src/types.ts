export type dataObj<T = any> = Record<string | number, T>

export type AppContextType = {
    isMobile: boolean
    isLoggedIn: boolean | null
    isSuper: boolean
    setIsLoggedIn: (value: boolean) => void
    setIsSuper: (value: boolean) => void
    item: string
    setItem: (value: string) => void
    theme: string
    setTheme: (value: string) => void
    headerLoading: boolean
    setHeaderLoading: (value: boolean) => void
}

export type userType = {
    _id?: string
    username?: string
    email?: string
    password?: string
    password2?: string
    isSuper?: boolean
    newData?: userType
    buildTrackerAccess?: boolean
}

export type onChangeEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export type Finding = {
    entity_type: string;
    severity: "low" | "medium" | "high";
    value: string;
};

export type SummaryRow = {
    entity_type: string;
    severity: "low" | "medium" | "high";
    count: number;
};

export type FlaggedEntry = {
    timestamp: string;
    payload?: string;
    findings: Finding[];
};

export type SummaryCounter = Record<string, number>;

export type entryType = {
    timestamp?: string
    payload?: string
    highestSev?: string
    findings?: Finding[]
    severity: "low" | "medium" | "high"
}