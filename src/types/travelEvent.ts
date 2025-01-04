import type { Enums, Tables } from "./supabase";

export type TravelEvent = Tables<"travel_events">;

export type TravelEventTypeEnum = Enums<"event_type_enum">;