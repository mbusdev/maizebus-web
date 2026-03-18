/** Active (current), temporarily inactive, or alumni. */
export type TeamMemberStatus = "active" | "inactive" | "alumni";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  major?: string;
  year?: string;
  /** Whether this person is a lead (executive/lead role). */
  isLead: boolean;
  /** active = current team, inactive = on leave, alumni = past member. */
  status: TeamMemberStatus;
  /** Profile image path. Omitted for alumni if not needed. */
  image?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  web?: string;
}

export interface TeamData {
  people: TeamMember[];
}

export function getActiveMemberCount(people: TeamMember[]): number {
  return people.filter((p) => p.status === "active").length;
}

export function formatMemberCount(people: TeamMember[], minDisplay = 25): string {
  const count = getActiveMemberCount(people);
  return `${Math.max(count, minDisplay)}+`;
}
