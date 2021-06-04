
export class WorkstationData {
  id = 0;
  tag = '';
  workstationname = '';
  xworkstation = 0;
  yworkstation = 0;
  idroom = 0;
  state = 0;
  sanitized = 0;
  archived = 0;
}

export class WorkstationDataWithDates extends WorkstationData{
  isDataSet = 1;
  failureFrom = '';
  failureTo = '';
}
