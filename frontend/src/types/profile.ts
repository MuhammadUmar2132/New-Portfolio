export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  avatarUrl?: string;
  stats?: Stat[];
}
