export interface TypeProps {
  id: string;
  label: string;
  value: number;
}

export interface RecapProps {
  id: string;
  user_id: string;
  amount: number;
  type: TypeProps;
  date: string;
  revenue: number;
}
