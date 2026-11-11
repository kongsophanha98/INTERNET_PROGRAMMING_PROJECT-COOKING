export type Category = "talk" | "workshop" | "social" | "sport";

export interface CampusEvent {
  id: number;
  title: string;
  category: Category;
  startsAt: string;
  location: string;
  capacity: number;
  booked: number;
}
