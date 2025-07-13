export class GoalItem {
  id: number;
  sportName: string;
  type: string;
  duration: number;
  status: string;

  constructor(id: number, sportName: string, type: string, duration: number, status: string) {
    this.id = id;
    this.sportName = sportName;
    this.type = type;
    this.duration = duration;
    this.status = status;
  }
}